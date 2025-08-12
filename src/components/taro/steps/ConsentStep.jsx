import {
  Wrapper,
  Overlay,
  TaruMascot,
  BubbleBox,
  BubbleHeader,
  ButtonPrev,
  ButtonNext,
} from '../styles/ConsentStep.style.js'
import taruSvg from '../../../assets/icons/taru.svg'
import arrowSvg from '../../../assets/icons/arrow.svg'

function ConsentStep({ next, prev }) {
  return (
    <Wrapper>
      <Overlay />
      <TaruMascot src={taruSvg} alt="타루" aria-label="타루" role="img" />

      <BubbleBox>
        <BubbleHeader>
          <span className="name">타루</span>
          <span className="role">타로마스터</span>
        </BubbleHeader>
        <div style={{ fontSize: 14, lineHeight: 1.8 }}>
          안녕! 난 타로마스터 ‘타루’라고 해
          <br />본격적인 상담에 앞서 네가 어떤 고민을 가지고 있는지 들어보고
          <br />너의 상황에 맞는 추천을 해줄게
          <br />너에게 더 적합한 답변을 선택해줘
        </div>
      </BubbleBox>

      <ButtonNext type="button" aria-label="다음 단계" onClick={next}>
        <img src={arrowSvg} alt="다음" style={{ width: '24px', height: '24px' }} />
      </ButtonNext>
    </Wrapper>
  )
}

export default ConsentStep


