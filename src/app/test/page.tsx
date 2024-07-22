'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import ProgressBar from '@/components/ui/Bar/ProgressBar'
import TextButton from '@/components/ui/Button/TextButton'
import ImageButton from '@/components/ui/Button/ImageButton'
import ImageTextButton from '@/components/ui/Button/ImageTextButton'
import PhotoIcon from '@heroicons/react/24/outline/PhotoIcon'
import ToggleButton from '@/components/ui/Button/ToggleButton'
import SelectBox, { selectBoxDataProps } from '@/components/ui/Box/SelectBox'
import CheckboxInput from '@/components/ui/Input/CheckboxInput'
import RadioInput from '@/components/ui/Input/RadioInput'
import Label from '@/components/ui/Input/Label'
import EmailInput from '@/components/ui/Input/EmailInput'
import PasswordInput from '@/components/ui/Input/PasswordInput'
import TextInput from '@/components/ui/Input/TextInput'
import Textarea from '@/components/ui/Input/Textarea'
import Tooltip from '@/components/ui/Tooltip/Tooltip'
import { useOverlay } from '@/lib/hook/useOverlay'
import ExampleFooterModal from '@/components/template/modal/ExampleFooterModal'
import ExampleDialogModal from '@/components/template/modal/ExampleDialogModal'
import ExampleSequentialModal from '@/components/template/modal/ExampleSequentialModal'
import LineTab from '@/components/ui/Tab/LineTab'
import BookmarkTab from '@/components/ui/Tab/BookmarkTab'
import useTab, { TabType } from '@/lib/hook/useTab'
import FileInput from '@/components/ui/Input/FileInput'
import ExamplePdfModal from '@/components/template/modal/ExamplePdfModal'
import Video from '@/components/ui/Viewer/Video'
import Markdown from '@/components/ui/Viewer/Markdown'
import CodeBlock from '@/components/ui/Viewer/CodeBlock'
import BasicSwiper from '@/components/ui/Swiper/BasicSwiper'
import CustomDatePicker from '@/components/ui/DatePicker/CustomDatePicker'
import BasicPagination from '@/components/ui/Pagination/BasicPagination'

const projectStatus = [
  { id: 1, name: 'Project1', value: '111' },
  { id: 2, name: 'Project2', value: '222' },
]
const testTab: any[] = [
  { name: 'Test1', current: true, key: 'TEST1' },
  { name: 'Test2', current: false, key: 'TEST2' },
]
const bookmarkData: TabType[] = [
  { name: 'Test1', current: true, key: 'TEST1' },
  { name: 'Test2', current: false, key: 'TEST2' },
  { name: 'Test3', current: false, key: 'TEST3' },
  { name: 'Test4', current: false, key: 'TEST4' },
  { name: 'Test5', current: false, key: 'TEST5' },
]
const items = [...Array(100).keys()]
const codeBlockString: string = `import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
ReactDOM.render(<App />, document.getElementById('root'));`

const Test = () => {
  const [progress, setProgress] = useState<number>(0)
  const [timerId, setTimerId] = useState<number | null>(null)
  const [toggle, setToggle] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<selectBoxDataProps>(projectStatus[0])
  const [isCheck, setIsCheck] = useState(false)
  const [radio, setRadio] = useState('option1')
  const [email, setEmail] = useState<string>('')
  const [pwd, setPwd] = useState('')
  const [textarea, setTextare] = useState('')
  const [text, setText] = useState('')
  const { tabData, selectTabData, changeTab } = useTab(bookmarkData)
  const { tabData: testData, selectTabData: selectTestData, changeTab: changeTestTab } = useTab(testTab)

  const overlay = useOverlay()

  const [loading, setLoading] = useState(false)
  const [textFile, setTextFile] = useState<File | null>(null)
  const [imgFile, setImgFile] = useState<File | null>(null)
  const [files, setFiles] = useState<File[]>()
  const [openPDF, setOpenPDF] = useState(false)
  const [date, setDate] = useState<Date | null>(new Date())
  const [isFocused, setIsFocused] = useState(false)

  // 한 페이지에 보여줄 항목 개수
  const itemsPerPage: number = 10
  // 현재 페이지
  const [currentPage, setCurrentPage] = useState(1)
  // 현재 페이지에 해당하는 데이터 계산
  const offset: number = (currentPage - 1) * itemsPerPage
  const currentPageData = items.slice(offset, offset + itemsPerPage)

  const startProgress = () => {
    if (timerId === null) {
      const increment = 100 / 10 // 10초 동안 100까지 증가되어야 함
      const id = window.setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + increment
          return newProgress >= 100 ? (clearInterval(id), 100) : newProgress
        })
      }, 1000) // 1초마다 진행
      setTimerId(id)
    }
  }

  const handleFileSet = (selectedFiles: File[]) => {
    setFiles(selectedFiles)
  }

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="h-full w-full p-7">
      <div className="text-md py-5 font-bold">progressBar</div>
      <div className="h-[30px] w-[50%] bg-gray-200">
        <ProgressBar size={progress} barColor="bg-gradient-to-r from-[#01ADCA7F] to-[#01ADCA]" />
      </div>
      <div className="text-md py-5 font-bold">Button</div>
      <TextButton text={'progress bar 시작'} color="none" onClick={startProgress} style="px-4 py-2 bg-gray-200" />
      <TextButton text={'progress bar 초기화'} color="none" onClick={() => setProgress(0)} style="my-2 px-4 py-2 bg-gray-200" />

      <div className="text-md py-3 font-bold">이미지버튼</div>
      <ImageButton icon={<PhotoIcon className="w-16 hover:text-primarySoft" />} onClick={() => alert('클릭')} />
      <ImageTextButton
        text={'Action'}
        icon={<Image src={'/image/common/logo.svg'} alt={'Logo'} height={50} width={100} />}
        pos={'left'}
        onClick={() => {
          console.log('클릭')
        }}
        style={'w-[200px] h-10 text-sm'}
      />

      <div className="text-md py-3 font-bold">토글버튼</div>
      <ToggleButton isOn={toggle} label="검색기반 답변" onClick={() => setToggle((toggle) => !toggle)} />

      <div className="text-md py-5 font-bold">selectBox</div>
      <SelectBox data={projectStatus} selected={selectedStatus} setSelected={setSelectedStatus} />

      <div className="text-md py-5 font-bold">input</div>
      <CheckboxInput checked={isCheck} onChange={() => setIsCheck(!isCheck)} text="체크박스" />
      <RadioInput text="option1" value="option1" checked={radio === 'option1'} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setRadio(event.target.value)} />
      <RadioInput text="option2" value="option2" checked={radio === 'option2'} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setRadio(event.target.value)} />
      <div className="my-5" />
      <Label text={'이메일'} name={'email'} style="font-semibold" onClick={() => console.log(email)} />
      <EmailInput id="email" placeholder="email" value={email} onChange={(val: string) => setEmail(val.trim().replace(/\s/gi, ''))} />
      <Label text={'비밀번호'} name={'pwd'} style="font-semibold mt-5" onClick={() => console.log(pwd)} />
      <PasswordInput id="pwd" value={pwd} placeholder="password" onChange={(val: string) => setPwd(val)} />
      <Label text={'Textarea'} name={'textarea'} style="font-semibold mt-5" onClick={() => console.log(textarea)} />
      <div className="h-[160px] w-full">
        <Textarea name="textarea" value={textarea} setValue={setTextare} placeholder="저에게 무엇이든 물어보세요" />
      </div>
      <Label text={'텍스트'} name={'text'} style="font-semibold mt-5" onClick={() => console.log(text)} />
      <TextInput id="text" placeholder="text" value={text} onChange={(val: string) => setText(val)} />

      <div className="text-md py-5 font-bold">Tooltip</div>
      <Tooltip message="이 버튼을 클릭하세요!">
        <TextButton key={22} text={'버튼'} onClick={() => {}} color={'none'} style={'px-4 py-2 bg-gray-200 hover:bg-gray-300'} />
      </Tooltip>

      <div className="text-md py-5 font-bold">Modal</div>
      <TextButton
        key={389}
        text={'OPEN FOOTER MODAL'}
        onClick={() => overlay.open((overlayElement) => <ExampleFooterModal overlayElement={overlayElement} />)}
        color={'none'}
        style={'px-4 py-2 mt-5 bg-gray-200 hover:bg-gray-300'}
      />
      <TextButton
        key={390}
        text={'OPEN DIALOG MODAL'}
        onClick={() => overlay.open((overlayElement) => <ExampleDialogModal overlayElement={overlayElement} />)}
        color={'none'}
        style={'px-4 py-2 my-4 bg-gray-200 hover:bg-gray-300'}
      />
      <TextButton
        key={391}
        text={'OPEN SEQUENTIAL MODAL'}
        onClick={() => overlay.open((overlayElement) => <ExampleSequentialModal overlayElement={overlayElement} />)}
        color={'none'}
        style={'px-4 py-2 my-4 bg-gray-200 hover:bg-gray-300'}
      />

      <div className="flex max-w-screen-2xl flex-1 flex-col lg:mx-8 lg:my-8">
        <span className="font-semibold">lineTab</span>
        <LineTab tabs={testData} onClick={changeTestTab} muiltiTab={true} />
        <div key={testData[0].key} className="mb-10 flex flex-1 flex-col px-4">
          {selectTestData[0].key === 'TEST1' && (
            <>
              <div>111</div>
            </>
          )}
          {selectTestData[0].key === 'TEST2' && (
            <>
              <div>222</div>
            </>
          )}
        </div>
      </div>

      <div>
        <span className="font-semibold">BookmarkTab</span>
        <BookmarkTab tabs={tabData} onClick={changeTab} />
        {selectTabData[0].key === 'TEST1' && <div>test1</div>}
        {selectTabData[0].key === 'TEST2' && <div>test2</div>}
        {selectTabData[0].key === 'TEST3' && <div>test3</div>}
        {selectTabData[0].key === 'TEST4' && <div>test4</div>}
        {selectTabData[0].key === 'TEST5' && <div>test5</div>}
      </div>

      <div className="text-md py-5 font-bold" onClick={() => console.log('===textFile===', textFile)}>
        FileInput
      </div>
      <FileInput name="file_upload" accept=".docx, application/pdf" multiple={false} style="" setFiles={(files) => setTextFile(files[0])} disabled={loading}>
        <TextButton key={30} text={'파일 업로드'} onClick={() => {}} color={'none'} style={'px-4 py-2 bg-gray-200 hover:bg-gray-300'} />
      </FileInput>
      <div className="flex gap-x-3">
        <div className="font-medium">업로드 된 문서:</div>
        <div>{textFile?.name}</div>
        <TextButton key={40} text={'파일 삭제'} onClick={() => setTextFile(null)} color={'none'} style={'px-4 py-2 bg-gray-200 hover:bg-gray-300'} />
      </div>

      <div className="text-md py-5 font-bold" onClick={() => console.log('===imgFile===', imgFile)}>
        Image File Input
      </div>
      <FileInput name="img_upload" accept="image/*" multiple={false} style="" setFiles={(files) => setImgFile(files[0])} disabled={loading}>
        <div className="cursor-pointer">🖼</div>
      </FileInput>
      {/* 이미지 미리보기 */}
      <div className="font-medium">이미지 미리보기</div>
      {imgFile && (
        <div>
          <Image src={URL.createObjectURL(imgFile)} alt="Preview" style={{ maxWidth: '30%', maxHeight: '200px' }} width={30} height={30} />
        </div>
      )}

      <div className="text-md py-5 font-bold" onClick={() => console.log('===files===', files)}>
        Multiple Image File Input
      </div>
      <FileInput name="img_upload" accept="image/*" multiple={true} style="" setFiles={handleFileSet} maxCnt={2}>
        <div className="cursor-pointer">💜</div>
      </FileInput>
      {/* 이미지 미리보기 */}
      <div className="font-medium">이미지 미리보기</div>
      <div className="flex flex-wrap">
        {files &&
          files.map((file, index) => (
            <div key={index} className="w-1/4 p-2">
              <Image src={URL.createObjectURL(file)} alt={`Preview ${index}`} style={{ maxWidth: '100%', maxHeight: '200px' }} width={30} height={30} />
            </div>
          ))}
      </div>

      <div className="text-md py-5 font-bold">PDF Viewer</div>
      <TextButton
        key={11}
        text={'PDF Viewer'}
        onClick={() => overlay.open((overlayElement) => <ExamplePdfModal overlayElement={overlayElement} />)}
        color={'none'}
        style={'px-4 py-2 mt-5 bg-gray-200 hover:bg-gray-300'}
      />
      <div className="text-md py-5 font-bold">Video Viewer</div>
      <div className="w-[20%]">
        <Video src={'/test/video/example.mp4'} />
      </div>

      <div className="text-md py-5 font-bold">Markdown</div>
      <Markdown source={'### markdown \n 1. 순서가 있는 항목 \n 1. 순서가 있는 항목  \n - 순서가 없는 항목 \n - 순서가 없는 항목'} />

      <div className="text-md py-5 font-bold">CodeBlock</div>
      <CodeBlock language="javascript" value={codeBlockString} />

      <div className={'h-52 w-52 text-black'}>
        <BasicSwiper
          slides={[
            <div key={234} className={'flex h-52 w-52 items-center justify-center bg-amber-100'}>
              111
            </div>,
            <div key={235} className={'flex h-52 w-52 items-center justify-center bg-amber-100'}>
              222
            </div>,
            <div key={236} className={'flex h-52 w-52 items-center justify-center bg-amber-100'}>
              333
            </div>,
            <div key={237} className={'flex h-52 w-52 items-center justify-center bg-amber-100'}>
              444
            </div>,
            <div key={238} className={'flex h-52 w-52 items-center justify-center bg-amber-100'}>
              555
            </div>,
            <div key={239} className={'flex h-52 w-52 items-center justify-center bg-amber-100'}>
              666
            </div>,
            <div key={240} className={'flex h-52 w-52 items-center justify-center bg-amber-100'}>
              77
            </div>,
            <div key={241} className={'flex h-52 w-52 items-center justify-center bg-amber-100'}>
              888
            </div>,
            <div key={242} className={'flex h-52 w-52 items-center justify-center bg-amber-100'}>
              999
            </div>,
          ]}
        />
      </div>

      <div className="py-5">
        <div>datePicker</div>
        <div className={`flex items-center justify-between ${isFocused ? 'border border-gray-800' : 'border-GRAY-1 border'} px-2 py-2`}>
          <CustomDatePicker selectedDate={date} setSelectedDate={setDate} setIsFocused={setIsFocused} />
          {/*<Calendar className="" />*/}
        </div>
      </div>

      <div className="py-5">
        <div className="text-md py-5 font-bold">Pagination</div>
        {currentPageData.map((item, index) => (
          <span key={item.toString()}>{item.toString() + ' '}</span>
        ))}
        <BasicPagination activePage={currentPage} itemsPerPage={itemsPerPage} totalItemsCount={items.length} onPageChange={handlePageClick} />
      </div>
    </div>
  )
}

export default Test
