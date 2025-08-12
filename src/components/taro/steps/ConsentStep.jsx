import bgImage from '../../../assets/images/bg_1.jpg'
import taruSvg from '../../../assets/icons/taru.svg'

function ConsentStep({ next, prev }) {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        overflow: 'hidden',
      }}
    >
      {/* 어둡게 오버레이 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.85) 100%)',
        }}
      />

      {/* 타루 캐릭터 일러스트 */}
      <img
        src={taruSvg}
        alt="타루"
        style={{
          position: 'absolute',
          right: 8,
          bottom: 120,
          width: 190,
          maxWidth: '48%',
          filter: 'drop-shadow(0 10px 24px rgba(0,0,0,0.45))',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />

      {/* 하단 말풍선 카드 */}
      <div
        style={{
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: 88,
          background: 'rgba(0,0,0,0.65)',
          color: '#FFF',
          borderRadius: 16,
          padding: 16,
          backdropFilter: 'blur(2px)',
          boxShadow: '0 6px 20px rgba(0,0,0,0.35)',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: '#FFF',
            color: '#222',
            borderRadius: 12,
            padding: '8px 12px',
            marginBottom: 12,
          }}
        >
          <span style={{ fontWeight: 700, color: '#222' }}>타루</span>
          <span style={{ color: '#6B7280' }}>타로마스터</span>
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.8 }}>
          안녕! 난 타로마스터 ‘타루’라고 해
          <br />본격적인 상담에 앞서 네가 어떤 고민을 가지고 있는지 들어보고
          <br />너의 상황에 맞는 추천을 해줄게
          <br />너에게 더 적합한 답변을 선택해줘
        </div>
      </div>

      {/* 하단 네비게이션 버튼 */}
      <button
        type="button"
        aria-label="이전 단계"
        onClick={prev}
        style={{
          position: 'absolute',
          left: 24,
          bottom: 24,
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: 'transparent',
          color: '#FFF',
          border: '1px solid rgba(255,255,255,0.7)',
          fontSize: 22,
          lineHeight: '48px',
          textAlign: 'center',
          backdropFilter: 'blur(2px)',
        }}
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="다음 단계"
        onClick={next}
        style={{
          position: 'absolute',
          right: 24,
          bottom: 24,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: '#271932',
          color: '#FFF',
          border: 'none',
          fontSize: 24,
          lineHeight: '56px',
          textAlign: 'center',
          boxShadow: '0 8px 20px rgba(0,0,0,0.35)',
        }}
      >
        ›
      </button>
    </div>
  )
}

export default ConsentStep


