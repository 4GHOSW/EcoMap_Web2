import React, { useRef } from 'react'
import { toast } from 'react-toastify'

interface Props {
  children: React.ReactNode
  name: string
  accept: string
  multiple?: boolean
  disabled?: boolean
  maxCnt?: number
  style?: string
  setFiles: (files: File[]) => void
}

const FileInput = ({ children, name, accept = 'image/*', multiple = false, disabled = false, maxCnt = 1, style, setFiles }: Props) => {
  const inputRef = useRef<any>(null)

  const selected = async (e: any) => {
    if (!e.target.files.length) return
    if (e.target.files.length > maxCnt) {
      toast.warn('최대 업로드 갯수를 초과했습니다')
      return
    }

    const files: File[] = Array.from(e.target.files)
    setFiles(files)
  }

  const openFilePicker = () => {
    if (inputRef.current) {
      inputRef.current.value = '' // 초기화
      inputRef.current.click()
    }
  }

  return (
    <div onClick={openFilePicker} className={`flex min-w-0 ${style}`}>
      <input ref={inputRef} type="file" name={name} accept={accept} multiple={multiple} disabled={disabled} onChange={(e) => selected(e)} className="hidden" />
      {children}
    </div>
  )
}

export default FileInput
