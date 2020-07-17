import * as React from 'react';
import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';
import styled, { ThemeProvider } from 'styled-components';
import { NeomorphSwitch } from '../src/visual-components/neomorphSwitch';
import { MattLayer } from '../src/visual-components/neomorphBlur';
import { theme } from '../src/visual-components/theme/theme';

addons.setConfig({
  theme: themes.dark
});

export default {
  title: 'NeoSwitch',
  component: NeomorphSwitch
};

const BackPlate = styled.div`
  display: flex;
  width: 300px;
  height: 300px;
  align-items: center;
  justify-content: center;
  background: ${(props: { color: string }) => props.color};
`;

const Layer = styled(MattLayer)`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

export const Switch = () => (
  <ThemeProvider theme={theme}>
    <BackPlate color="#ddd">
      <Layer width="200px" height="200px" background="#ddd">
        <NeomorphSwitch></NeomorphSwitch>
      </Layer>
    </BackPlate>
  </ThemeProvider>
);
