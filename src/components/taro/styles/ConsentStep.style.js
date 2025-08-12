import styled from 'styled-components'
import bgImage from '../../../assets/images/bg_1.jpg'

export const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center top;
  overflow: hidden;
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.25) 0%,
    rgba(0, 0, 0, 0.55) 50%,
    rgba(0, 0, 0, 0.85) 100%
  );
`;

export const TaruMascot = styled.img`
  position: absolute;
  right: 8px;
  bottom: 120px;
  width: 228px;
  height: 254px;
  aspect-ratio: 114 / 127;
  flex-shrink: 0;
  object-fit: contain;
  filter: drop-shadow(0 10px 24px rgba(0, 0, 0, 0.45));
  user-select: none;
  pointer-events: none;
  z-index: 12;
`;

export const BubbleBox = styled.div`
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 88px;
  background: rgba(0, 0, 0, 0.65);
  color: #FFF;
  border-radius: 16px;
  padding: 16px;
  backdrop-filter: blur(2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
  z-index: 10;
`;

export const BubbleHeader = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #FFF;
  color: #222;
  border-radius: 12px;
  padding: 8px 12px;
  margin-bottom: 12px;

  .name { font-weight: 700; color: #222; }
  .role { color: #6B7280; }
`;

export const ButtonPrev = styled.button`
  position: absolute;
  left: 24px;
  bottom: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: transparent;
  color: #FFF;
  border: 1px solid rgba(255, 255, 255, 0.7);
  font-size: 22px;
  line-height: 48px;
  text-align: center;
  backdrop-filter: blur(2px);
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.9);
  }

  &::before {
    content: '‹';
    font-size: 24px;
    font-weight: bold;
  }
`;

export const ButtonNext = styled.button`
  position: absolute;
  right: 24px;
  bottom: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #271932;
  color: #FFF;
  border: none;
  font-size: 24px;
  line-height: 56px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #3a1f4a;
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  }
`;


