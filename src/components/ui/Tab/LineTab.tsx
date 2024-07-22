import { classNames } from '@/util/cssUtils'

export interface tabType {
  key: string
  name: string
  current: boolean
}

export interface mobileTabProps {
  muiltiTab?: boolean
  tabStyle?: 'line' | 'lineLight' | 'index'
  tabs: tabType[]
  onClick: (e: any) => void
}

const LineTab = ({ muiltiTab = false, tabs, onClick, tabStyle = 'line' }: mobileTabProps) => {
  return (
    <div className="order-0 block w-full">
      <div className={`${tabStyle === 'line' ? '  ' : tabStyle === 'index' ? ' relative z-[3] -mb-[1px] border-b-white  ' : ''} `}>
        <div
          className={classNames(
            `flex items-end ${tabStyle === 'line' || tabStyle === 'lineLight' ? ' ' : tabStyle === 'index' ? ' relative z-[3] -mb-[1px] border-b-white lg:gap-x-1 ' : ''} `,
            muiltiTab ? '' : 'w-full ',
          )}
          aria-label="Tabs"
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onClick(tab.key)}
              className={classNames(
                tab.current
                  ? `${tabStyle === 'line' ? ' border-primary text-primary' : tabStyle === 'lineLight' ? ' border-primarySoft text-primarySoft' : tabStyle === 'index' ? 'h-[38px]  border border-tertiary-borderColor border-b-white bg-white text-typo-700 lg:h-10 ' : ''} font-bold `
                  : ` ${tabStyle === 'line' ? 'border-tertiary-base text-typo-250' : tabStyle === 'lineLight' ? 'border-tertiary-base text-typo-100' : tabStyle === 'index' ? `h-10 bg-tertiary-tabDisabled lg:h-[38px] ` : ''}`,
                muiltiTab ? `lg:w-auto lg:flex-none lg:py-2` : `w-1/${tabs.length}`,
                ` flex flex-1 cursor-pointer items-center justify-center break-all text-body ${tabStyle === 'line' ? ' h-10  border-b-[3px]  bg-white text-center' : tabStyle === 'lineLight' ? ' h-10  border-b-[2px]  bg-white text-center' : tabStyle === 'index' ? `h-10 origin-bottom rounded-t-base px-8 text-typo-250 lg:px-4 2xl:min-w-[125px] ` : ''}`,
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

export default LineTab
