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
  top: 53%;
  left: 80%;
  transform: translateX(-50%);
  width: 180px;
  height: auto;
  aspect-ratio: 114 / 127;
  flex-shrink: 0;
  object-fit: contain;
  filter: drop-shadow(0 10px 24px rgba(0, 0, 0, 0.45));
  user-select: none;
  pointer-events: none;
  z-index: 999;
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
  position: absolute;
  top: 560px;
  left: 50%;
  transform: translateX(-50%);
  width: 344px;
  height: 55px;
  flex-shrink: 0;
  border-radius: 10px;
  background: var(--color-neutral-whitegray, #F0F0F0);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  padding-left: 17px;
  gap: 17px;
  z-index: 15;

  .name {
    color: var(--color-primary-purple, #271932);
    text-align: center;
    font-family: MaruBuriOTF;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 17px;
    letter-spacing: -0.5px;
    
  }

  .role {
    color: var(--color-neutral-black, #2A2A2A);
    text-align: center;
    font-family: MaruBuriOTF;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: -0.5px;
  }
`;

export const BubbleContent = styled.div`
  position: absolute;

  bottom: 0px;
  width: 375px;
  height: 205px;
  flex-shrink: 0;
  background: rgba(138, 138, 138, 0.40);
  color: #FFFFFF;
  border-radius: 10px;
  padding: 20px;
  backdrop-filter: blur(2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 16px;
  .text {
    font-family: MaruBuriOTF;
    font-size: 14px;
    line-height: 1.8;
    color: #FFFFFF;
  }

  .next-indicator {
    align-self: flex-end;
    font-size: 18px;
    font-weight: bold;
    color: #FFFFFF;
    cursor: pointer;
    user-select: none;
  }
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


