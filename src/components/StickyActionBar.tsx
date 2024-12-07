// src/components/StickyActionBar.tsx
import { toast } from "@/hooks/use-toast";
import { Copy, Download } from "lucide-react";
import { PDFDocument, rgb } from "pdf-lib";
import { useStore } from "../lib/store";
import { Button } from "./ui/button";

export const StickyActionBar = () => {
  const { text } = useStore((state) => state.prd);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(
      () =>
        toast({
          title: "Copied to clipboard",
        }),
      () =>
        toast({
          title: "Cannot copy to clipboard",
        }),
    );
  };

  const handleDownload = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    page.drawText(text, {
      x: 50,
      y: 350,
      size: 12,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "prd-copilot.pdf";
    link.click();
    toast({
      title: "Successfully downloaded",
    });
  };

  return (
    <div className="fixed left-1/2 mx-4 bottom-2 right-0 px-2 py-2 font-semibold text-sm text-slate-900 bg-slate-50/90 backdrop-blur-sm ring-1 ring-slate-900/10 space-x-4 rounded-xl shadow-2xl sm:mt-4 my-6 h-auto min-h-[5rem] sm:min-h-[1rem]">
      <div className="flex items-center justify-between gap-1 sm:gap-4 text-white text-sm font-bold font-mono leading-6 bg-stripes-indigo rounded-lg h-full">
        <Button
          onClick={handleCopy}
          className="opacity-50 grow h-16 p-0 sm:p-[1.1rem] w-20 sm:w-auto rounded-lg flex items-center justify-center bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100 shadow-lg border"
        >
          <Copy />
        </Button>

        <Button
          onClick={handleDownload}
          className="opacity-50 p-4 grow w-auto h-16 rounded-lg flex items-center justify-center bg-gray-50 border border-gray-300 text-gray-600 hover:bg-gray-100 shadow-lg text-xs sm:text-base"
        >
          <Download />
          Download
        </Button>
      </div>
    </div>
  );
};
