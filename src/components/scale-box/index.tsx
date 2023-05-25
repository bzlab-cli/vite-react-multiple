import { useEffect } from 'react'
import { useScale } from '@/hooks/scale/use-scale'
import { editCanvasConfig } from '@/constant/layout'
import PropTypes from 'prop-types'
import './index.scss'

const ScaleBox = props => {
  const { screenRef, previewRef } = useScale()

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.style.position = 'relative'
      previewRef.current.style.width = editCanvasConfig.width ? `${editCanvasConfig.width}px` : '100%'
      previewRef.current.style.height = editCanvasConfig.width ? `${editCanvasConfig.height}px` : '100%'
    }
  }, [editCanvasConfig])

  return (
    <div ref={screenRef} className="screen-box">
      <div className={`scale-box ${editCanvasConfig.previewScaleType}`}>
        <div ref={previewRef} className="preview-scale">
          {props.children}
        </div>
      </div>
    </div>
  )
}

ScaleBox.propTypes = {
  children: PropTypes.any
}

export default ScaleBox
