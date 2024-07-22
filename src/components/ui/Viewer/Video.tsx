import React, { VideoHTMLAttributes } from 'react'

interface Props extends Omit<VideoHTMLAttributes<HTMLVideoElement>, 'style'> {
  controls?: boolean
  preload?: string
  style?: string
}

const Video = ({ controls = true, preload = 'metadata', style = '', ...rest }: Props) => {
  let defaultStyle = 'w-full h-full'
  return <video controls={controls} preload={preload} className={defaultStyle + ' ' + style} {...rest} />
}

export default Video
