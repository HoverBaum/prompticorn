import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useMediaQuery } from '@/lib/useMediaQuery'
import { useState } from 'react'
import { SuccessFullImageGeneration } from '../../ImageGeneration.context'
import { Skeleton } from '@/components/ui/skeleton'
import { AspectRatio } from '@/components/ui/aspect-ratio'

type ImageDrawerProps = {
  generation: SuccessFullImageGeneration
}

const ImageButton = ({ src }: { src: string }) => {
  return (
    <div className="w-12 h-12 relative rounded-sm overflow-hidden">
      <Skeleton className="w-full h-full" />
      <img src={src} className="w-12 h-12 absolute top-0" />
    </div>
  )
}

export const ImageDrawer = ({ generation }: ImageDrawerProps) => {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { src } = generation

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = src
    link.download = `prompticorn-image-${generation.id}.png`
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <ImageButton src={src} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Your Image</DialogTitle>
            <DialogDescription>{generation.prompt}</DialogDescription>
          </DialogHeader>
          <AspectRatio ratio={1 / 1} className="rounded-md overflow-hidden">
            <Skeleton className="w-full h-full" />
            <img src={src} className="z-10 absolute top-0" />
          </AspectRatio>
          <Button onClick={handleDownload}>Download image</Button>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <ImageButton src={src} />
      </DrawerTrigger>

      <DrawerContent>
        <div className="max-h-[80ch] overflow-y-scroll">
          <DrawerHeader className="text-left">
            <DrawerTitle>Your Image</DrawerTitle>
            <DrawerDescription>{generation.prompt}</DrawerDescription>
          </DrawerHeader>

          <div className="px-4">
            <AspectRatio ratio={1 / 1} className="rounded-md overflow-hidden">
              <Skeleton className="w-full h-full" />
              <img src={src} className="z-10 absolute top-0" />
            </AspectRatio>
          </div>

          <DrawerFooter className="pt-4">
            <Button onClick={handleDownload}>Download image</Button>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
