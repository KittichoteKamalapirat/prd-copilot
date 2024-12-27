import { Download } from 'lucide-react'
import { HTMLProps } from 'react'
import { useStore } from '../lib/store'
import { cn } from '../lib/utils'
import { Button } from './ui/button'

export const ActionBar = ({ className }: HTMLProps<HTMLDivElement>) => {
  const { text } = useStore((state) => state.prd)
  const { set: setDisplay } = useStore((state) => state.display)
  const disabled = !text

  // const handleCopy = () => {
  //   navigator.clipboard.writeText(text).then(
  //     () =>
  //       toast({
  //         title: 'Copied to clipboard',
  //       }),
  //     () =>
  //       toast({
  //         title: 'Cannot copy to clipboard',
  //       })
  //   )
  // }

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-1 sm:gap-4 rounded-lg">
        {/*<Button*/}
        {/*  onClick={handleCopy}*/}
        {/*  variant="outline"*/}
        {/*  className={cn('flex-1', disabled && 'opacity-50 cursor-not-allowed')}*/}
        {/*  disabled={disabled}*/}
        {/*>*/}
        {/*  <Copy />*/}
        {/*</Button>*/}

        <Button
          onClick={() => setDisplay({ showDownloadModal: true })}
          variant="outline"
          className={cn('flex-1', disabled && 'opacity-50 cursor-not-allowed')}
          disabled={disabled}
        >
          <Download />
          Download
        </Button>
      </div>
    </div>
  )
}
