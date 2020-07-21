import * as React from 'react';
import { Glass, MattLayer, Plate,GlowPlate } from '../src/visual-components/neomorphBlur';
import styled from 'styled-components';

import color from '../public/color.webp';
import forest from '../public/forest.jpeg';
import noise from '../public/noise.png';
import { PlateButton } from '../src/visual-components/neomorphButton';

export default {
  title: 'Glass',
  component: Glass
};

const ImgPlate = styled.div`
  display: flex;
  width: 900px;
  height: 900px;
  background-image: url(${color});
  background-color: #cccccc;
  align-items: center;
  flex-flow: column;
  justify-content: space-around;
`;

const Time = styled.p`
  align-self: center;
  justify-self: center;
  font-size: 70px;
  font-family: Arial, Helvetica, sans-serif;
  color: cyan;
  text-shadow: 0 0 5px cyan;
`;

export const Blur = () => (
  <ImgPlate>
    <Glass
      width="300px"
      height="200px"
      style={{ display: 'flex', justifyContent: 'center', backgroundImage: `url(${noise})` }}
    >
      <Time>
        {new Date().getHours()}:{new Date().getMinutes()}
      </Time>
    </Glass>
    <Glass width="300px" height="200px" />
    <Glass width="300px" height="200px" />
  </ImgPlate>
);
const ForestPlate = styled.div`
  display: flex;
  width: 600px;
  height: 900px;
  background-image: url(${forest});
  background-color: #cccccc;
  align-items: center;
  flex-flow: column;
  justify-content: space-around;
`;

export const ForestBlur = () => (
  <ForestPlate>
    <Glass width="300px" height="200px" />
    <Glass width="300px" height="200px" />
  </ForestPlate>
);

const BlackPlate = styled.div`
  display: flex;
  width: 600px;
  height: 900px;
  background-color: #cccccc;
  align-items: center;
  flex-flow: column;
  justify-content: space-around;
`;

const Dot = styled(Plate)`
  border-radius: 50%;
  margin: 10px;
  position: absolute;
`;

export const Forms = () => (
  <BlackPlate>
    <MattLayer
      width="400px"
      height="700px"
      background="#ccc"
      style={{ display: 'flex', flexFlow: 'column', justifyContent: 'space-around', alignItems: 'center' }}
    >
      <MattLayer width="200px" height="300px" background="blanchedalmond">
        <Plate width="50px" height="50px" background="tomato" style={{ margin: '20px' }} />
        <Plate width="50px" height="50px" background="tomato" style={{ margin: '20px' }}>
          <Dot width="25px" height="25px" background="blue" />
        </Plate>
        <Plate width="50px" height="50px" background="tomato" style={{ margin: '20px' }} />
        <PlateButton width="50px" height="50px" background="tomato" style={{ margin: '0 20px' }} />
      </MattLayer>
      <MattLayer width="200px" height="300px" background="aliceblue">
        <GlowPlate width="50px" height="50px" background="deeppink" style={{ margin: '20px' }} />
        <GlowPlate width="50px" height="50px" background="chartreuse" style={{ margin: '20px' }} />
        <GlowPlate width="50px" height="50px" background="crimson" style={{ margin: '20px' }} />
        <GlowPlate width="50px" height="50px" background="gold" style={{ margin: '0 20px' }} />
      </MattLayer>
      <Glass
        width="300px"
        height="200px"
        style={{ position: 'absolute', top: '20px', boxShadow: '-2px -2px 2px #ffff, 4px 4px 12px #0003' }}
      />
    </MattLayer>
  </BlackPlate>
);
