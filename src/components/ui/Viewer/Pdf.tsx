import 'react-pdf/dist/esm/Page/AnnotationLayer.css'

import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

// workerSrc 정의 하지 않으면 pdf 보여지지 않습니다.
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

interface Props {
  pdfUrl: string
  reqPage?: number
  setIsLoaded?: Dispatch<SetStateAction<boolean>>
}

const Pdf = ({ pdfUrl, reqPage, setIsLoaded }: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  const [numPages, setNumPages] = useState(0)
  const [width, setWidth] = useState(0)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    if (ref.current) setWidth(ref.current.offsetWidth - 16)
    setNumPages(numPages) // 해당값이 실제로 필요한가?
    setIsLoaded?.(true)
  }

  useEffect(() => {
    if (ref.current) setWidth(ref.current.offsetWidth)
  }, [ref])

  return (
    <>
      <Document className={`relative w-full`} file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <div ref={ref} className={`mb-[16px] flex h-[0px] w-full items-center`}></div>
        <div className={'h-fit max-h-full w-full max-w-full overflow-hidden '}>
          <Page scale={1} width={width} pageNumber={reqPage} renderTextLayer={false} className={'max-h-full max-w-full scale-[100%]'} />
        </div>
      </Document>
    </>
  )
}

export default Pdf
