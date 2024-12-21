import { toast } from '@/hooks/use-toast'
import { Copy, Download } from 'lucide-react'
import { PDFDocument, rgb } from 'pdf-lib'
import { HTMLProps } from 'react'
import { useStore } from '../lib/store'
import { cn } from '../lib/utils'
import { Button } from './ui/button'

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
      <div className="flex items-center justify-between gap-1 sm:gap-4 rounded-lg">
        <Button
          onClick={handleCopy}
          variant="outline"
          className={cn(
            'flex-1',
            // 'grow p-0 sm:p-[1.1rem] w-20 sm:w-auto rounded-lg flex items-center justify-center bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100 shadow-lg border',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          disabled={disabled}
        >
          <Copy />
        </Button>

        <Button
          onClick={handleDownload}
          variant="outline"
          className={cn(
            'flex-1',
            // 'grow p-0 sm:p-[1.1rem] w-20 sm:w-auto rounded-lg flex items-center justify-center bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100 shadow-lg border',
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
