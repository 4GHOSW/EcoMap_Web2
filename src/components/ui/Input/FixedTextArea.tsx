'use client'

import { useIsMobile } from '@/lib/hook/useIsMobile'
import { classNames } from '@/util/cssUtils'
import { ChangeEvent, InputHTMLAttributes } from 'react'

interface Props extends Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'style'> {
  text: string
  setText: (text: string) => void
  disabled?: boolean
  loading?: boolean
  style?: string
  isCounting?: boolean
  mobileVariant?: 'content' | 'content-full'
  height?: string
  heightPc?: string
  rounded?: string
  transformorigin?: string
  scrollBg?: boolean
}

const FixedTextArea = ({
  text,
  setText,
  disabled = false,
  loading = false,
  style = '',
  isCounting = false,
  height,
  heightPc,
  mobileVariant = 'content',
  rounded,
  scrollBg = true,
  transformorigin,
  ...rest
}: Props) => {
  const isMobile = useIsMobile()

  return (
    <div className={classNames(`relative flex w-full flex-col items-end ${isMobile ? `${height ?? 'h-[150px]'}` : `${heightPc}`} `)}>
      {scrollBg && (
        <>
          {/*  <div className={`absolute left-2.5 right-2.5 top-[2px] z-10 h-2.5 -translate-y-[1px] lg:top-0  lg:translate-y-[0px] ${disabled ? '' : 'bg-white'}`} />
          <div
            className={`absolute bottom-[21px] left-2.5 right-2.5 z-10 h-2.5 translate-y-[1.5px] bg-white lg:bottom-[18px] lg:translate-y-[1px] ${disabled ? '' : 'bg-white'}`}
          /> */}
        </>
      )}

      {/*  'absolute left-1/2 top-1/2 h-[114.285%] w-[114.285%] origin-top-left -translate-x-1/3 -translate-y-1/2 scale-[0.875] text-[16px]  */}
      <textarea
        className={classNames(
          `fixed-textarea cursor-text resize-none overflow-y-scroll ${rounded ? rounded : 'rounded-base'} border-none px-3 py-3 outline outline-1 outline-tertiary-base placeholder:text-typo-100 focus:outline-typo-300   ${isMobile ? `absolute left-[57%]   -translate-x-1/2 ${transformorigin}  ${mobileVariant === 'content' ? ' top-[50%] -translate-y-1/2 ' : ' top-[57%] -translate-y-[calc(50%+10px)] '} ${rest.maxLength ? 'h-[calc(114%-20px)]' : 'h-[114%]'} w-[114%] origin-top-left  scale-[0.875] text-[16px] ` : `w-full text-body ${height ? height : 'h-[150px]'}`}`,

          style,
        )}
        disabled={disabled || loading}
        value={text}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => (rest.maxLength !== undefined ? setText(e.target.value.replace(/\n/g, '\r\n').substring(0, rest.maxLength)) : setText(e.target.value.replace(/\n/g, '\r\n')))}
        {...rest}
      />
      {rest.maxLength !== undefined && isCounting && (
        <span
          className={classNames('text-desc ', isMobile ? ' mt-auto ' : ' mt-1 ', text.length >= rest.maxLength ? ' font-bold text-typo-500' : '  text-typo-100')}
        >{`${text.length}/${rest.maxLength}`}</span>
      )}
    </div>
  )
}

export default FixedTextArea
