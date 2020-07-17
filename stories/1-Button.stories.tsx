import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import { Glass, MattLayer } from '../src/visual-components/neomorphBlur';
import styled from 'styled-components';

import color from './color.webp';
import forest from './forest.jpeg';
import noise from './noise.png';

export default {
  title: 'Button',
  component: Button
};

export const Text = () => <Button onClick={action('clicked')}>Hello Button</Button>;

export const Emoji = () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);