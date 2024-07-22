import React from 'react'
import classNames from 'classnames'

interface Props {
  width: string
  height: string
  style?: string
}

const Skeleton = ({ width, height, style }: Props) => {
  return <div className={classNames('animate-pulse rounded-2xl bg-tertiary-base', style)} style={{ width: width, height: height }}></div>
}

export default Skeleton
