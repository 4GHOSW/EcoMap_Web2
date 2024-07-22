'use client'

import { ChangeEvent, forwardRef, InputHTMLAttributes, ReactNode, Ref, useEffect, useMemo, useState } from 'react'
import { useIsMobile } from '@/lib/hook/useIsMobile'
import { classNames } from '@/util/cssUtils'

interface Props extends Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'style'> {
  text: string
  setText: (val: string) => void
  hasImage?: boolean
  disabled?: boolean
  loading?: boolean
  style?: string
  isCounting?: boolean
  scrollToBottom?: () => void
  children?: ReactNode
}

const ResizeTextArea = forwardRef(
  (
    { text, setText, hasImage = false, disabled = false, loading = false, style = '', isCounting = false, scrollToBottom, children, ...rest }: Props,
    ref: Ref<HTMLTextAreaElement>,
  ) => {
    const isMobile = useIsMobile()
    const [isFocused, setIsFocused] = useState(false)

    const areaHeight = useMemo(() => {
      if (hasImage) {
        if (text.length <= 0 && !isFocused) return 'h-[176px]'
        if (isMobile) return 'h-[261px]'
        return 'h-[216px]'
      }
      if (text.length <= 0 && !isFocused) return 'h-24'
      if (isMobile) return 'h-[165px]'
      return 'h-[120px]'
    }, [hasImage, isMobile, text, isFocused])

    useEffect(() => {
      loading && setIsFocused(false)
    }, [loading])

    useEffect(() => {
      hasImage && setIsFocused(true)
    }, [hasImage])

    return (
      <div className={classNames('textarea-focus relative  w-full bg-white transition-all', areaHeight)}>
        <textarea
          ref={ref}
          className={classNames(
            `cursor-text resize-none  border-none px-3 text-body caret-primary  outline outline-1 transition-all placeholder:text-typo-100 ${isMobile ? 'relative left-1/2 top-1/2 h-[114.285%] w-[114.285%] -translate-x-1/2 -translate-y-1/2 scale-[0.875] text-[16px]' : 'h-full w-full '} `,
            hasImage ? 'pt-[56px]' : 'pt-3',
            children
              ? `scroll-pb-9 rounded-base pb-9 ${text.length <= 0 && !hasImage ? 'outline-tertiary-base focus:outline-primarySoft' : ' outline-primarySoft focus:outline-primarySoft'}`
              : 'scroll-pb-4 rounded-sm border-tertiary-base py-4 focus:border-typo-300',
          )}
          disabled={disabled || loading}
          onFocus={() => {
            setIsFocused(true)
            scrollToBottom?.()
          }}
          onBlur={() => !hasImage && setIsFocused(false)}
          value={text}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => (rest.maxLength !== undefined ? setText(e.target.value.substring(0, rest.maxLength)) : setText(e.target.value))}
          {...rest}
        />
        {rest.maxLength !== undefined && isCounting && (
          <div className={classNames('-mt-1 flex justify-end text-desc', rest.maxLength === text?.length ? ' font-bold text-typo-500' : '  text-typo-100')}>
            <span>{text?.length}</span>/<span>{rest.maxLength}</span>
          </div>
        )}
        {children && (
          <>
            <div className={`rounded-inherit absolute left-[10px] right-[10px] h-3 translate-y-[1px] lg:top-0 lg:translate-y-[0px]   ${disabled ? '' : ' bg-white'}  h-2.5`} />
            <div
              className={`rounded-inherit absolute bottom-0 left-[10px] right-[10px] h-7 translate-y-[1px] lg:translate-y-[0px]   ${disabled ? '' : " bg-white after:absolute after:left-0 after:right-0 after:top-0 after:-z-0 after:block after:h-2.5 after:-translate-y-full after:bg-gradient-to-t after:from-white after:to-transparent after:to-90% after:content-[''] "}  lg:h-8`}
            />
          </>
        )}

        {children}
      </div>
    )
  },
)

ResizeTextArea.displayName = 'ResizingTextArea'
export default ResizeTextArea
