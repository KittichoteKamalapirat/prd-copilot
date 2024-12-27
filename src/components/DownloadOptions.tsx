import { toast } from '@/hooks/use-toast'
import { HTMLProps } from 'react'
import { useStore } from '../lib/store'
import { cn } from '../lib/utils'
import { Button } from './ui/button'
import { Label } from './ui/label'

export const DownloadOptions = ({ className }: HTMLProps<HTMLDivElement>) => {
  const { text } = useStore((state) => state.prd)
  const disabled = !text

  // const handlePdfDownload = async () => {
  //   const pdfDoc = await PDFDocument.create()
  //   const page = pdfDoc.addPage([600, 400])
  //   page.drawText(text, {
  //     x: 50,
  //     y: 350,
  //     size: 12,
  //     color: rgb(0, 0, 0),
  //   })
  //
  //   const pdfBytes = await pdfDoc.save()
  //   const blob = new Blob([pdfBytes], { type: 'application/pdf' })
  //   const link = document.createElement('a')
  //   link.href = URL.createObjectURL(blob)
  //   link.download = 'prd-copilot.pdf'
  //   link.click()
  //   toast({
  //     title: 'Successfully downloaded PDF',
  //   })
  // }

  const handleMdDownload = () => {
    const blob = new Blob([text], { type: 'text/markdown' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'prd-copilot.md'
    link.click()
    toast({
      title: 'Successfully downloaded MD',
    })
  }

  const handleTxtDownload = () => {
    // 1. Remove common Markdown syntax
    const cleanedText = text
      // Remove heading markers (e.g., "# ", "## ", etc.)
      .replace(/^#{1,6}\s+/gm, '')
      // Remove bold markers (**)
      .replace(/\*\*/g, '')
      // Remove italic markers (* or _)
      .replace(/\*/g, '')
      .replace(/_/g, '')
      // Remove inline code markers (`)
      .replace(/`/g, '')
      // Remove blockquote markers (>)
      .replace(/^>\s+/gm, '')

    // 2. Create a Blob from the cleaned text
    const blob = new Blob([cleanedText], { type: 'text/plain' })

    // 3. Generate a download link and click it
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'prd-copilot.txt'
    link.click()

    // 4. Optionally show a toast
    toast({
      title: 'Successfully downloaded TXT',
    })
  }

  return (
    <div className={className}>
      <Label className="block text-lg font-bold">
        Choose the file format in which you want to download:
      </Label>
      <div className="flex items-center justify-between gap-2 sm:gap-4 rounded-lg mt-4">
        {/*<Button*/}
        {/*  onClick={handlePdfDownload}*/}
        {/*  className={cn('flex-1', disabled && 'opacity-50 cursor-not-allowed')}*/}
        {/*  disabled={disabled}*/}
        {/*>*/}
        {/*  PDF*/}
        {/*</Button>*/}

        <Button
          onClick={handleMdDownload}
          className={cn('flex-1', disabled && 'opacity-50 cursor-not-allowed')}
          disabled={disabled}
        >
          MD
        </Button>

        <Button
          onClick={handleTxtDownload}
          className={cn('flex-1', disabled && 'opacity-50 cursor-not-allowed')}
          disabled={disabled}
        >
          TXT
        </Button>
      </div>
    </div>
  )
}
