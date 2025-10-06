// src/utils/pdfExtractor.ts
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

// ✅ this tells pdf.js to use the local worker file bundled by Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map((item:any) => item.str || "")
        .join(" ");

      fullText += pageText + "\n\n";
    }

    return fullText.trim();
  } catch (err) {
    console.error("PDF extraction failed:", err);
    throw new Error("Failed to extract text from PDF");
  }
}
