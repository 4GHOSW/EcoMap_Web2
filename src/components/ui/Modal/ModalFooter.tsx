import TextButton from '../Button/TextButton'

interface Props {
  leftText?: string
  leftFnc?: () => void
  rightText?: string
  rightFnc?: () => void
}

const ModalFooter = ({ leftText = '취소', leftFnc, rightText = '확인', rightFnc }: Props) => {
  return (
    <div className="flex flex-row items-center justify-around">
      {leftFnc && <TextButton text={leftText} onClick={() => leftFnc} color="none" />}
      {rightFnc && <TextButton text={rightText} onClick={() => rightFnc} color="none" />}
    </div>
  )
}

export default ModalFooter
