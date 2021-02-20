import styled from 'styled-components';

type LayerProps = { width: string; height: string; background: string };
export const MattLayer = styled.div`
  width: ${(props: LayerProps) => props.width};
  height: ${(props: LayerProps) => props.height};
  background: ${(props: LayerProps) => props.background};
  border-radius: 25px;
  box-shadow: -4px -4px 12px #fff7, 4px 4px 12px #0003, 0 0 1px 1px ${(props: LayerProps) => props.background};
`;

type GlassProps = { width: string; height: string };
export const Glass = styled.div`
  width: ${(props: GlassProps) => props.width};
  height: ${(props: GlassProps) => props.height};
  border-radius: 25px;
  backdrop-filter: blur(2px) brightness(0.9);
  box-shadow: -2px -1px 1px #fff5, 2px 2px 2px #0005;
`;

export const Plate = styled.div`
  width: ${(props: LayerProps) => props.width};
  height: ${(props: LayerProps) => props.height};
  background: ${(props: LayerProps) => props.background};
  border-radius: 25%;
  box-shadow: 0 0 1px 1px #fff5, 2px 2px 2px 1px #0005, 1px 1px 0px 1px ${(props: LayerProps) => props.background};
`;

export const GlowPlate = styled(Plate)`
  box-shadow: 1px 1px 10px ${(props: LayerProps) => props.background}, 0 0 1px 1px #fff5, 2px 2px 2px 1px #0005,
    1px 1px 0px 1px ${(props: LayerProps) => props.background};
`;

export const GlassElement = styled(Plate)`

  display:flex;
  align-items:center;
  justify-content:center;
  border-radius: 5px;
  box-shadow:   
    inset -1px 1px 3px -1px #fff9,
    -1px 2px 0px #0002,
    -1px 2px 1px -1px #fff5,
    -1px 2px 0px ${(props: LayerProps) => props.background},
    -4px 4px 4px 1px #0003,
    /* -1px 2px 3px -1px #fff, */
    -2px 3px 1px -1px #0005,
    inset -1px 2px 0px 0px ${(props: LayerProps) => props.background},
    inset -1px 2px 1px 0px #0002 ;
`;

export const GlassText = styled.div`
  text-shadow: -2px 2px 2px #0009;
  font-family:arial;
  font-weight: bold;
  background-image: linear-gradient(45deg, #000, #999);
  
  /* Set the background size and repeat properties. */
  background-size: 100%;
  background-repeat: repeat;

  /* Use the text as a mask for the background. */
  /* This will show the gradient as a text color rather than element bg. */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; 
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
`

// box-shadow: -1px 1px 10px ${(props: LayerProps) => props.background}, 0 0 -1px 1px #fff5, 2px 2px 2px 1px #0005,
//   -1px 1px 0px 1px ${(props: LayerProps) => props.background};