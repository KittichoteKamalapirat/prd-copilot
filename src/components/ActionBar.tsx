import { toast } from '@/hooks/use-toast'
import { Copy, Download } from 'lucide-react'
import { PDFDocument, rgb } from 'pdf-lib'
import { useStore } from '../lib/store'
import { Button } from './ui/button'
import { cn } from '../lib/utils'
import { HTMLProps } from 'react'

export const ActionBar = ({ className }: HTMLProps<HTMLDivElement>) => {
  const { text } = useStore((state) => state.prd)
  const disabled = !text

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(
      () =>
        toast({
          title: 'Copied to clipboard',
        }),
      () =>
        toast({
          title: 'Cannot copy to clipboard',
        })
    )
  }

  const handleDownload = async () => {
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([600, 400])
    page.drawText(text, {
      x: 50,
      y: 350,
      size: 12,
      color: rgb(0, 0, 0),
    })

    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'prd-copilot.pdf'
    link.click()
    toast({
      title: 'Successfully downloaded',
    })
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-1 sm:gap-4 text-white text-sm font-bold font-mono leading-6 bg-stripes-indigo rounded-lg h-full">
        <Button
          onClick={handleCopy}
          className={cn(
            'grow h-16 p-0 sm:p-[1.1rem] w-20 sm:w-auto rounded-lg flex items-center justify-center bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100 shadow-lg border',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          disabled={disabled}
        >
          <Copy />
        </Button>

        <Button
          onClick={handleDownload}
          className={cn(
            'grow h-16 p-0 sm:p-[1.1rem] w-20 sm:w-auto rounded-lg flex items-center justify-center bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100 shadow-lg border',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          disabled={disabled}
        >
          <Download />
          Download
        </Button>
      </div>
    </div>
  )
}
