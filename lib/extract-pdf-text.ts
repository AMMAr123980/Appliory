import type { TextPage } from "./document-summary";
export async function extractPDFText(
  file: File,
  onProgress?: (page: number, total: number) => void,
): Promise<TextPage[]> {
  if (file.size > 25 * 1024 * 1024)
    throw new Error("Choose a PDF smaller than 25 MB.");
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!String.fromCharCode(...bytes.slice(0, 5)).startsWith("%PDF-"))
    throw new Error("This file does not have a PDF signature.");
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  const task = pdfjs.getDocument({
    data: bytes,
    useSystemFonts: true,
    maxImageSize: 25000000,
    stopAtErrors: true,
  });
  try {
    const pdf = await task.promise;
    if (pdf.numPages > 100)
      throw new Error(
        "Content summaries support up to 100 pages. Split a copy of this PDF before summarizing it.",
      );
    const pages: TextPage[] = [];
    let characters = 0;
    for (let n = 1; n <= pdf.numPages; n++) {
      const page = await pdf.getPage(n);
      const content = await page.getTextContent();
      const lines: string[] = [];
      let line = "",
        previousY: number | undefined;
      for (const item of content.items) {
        if (!("str" in item)) continue;
        const y = item.transform[5];
        if (
          previousY !== undefined &&
          Math.abs(y - previousY) > 3 &&
          line.trim()
        ) {
          lines.push(line.trim());
          line = "";
        }
        line += (line && !line.endsWith(" ") ? " " : "") + item.str;
        previousY = y;
        if (item.hasEOL) {
          if (line.trim()) lines.push(line.trim());
          line = "";
          previousY = undefined;
        }
      }
      if (line.trim()) lines.push(line.trim());
      const text = lines.join("\n");
      characters += text.length;
      if (characters > 500000)
        throw new Error(
          "This PDF has more than 500,000 extracted characters. Split it into smaller PDFs to summarize every part.",
        );
      pages.push({ number: n, text });
      page.cleanup();
      onProgress?.(n, pdf.numPages);
    }
    return pages;
  } catch (e) {
    if (e instanceof Error && /password/i.test(e.message))
      throw new Error(
        "This PDF requires a password. Unlock a copy before summarizing it.",
      );
    throw e;
  } finally {
    await task.destroy();
  }
}
