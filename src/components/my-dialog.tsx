import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ReactNode } from 'react'

interface Props {
  title?: string
  open: boolean
  children: ReactNode
  setOpen: () => void
}

export const MyDialog = ({ title = '', open, setOpen, children }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/*<DialogTrigger>Open</DialogTrigger>*/}
      <DialogContent>
        <DialogHeader>
          {title && <DialogTitle>Are you absolutely sure?</DialogTitle>}
          <DialogDescription>{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
