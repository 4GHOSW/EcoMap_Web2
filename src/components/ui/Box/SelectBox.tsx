import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { classNames } from '@/util/cssUtils'
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon'

export interface selectBoxDataProps<T = string> {
  id: number | string
  name: string
  value?: T
  exampleText?: string
}

interface Props<T = string> {
  data: selectBoxDataProps<T>[]
  selected: selectBoxDataProps<T>
  setSelected: (item: selectBoxDataProps<T>) => void
  disabled?: boolean
  loading?: boolean
  dropDirection?: string
  width?: string
  selectBtnStyle?: string
}

const SelectBox = <T,>({ data, selected, setSelected, disabled = false, loading = false, dropDirection = 'down', width = '470px', selectBtnStyle = '' }: Props<T>) => {
  return (
    <Listbox value={selected} onChange={setSelected} disabled={disabled || loading}>
      {({ open }) => (
        <div className={`relative ${width ? width : 'w-[150px]'}`}>
          <ListboxButton
            className={classNames(
              disabled ? 'bg-gray-100' : 'bg-white',
              selectBtnStyle ? selectBtnStyle : 'border-tertiary-borderColor pl-6 pr-10',
              `text-body text-typo-700 relative flex h-[34px] w-full cursor-pointer items-center rounded-sm border text-left leading-10 ring-inset focus-visible:outline-0`,
            )}
          >
            <span className="block truncate leading-[34px]">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon className={classNames(open ? 'rotate-180' : 'rotate-0', 'text-typo-300 h-3 w-4 transition-transform')} />
            </span>
          </ListboxButton>
          <Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            {data.length !== 0 && (
              <ListboxOptions
                className={classNames(
                  `rounded-base shadow-dropdown absolute z-[1000] max-h-[150px] w-full min-w-[150px] overflow-auto bg-white text-sm ring-1 ring-black ring-opacity-5 focus:outline-none`,
                  dropDirection === 'up' ? 'top-0 -mt-1 translate-y-[-100%]' : dropDirection === 'down' ? 'mt-1' : dropDirection,
                )}
              >
                {data.map((object) => (
                  <ListboxOption
                    key={object.id}
                    className={({ active, selected }) =>
                      classNames(active || selected ? 'bg-gray-100 font-bold' : '', 'text-body text-typo-700 relative cursor-default select-none px-6 py-2')
                    }
                    value={object}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? 'font-bold' : 'font-normal', 'block')}>{object.name}</span>
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            )}
          </Transition>
        </div>
      )}
    </Listbox>
  )
}

export default SelectBox
