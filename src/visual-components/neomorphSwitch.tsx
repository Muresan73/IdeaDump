import * as React from 'react';
import { NeomorphButton } from './neomorphButton';
import useSwitch from './hooks/switch';

export const NeomorphSwitch = (props: unknown) => {
  const [switchState, setSwitchState] = useSwitch(false);
  console.log(switchState);
  return (
    <NeomorphButton
      size="100px"
      color="#eee"
      ringcolor={switchState ? 'tomato' : 'greenyellow'}
      ringClickColor="inherit"
      onClick={setSwitchState}
    ></NeomorphButton>
  );
};
