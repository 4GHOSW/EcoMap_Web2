'use client'

import { useState, useMemo, useCallback } from 'react'

export type TabType = {
  key: string
  name: string
  current: boolean
  changed?: string
}

function useTab(initialTabData: TabType[]) {
  const [tabData, setTabData] = useState<TabType[]>(initialTabData)

  const selectTabData = useMemo(() => tabData.filter((item) => item.current), [tabData])

  const changeTab = useCallback((clickedTab: string) => {
    setTabData((prev) =>
      prev.map((item) => ({
        ...item,
        current: item.key === clickedTab,
      })),
    )
  }, [])

  return { tabData, selectTabData, changeTab }
}

export default useTab
