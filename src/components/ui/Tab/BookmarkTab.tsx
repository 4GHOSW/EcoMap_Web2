import { classNames } from '@/util/cssUtils'

export interface tabType {
  key: string
  name: string
  current: boolean
}

interface Props {
  muiltiTab?: boolean
  tabs: tabType[]
  onClick: (e: any) => void
}

const BookmarkTab = ({ muiltiTab = false, tabs, onClick }: Props) => {
  return (
    <div className="order-0 block w-full">
      <div className="border-GRAY_1 border-b">
        <div className={classNames(`flex gap-6`, muiltiTab ? '' : 'w-full items-stretch')} aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onClick(tab.key)}
              className={classNames(
                tab.current ? `text-GRAY_7 border-primary font-bold` : `text-GRAY_4 border-transparent font-medium hover:border-gray-300 hover:text-gray-700`,
                muiltiTab ? `py-4 xl:w-auto xl:flex-none xl:py-2` : ``,
                `w-1/${tabs.length} flex flex-1 cursor-pointer items-center justify-center break-all border-b-2 py-2 text-center text-xl hover:opacity-80`,
              )}
              style={{ wordBreak: 'keep-all' }}
              aria-current={tab.current ? 'page' : undefined}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BookmarkTab
