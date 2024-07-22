import FooterModal from '@/components/ui/Modal/FooterModal'
import { OverlayOpenParams } from '@/lib/hook/useOverlay'

interface Props {
  overlayElement: OverlayOpenParams
}

const ExampleFooterModal = ({ overlayElement }: Props) => {
  const { close, isOpen, onUnmount } = overlayElement

  return (
    <FooterModal close={close} isOpen={isOpen} onUnmount={onUnmount}>
      <p style={{ color: 'black', marginBlock: '0.5rem' }}>THIS IS CHILDREN</p>
      <p style={{ color: 'black', marginBlock: '0.5rem' }}>THIS IS CHILDREN</p>
      <p style={{ color: 'black', marginBlock: '0.5rem' }}>THIS IS CHILDREN</p>
      <p style={{ color: 'black', marginBlock: '0.5rem' }}>THIS IS CHILDREN</p>
      <p style={{ color: 'black', marginBlock: '0.5rem' }}>THIS IS CHILDREN</p>
      <p style={{ color: 'black', marginBlock: '0.5rem' }}>THIS IS CHILDREN</p>
    </FooterModal>
  )
}

export default ExampleFooterModal
