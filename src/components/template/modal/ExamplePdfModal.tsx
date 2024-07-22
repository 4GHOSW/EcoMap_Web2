import DialogModal from '@/components/ui/Modal/DialogModal'
import Pdf from '@/components/ui/Viewer/Pdf'
import { OverlayOpenParams } from '@/lib/hook/useOverlay'

interface Props {
  overlayElement: OverlayOpenParams
}

const ExamplePdfModal = ({ overlayElement }: Props) => {
  const { close, isOpen, onUnmount } = overlayElement

  const onClickDone = () => {
    window.alert('확인 눌림')
    close()
  }

  return (
    <DialogModal
      size="l"
      header={<div>경조사QA</div>}
      body={
        <div className={'border-RED_MAIN max-h-[80vh] w-full overflow-y-auto border px-0 py-2'}>
          <Pdf pdfUrl={`/test/pdf/경조사QA.pdf`} reqPage={1} />
        </div>
      }
      footer={
        <div className="flex flex-row items-center justify-around">
          <button onClick={close} className="rounded px-2 py-1 hover:bg-[#00000010]">
            취소
          </button>
          <button onClick={onClickDone} className="rounded px-2 py-1 hover:bg-[#00000010]">
            확인
          </button>
        </div>
      }
      closeIcon={true}
      close={close}
      isOpen={isOpen}
      onUnmount={onUnmount}
    />
  )
}

export default ExamplePdfModal
