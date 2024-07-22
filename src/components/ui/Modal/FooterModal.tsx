import { useModal } from '@/lib/hook/useModal'
import { type OverlayOpenParams } from '@/lib/hook/useOverlay'
import { classNames } from '@/util/cssUtils'

interface Props extends OverlayOpenParams {
  children: React.ReactNode
}

const FooterModal = ({ close, isOpen, onUnmount, children }: Props) => {
  const { shouldRender, offShouldRender, stopPropagation } = useModal(isOpen, onUnmount)

  if (!shouldRender) {
    return null
  }

  return (
    <div
      onClick={close}
      onAnimationEnd={isOpen ? undefined : offShouldRender}
      className={classNames(`fixed bottom-0 top-0 z-modal w-full bg-secondary-base/20`, isOpen ? 'animate-modal-bg-in' : 'animate-modal-bg-out')}
    >
      <div
        onClick={stopPropagation}
        className={classNames(
          `fixed bottom-0 z-modal flex w-full flex-col items-center rounded-t-modal bg-white`,
          isOpen ? 'animate-footer-modal-bottom-up' : 'animate-footer-modal-bottom-down',
        )}
      >
        <div className="my-4 h-2 w-1/4 max-w-24 rounded-lg bg-tertiary-surface10" />
        <div className="flex w-full flex-1 flex-col">{children}</div>
      </div>
    </div>
  )
}

export default FooterModal
