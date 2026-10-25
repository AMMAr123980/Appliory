import { templates } from "../model.ts";
import { checklistSchema, documentMetaSchema } from "../schemas.ts";
import { buildReport } from "./engine.ts";
import { z } from "zod";
const inputSchema = z.object({
  checklist: checklistSchema,
  documents: z
    .array(documentMetaSchema.safeExtend({ ruleId: z.string().max(100) }))
    .max(40),
});
function response(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
export async function validationHandler(
  req: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const [resource, id] = path;
  if (path.length > 2) return response({ error: "Not found." }, 404);
  if (resource === "health" && !id && req.method === "GET")
    return response({
      ok: true,
      service: "Appliory",
      mode: "guest",
      storage: "none",
    });
  if (resource === "templates" && req.method === "GET") {
    const data = id ? templates.find((t) => t.slug === id) : templates;
    return data
      ? response({ data })
      : response({ error: "Template not found." }, 404);
  }
  if (resource !== "validate" || id)
    return response({ error: "Not found." }, 404);
  if (req.method !== "POST") return response({ error: "Use POST." }, 405);
  const origin = req.headers.get("origin");
  if (origin && origin !== new URL(req.url).origin)
    return response({ error: "Cross-origin requests are not allowed." }, 403);
  if (!req.headers.get("content-type")?.includes("application/json"))
    return response({ error: "Use application/json." }, 415);
  try {
    // Bound streamed input even when Content-Length is absent or incorrect.
    const reader = req.body?.getReader();
    if (!reader) return response({ error: "JSON body required." }, 400);
    let count = 0;
    const parts: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      count += value.byteLength;
      if (count > 1024 * 1024) {
        await reader.cancel();
        return response({ error: "Request exceeds 1 MB." }, 413);
      }
      parts.push(value);
    }
    const bytes = new Uint8Array(count);
    let at = 0;
    for (const part of parts) {
      bytes.set(part, at);
      at += part.length;
    }
    const { checklist, documents } = inputSchema.parse(
      JSON.parse(new TextDecoder().decode(bytes)),
    );
    if (new Set(documents.map((d) => d.id)).size !== documents.length)
      return response({ error: "Document identifiers must be unique." }, 400);
    if (
      documents.some(
        (d) => d.ruleId && !checklist.items.some((r) => r.id === d.ruleId),
      )
    )
      return response({ error: "Unknown requirement mapping." }, 400);
    return response({
      data: buildReport(checklist.title, checklist.items, documents),
    });
  } catch (e) {
    return response(
      {
        error:
          e instanceof z.ZodError
            ? e.issues[0]?.message
            : "Invalid JSON request.",
      },
      400,
    );
  }
}
