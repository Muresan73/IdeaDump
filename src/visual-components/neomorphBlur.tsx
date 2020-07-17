import styled from 'styled-components';

type LayerProps = { width: string; height: string; background: string };
export const MattLayer = styled.div`
  width: ${(props: LayerProps) => props.width};
  height: ${(props: LayerProps) => props.height};
  background: ${(props: LayerProps) => props.background};
  border-radius: 25px;
  box-shadow: -4px -4px 12px #fff7, 4px 4px 12px #0003;
`;

type GlassProps = { width: string; height: string;};
export const Glass = styled.div`
  width: ${(props: GlassProps) => props.width};
  height: ${(props: GlassProps) => props.height};
  border-radius: 25px;
  backdrop-filter: blur(2px) brightness(.9);
  box-shadow: -2px -1px 1px #fff5, 2px 2px 2px #0005;
`;
