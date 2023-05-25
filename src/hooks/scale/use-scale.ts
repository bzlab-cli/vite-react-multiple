import { useRef, useEffect } from 'react'
import { usePreviewFitScale, usePreviewFullScale } from '@/hooks/scale/use-preview-scale'
import { editCanvasConfig } from '@/constant/layout'

const PreviewScaleEnum = {
  FIT: 'fit',
  FULL: 'full'
}

export const useScale = () => {
  const screenRef = useRef() as any
  const previewRef = useRef() as any
  const width = useRef(editCanvasConfig.width)
  const height = useRef(editCanvasConfig.height)

  // 屏幕适配
  useEffect(() => {
    switch (editCanvasConfig.previewScaleType) {
      case PreviewScaleEnum.FIT:
        ;(() => {
          const { calcRate, windowResize, unWindowResize } = usePreviewFitScale(
            width.current,
            height.current,
            screenRef.current,
            previewRef.current
          )
          calcRate()
          windowResize()
          return () => {
            unWindowResize()
          }
        })()
        break
      case PreviewScaleEnum.FULL:
        ;(() => {
          const { calcRate, windowResize, unWindowResize } = usePreviewFullScale(
            width.current,
            height.current,
            previewRef.current
          )
          calcRate()
          windowResize()
          return () => {
            unWindowResize()
          }
        })()
        break
      default:
        break
    }
  }, [])

  return {
    screenRef,
    previewRef
  }
}
