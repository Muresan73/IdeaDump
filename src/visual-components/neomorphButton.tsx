import * as React from 'react';
import styled from 'styled-components';
import useSwitch from './hooks/switch';

interface SizeProp {
  size: string;
  color: string;
  ringClickColor?: string;
  ringHoverColor?: string;
  ringcolor?: string;
  onClick?: (_?: unknown) => void;
}

const OuterPart = styled.div`
  width: ${(props: SizeProp) => props.size};
  height: ${(props: SizeProp) => props.size};
  background: ${(props: SizeProp) => props.color};
  border-radius: 25%;
  box-shadow: -4px -4px 12px #fffa, 4px 4px 12px #0003;
  position: relative;
`;

const InnerButton = styled.button`
  background: inherit;
  width: 50%;
  height: 50%;
  position: absolute;
  top: 25%;
  right: 25%;
  border-radius: 50%;
  box-shadow: 1px 1px 10px #0003;
  outline: none;
  &:active {
    box-shadow: inset 0px 0px 3px #0002;
  }
  border: 0;
  z-index: 1;
`;

const Ring = styled.div`
  transition: background 0.3s ease-out;

  box-sizing: border-box;
  width: 70%;
  height: 70%;
  position: absolute;
  top: 15%;
  right: 15%;
  border-radius: 50%;
  box-shadow: inset 1px 1px 10px #0003;
  ${InnerButton}:active + & {
    background: ${(props: any) => props.ringClickColor};
  }
  ${InnerButton}:hover + & {
    background: ${(props: SizeProp) => props.ringHoverColor};
  }
  background: ${(props: SizeProp) => props.ringcolor};

  z-index: 0;
`;

export const NeomorphButton = (props: SizeProp) => (
  <OuterPart size={props.size} color={props.color}>
    <InnerButton onClick={props.onClick}></InnerButton>
    <Ring
      ringcolor={props.ringcolor}
      ringClickColor={props.ringClickColor}
      ringHoverColor={props.ringHoverColor}
    ></Ring>
  </OuterPart>
);

export const NeomorphToggle = (props: unknown) => {
  const [switchState, setToggleState] = useSwitch(false);
  console.log(switchState);
  return (
    <NeomorphButton
      size="100px"
      color="#eee"
      ringcolor={switchState ? 'tomato' : 'greenyellow'}
      ringClickColor="inherit"
      onClick={setToggleState}
    ></NeomorphButton>
  );
};

type RoundProps = { size: string };
export const RoundButton = styled.button`
  outline: none;
  background: ${props => props.theme.colors.main};
  width: ${(props: RoundProps) => props.size};
  height: ${(props: RoundProps) => props.size};
  border-radius: 50%;
  box-shadow: -1px -1px 3px 1px #fffa, 1px 1px 7px #000a, inset 20px 20px 30px -30px #0009;
  border: 2px solid rgba(0, 0, 0, 0.1);
  &:active {
    box-shadow: -1px -1px 3px 1px #fffa, 1px 1px 7px #000a, inset 10px 10px 30px -10px #0009;
    svg {
      transform: scale(0.97);
    }
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

// export const NeomorphRoundButton = (props: unknown) => {
