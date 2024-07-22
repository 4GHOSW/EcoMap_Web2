'use client'

import { IconCheck, IconClipboard } from '@tabler/icons-react'
import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface Props {
  language: string
  value: string
}

const CodeBlock = ({ language, value }: Props) => {
  const [isCopied, setIsCopied] = useState<Boolean>(false)

  const copyToClipboard = () => {
    if (!navigator.clipboard || !navigator.clipboard.writeText) return

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true)

      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    })
  }

  return (
    <div className="not-prose codeblock relative my-[8px] w-full min-w-full max-w-full font-sans text-sm">
      <div className="flex items-center justify-between rounded-t bg-black px-4 py-1.5">
        <span className="text-xs lowercase text-white">{language}</span>

        <div className="flex items-center">
          <button className="flex items-center gap-1.5 rounded bg-none p-1 text-xs text-white" onClick={copyToClipboard}>
            {isCopied ? <IconCheck size={18} /> : <IconClipboard size={18} />}
            {isCopied ? '복사됨' : '코드 복사'}
          </button>
        </div>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          width: '100%',
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
        }}
        showLineNumbers={true}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeBlock
