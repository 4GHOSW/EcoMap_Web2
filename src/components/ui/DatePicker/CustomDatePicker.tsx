'use client'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { getMonth, getYear } from 'date-fns'
import { ko } from 'date-fns/locale'
import React, { useState } from 'react'
import { classNames } from '@/util/cssUtils'
import ImageButton from '../Button/ImageButton'
import ChevronRightIcon from '@heroicons/react/24/outline/ChevronRightIcon'
import TextButton from '../Button/TextButton'
import '@/style/datepicker-custom.css'

interface Props {
  selectedDate: Date | null
  setSelectedDate: (date: Date | null) => void
  setIsFocused?: (val: boolean) => void
}

const CustomDatePicker = ({ selectedDate, setSelectedDate, setIsFocused }: Props) => {
  const years = Array.from({ length: 7 }, (_, i) => getYear(new Date()) - 3 + i)
  const months = Array.from({ length: 12 }, (_, i) => `${i + 1}월`)

  const [isOpen, setIsOpen] = useState(false)

  return (
    <DatePicker
      renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
        <div className="mb-2.5 flex items-center justify-between px-2">
          <ImageButton className="text-typo-300" icon={<ChevronRightIcon className="h-4 w-4 rotate-180" />} onClick={decreaseMonth} disabled={prevMonthButtonDisabled} />

          <div className="flex items-center gap-x-2">
            <select className="text-desc2 font-bold text-typo-500" value={getYear(date)} onChange={({ target: { value } }) => changeYear(Number(value))}>
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select className="text-desc2 font-bold text-typo-500" value={months[getMonth(date)]} onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}>
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <ImageButton className="text-typo-300" icon={<ChevronRightIcon className="h-4 w-4" />} onClick={increaseMonth} disabled={nextMonthButtonDisabled} />
        </div>
      )}
      selected={selectedDate}
      onChange={(date) => {
        setSelectedDate(date)
        setIsOpen(false)
      }}
      onInputClick={() => setIsOpen(true)}
      onClickOutside={() => setIsOpen(false)}
      open={isOpen}
      locale={ko}
      showPopperArrow={false}
      onFocus={() => setIsFocused && setIsFocused(true)}
      onBlur={() => setIsFocused && setIsFocused(false)}
      autoComplete="off"
      dayClassName={(date: Date) => (date.getDay() === 0 || date.getDay() === 6 ? 'react-datepicker__weekend-end' : '')}
      className={classNames(
        `bg-calendar-disabled hover:bg-calendar focus:bg-calendar flex h-[34px] w-full items-center justify-center rounded-sm border border-tertiary-base bg-[size:16px] bg-[position:calc(100%-10px)_center] bg-no-repeat px-3 text-sm text-typo-500 placeholder:text-typo-200 focus:border-typo-300 focus-visible:outline-0`,
      )}
      dateFormat={'yyyy-MM-dd'}
    >
      <div className="flex w-full justify-between">
        <TextButton
          text="오늘"
          color="outline"
          height="h-6"
          width="w-auto"
          style="px-1"
          onClick={() => {
            setSelectedDate(new Date())
            setIsOpen(false)
          }}
        />
        <TextButton text="닫기" color="outline" height="h-6" width="w-auto" style="px-1" onClick={() => setIsOpen(false)} />
      </div>
    </DatePicker>
  )
}
export default CustomDatePicker
