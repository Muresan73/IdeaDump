import * as React from 'react';
import useSwitch from './hooks/switch';
import styled, { DefaultTheme, ThemeProps } from 'styled-components';
import Clear from '../../public/clear.svg';
import Done from '../../public/done.svg';

const Track = styled.div`
  border-radius: 15px;
  width: 60px;
  height: 30px;
  background: ${(props: ThemeProps<DefaultTheme> & ThumbProps) =>
    props.isActive ? props.theme.colors.main : props.theme.colors.backplate};
  box-shadow: inset 0px 0px 3px #0009
    ${(props: ThemeProps<DefaultTheme> & ThumbProps) =>
      props.isActive ? ', 0px 0px 6px ' + props.theme.colors.main : ''};
  transition: background 0.2s linear;
`;

type ThumbProps = { isActive: boolean };
const Thumb = styled.div`
  width: 24px;
  height: 24px;
  margin: 3px;
  background: ${props => props.theme.colors.backplate};
  border-radius: 12px;
  transform: translateX(${(props: ThumbProps) => (props.isActive ? 30 : 0)}px);
  transition: transform 0.2s ease-in-out;
  box-shadow: 1px 1px 2px 1px #0005;
`;

const ClearIcon = styled(Clear)`
  stroke: ${props => props.theme.colors.main};
`;
const DoneIcon = styled(Done)`
  stroke: ${props => props.theme.colors.main};
`;

export const NeomorphSwitch = (props: unknown) => {
  const [switchState, setSwitchState] = useSwitch(false);
  return (
    <Track onClick={() => setSwitchState(!switchState)} isActive={switchState}>
      <Thumb isActive={switchState}>{switchState ? <DoneIcon /> : <ClearIcon />}</Thumb>
    </Track>
  );
};
