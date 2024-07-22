import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeMathjax from 'rehype-mathjax'
import rehypeRaw from 'rehype-raw'
import CodeBlock from './CodeBlock'
import { memo, PropsWithChildren } from 'react'
import { classNames } from '@/util/cssUtils'
import '@/style/markdown.css'
import Image from 'next/image'

interface Props {
  source: string
}

const UnMemorizedMarkdown = ({ source }: Props) => {
  return (
    <>
      <ReactMarkdown
        className="markdown prose prose-sm"
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeMathjax, rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const language = className?.replace('language-', '') || ''
            return !inline && language ? (
              <CodeBlock key={Math.random()} language={language} value={String(children).replace(/\n$/, '')} {...props} />
            ) : (
              <code className={classNames(className, 'rounded bg-tertiary-surface30 px-1 py-0.5')} {...props}>
                {children}
              </code>
            )
          },
          pre({ children }) {
            return <pre className={'not-prose min-w-full'}>{children}</pre>
          },
          a: ({ node, ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer">
              {props.children}
            </a>
          ),
          table({ children }) {
            return <table className="visible-scrollbar min-w-full table-fixed border-collapse overflow-x-auto bg-gray-50">{children}</table>
          },
          tr({ children }) {
            return <tr className={'border-borderColor [&:not(:last-child)]:border-b'}>{children}</tr>
          },
          th({ children }) {
            return <th className="break-words bg-tertiary-surface10 py-3 pl-4 text-left text-desc2 font-bold leading-5 text-typo-300">{children}</th>
          },
          td({ children }) {
            return (
              <td title={children as string} className="min-w-full divide-gray-300 truncate whitespace-nowrap break-words bg-white px-4 py-4 text-body leading-4 text-typo-500">
                {children}
              </td>
            )
          },
          img({ src, alt }: PropsWithChildren<{ src?: string; alt?: string }>) {
            return (
              <div className="relative my-4 h-0 w-full pb-[58%]">
                <Image src={src ?? ''} alt={alt ?? ''} fill className="left-0 top-0 h-full w-full object-contain" priority={true} sizes="(min-width: 640px) 50vw, 100vw" />
              </div>
            )
          },
        }}
      >
        {source}
      </ReactMarkdown>
    </>
  )
}

const Markdown = memo(UnMemorizedMarkdown)

export default Markdown
