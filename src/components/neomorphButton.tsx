import * as React from 'react';
import styled from 'styled-components';

interface SizeProp {
  size: string;
  color: string;
  ringClickColor?: string;
  ringHoverColor?: string;
  ringcolor?: string;
}

const OuterButton = styled.div`
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
  transition: background 0.3s;

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
  <OuterButton size={props.size} color={props.color}>
    <InnerButton></InnerButton>
    <Ring
      ringcolor={props.ringcolor}
      ringClickColor={props.ringClickColor}
      ringHoverColor={props.ringHoverColor}
    ></Ring>
  </OuterButton>
);
