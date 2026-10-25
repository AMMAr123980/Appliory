import { z } from "zod";
export const ruleSchema = z.object({
  id: z.string().min(1).max(100),
  name: z.string().trim().min(1).max(100),
  description: z.string().max(1000),
  required: z.boolean(),
  extensions: z
    .string()
    .min(1)
    .max(300)
    .regex(
      /^[a-z0-9]+(?:\s*,\s*[a-z0-9]+)*$/i,
      "Enter extensions such as pdf,jpg,png without dots or empty entries.",
    ),
  mimes: z.string().max(500),
  maxMB: z.number().positive().max(25),
  minPages: z.number().int().positive().optional(),
  maxPages: z.number().int().positive().optional(),
  minWidth: z.number().int().positive().optional(),
  maxWidth: z.number().int().positive().optional(),
  minHeight: z.number().int().positive().optional(),
  maxHeight: z.number().int().positive().optional(),
  filename: z.string().max(100).optional(),
  reference: z
    .union([z.url({ protocol: /^https?$/ }).max(2000), z.literal("")])
    .optional(),
  verified: z.string().max(20).optional(),
  notes: z.string().max(2000).optional(),
});
export const checklistSchema = z
  .object({
    title: z.string().trim().min(1).max(120),
    category: z.string().max(50).default("custom"),
    items: z.array(ruleSchema).min(1).max(100),
  })
  .superRefine((c, ctx) => {
    if (new Set(c.items.map((x) => x.id)).size !== c.items.length)
      ctx.addIssue({
        code: "custom",
        message: "Checklist item identifiers must be unique.",
      });
    for (const r of c.items)
      for (const [min, max] of [
        [r.minPages, r.maxPages],
        [r.minWidth, r.maxWidth],
        [r.minHeight, r.maxHeight],
      ])
        if (min && max && min > max)
          ctx.addIssue({
            code: "custom",
            message: "Minimum cannot exceed maximum.",
          });
  });
export const documentMetaSchema = z
  .object({
    id: z.string().min(1).max(100),
    name: z.string().max(200),
    size: z
      .number()
      .int()
      .nonnegative()
      .max(25 * 1024 * 1024),
    type: z.string().max(150),
    detected: z.enum(["pdf", "jpg", "png", "webp", "unknown"]),
    hash: z.string().regex(/^[a-f0-9]{64}$/),
    pages: z.number().int().nonnegative().optional(),
    textPages: z.number().int().nonnegative().optional(),
    width: z.number().int().positive().optional(),
    height: z.number().int().positive().optional(),
    error: z.string().max(1000).optional(),
  })
  .superRefine((d, ctx) => {
    if (
      d.textPages !== undefined &&
      (d.pages === undefined || d.textPages > d.pages)
    )
      ctx.addIssue({
        code: "custom",
        message: "Text pages cannot exceed total PDF pages.",
      });
    if ((d.width === undefined) !== (d.height === undefined))
      ctx.addIssue({
        code: "custom",
        message: "Image width and height must be supplied together.",
      });
  });
export const reportSchema = z.object({
  title: z.string().min(1).max(120),
  timestamp: z.string().datetime(),
  rows: z
    .array(
      z.object({
        rule: ruleSchema,
        files: z.array(documentMetaSchema).max(40),
        findings: z
          .array(
            z.object({
              status: z.enum([
                "pass",
                "failed",
                "warning",
                "review",
                "missing",
                "unchecked",
              ]),
              check: z.string().max(150),
              fileId: z.string().max(100).optional(),
              fileName: z.string().max(200).optional(),
              message: z.string().max(2000),
              action: z.string().max(2000),
            }),
          )
          .max(1000),
      }),
    )
    .max(100),
  unmapped: z.array(documentMetaSchema).max(40),
  status: z.enum(["Not ready", "Needs review", "All configured checks passed"]),
  completed: z.number().int().nonnegative(),
  missing: z.number().int().nonnegative(),
  failed: z.number().int().nonnegative(),
  warnings: z.number().int().nonnegative(),
  review: z.number().int().nonnegative(),
});
