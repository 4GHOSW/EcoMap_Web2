import DialogModal from '@/components/ui/Modal/DialogModal'
import { OverlayOpenParams } from '@/lib/hook/useOverlay'

interface Props {
  overlayElement: OverlayOpenParams
}

const ExampleDialogModal = ({ overlayElement }: Props) => {
  const { close, isOpen, onUnmount } = overlayElement

  const onClickDone = () => {
    window.alert('확인 눌림')
    close()
  }

  return (
    <DialogModal
      size="m"
      header={<div>Dialog Modal Title</div>}
      body={
        <>
          <p style={{ color: 'black', marginBlock: '0.5rem' }}>THIS IS CHILDREN</p>
          <p style={{ color: 'black', marginBlock: '0.5rem' }}>THIS IS CHILDREN</p>
          <p style={{ color: 'black', marginBlock: '0.5rem' }}>THIS IS CHILDREN</p>
          <p style={{ color: 'black', marginBlock: '0.5rem' }}>THIS IS CHILDREN</p>
          <p style={{ color: 'black', marginBlock: '0.5rem' }}>THIS IS CHILDREN</p>
          <p style={{ color: 'black', marginBlock: '0.5rem' }}>THIS IS CHILDREN</p>
        </>
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
      closeIcon={false}
      close={close}
      isOpen={isOpen}
      onUnmount={onUnmount}
    />
  )
}

export default ExampleDialogModal
