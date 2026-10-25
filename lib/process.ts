import type { LocalDocument } from "./model";
import { uid } from "./model";
import { sha256 } from "@noble/hashes/sha2.js";
import { detectFormat } from "./validation/engine";
async function decodeImage(file: File): Promise<{
  source: CanvasImageSource;
  width: number;
  height: number;
  close: () => void;
}> {
  if (typeof createImageBitmap === "function") {
    try {
      const bitmap = await createImageBitmap(file);
      return {
        source: bitmap,
        width: bitmap.width,
        height: bitmap.height,
        close: () => bitmap.close(),
      };
    } catch {
      /* Try the browser image decoder before reporting an unsupported image. */
    }
  }
  const url = URL.createObjectURL(file);
  const image = new Image();
  try {
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () =>
        reject(new Error("This image could not be decoded."));
      image.src = url;
    });
    return {
      source: image,
      width: image.naturalWidth,
      height: image.naturalHeight,
      close: () => URL.revokeObjectURL(url),
    };
  } catch (e) {
    URL.revokeObjectURL(url);
    throw e;
  }
}
export async function inspectFile(
  file: File,
  ruleId = "",
  options: { content?: boolean } = {},
): Promise<LocalDocument> {
  if (file.size > 25 * 1024 * 1024)
    throw new Error("Each file must be 25 MB or smaller.");
  const bytes = new Uint8Array(await file.arrayBuffer());
  const hash = [
    ...(crypto.subtle
      ? new Uint8Array(await crypto.subtle.digest("SHA-256", bytes))
      : sha256(bytes)),
  ]
    .map((n) => n.toString(16).padStart(2, "0"))
    .join("");
  const d: LocalDocument = {
    id: uid(),
    file,
    original: file,
    ruleId,
    name: file.name,
    size: file.size,
    type: file.type,
    detected: detectFormat(bytes),
    hash,
  };
  if (options.content === false) return d;
  try {
    if (d.detected === "pdf") {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      const task = pdfjs.getDocument({
        data: bytes.slice(),
        useSystemFonts: true,
        maxImageSize: 25000000,
        stopAtErrors: true,
      });
      try {
        const pdf = await task.promise;
        d.pages = pdf.numPages;
        if (pdf.numPages > 300) throw new Error("PDF_PAGE_LIMIT");
        d.textPages = 0;
        for (let n = 1; n <= pdf.numPages; n++) {
          const page = await pdf.getPage(n);
          const text = await page.getTextContent();
          if (text.items.some((t) => "str" in t && t.str.trim())) d.textPages++;
          page.cleanup();
        }
      } finally {
        await task.destroy();
      }
    } else if (["jpg", "png", "webp"].includes(d.detected)) {
      const bmp = await decodeImage(file);
      d.width = bmp.width;
      d.height = bmp.height;
      bmp.close();
    }
  } catch (e) {
    d.error =
      e instanceof Error && e.message === "PDF_PAGE_LIMIT"
        ? "Full document checks support up to 300 PDF pages. Split a copy into smaller PDFs before checking."
        : e instanceof Error && /password/i.test(e.message)
          ? "This PDF is password protected. Unlock a copy before checking."
          : "The file could not be read. It may be damaged or unsupported.";
  }
  return d;
}
export async function transformImage(
  file: File,
  width: number,
  height: number,
  type: string,
  targetKB: number,
) {
  if (
    !["image/jpeg", "image/png", "image/webp"].includes(type) ||
    !Number.isInteger(width) ||
    !Number.isInteger(height) ||
    width < 1 ||
    height < 1 ||
    width > 16384 ||
    height > 16384 ||
    !Number.isFinite(targetKB) ||
    targetKB < 0
  )
    throw new Error(
      "Use supported formats and valid positive pixel dimensions.",
    );
  if (width * height > 25000000) {
    throw new Error("Choose dimensions below 25 megapixels.");
  }
  const bmp = await decodeImage(file);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bmp.close();
    throw new Error("Image editing is unavailable.");
  }
  if (type === "image/jpeg") {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);
  }
  try {
    ctx.drawImage(bmp.source, 0, 0, width, height);
  } finally {
    bmp.close();
  }
  let blob: Blob | null = null;
  for (let q = 0.92; q >= 0.18; q -= 0.08) {
    blob = await new Promise((r) => canvas.toBlob(r, type, q));
    if (
      blob &&
      (!targetKB || blob.size <= targetKB * 1024 || type === "image/png")
    )
      break;
  }
  if (!blob) throw new Error("Image conversion failed.");
  if (blob.type !== type)
    throw new Error(
      "Your browser cannot export this format. Choose JPEG or PNG.",
    );
  const ext = type.split("/")[1] === "jpeg" ? "jpg" : type.split("/")[1];
  return new File(
    [blob],
    file.name.replace(/\.[^.]*$/, "") + "-edited." + ext,
    { type },
  );
}
