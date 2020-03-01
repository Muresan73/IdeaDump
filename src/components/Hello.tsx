import * as React from 'react';
import useSwitch from './hooks/switch';
export interface HelloProps {
  compiler: string;
  framework: string;
}

export const Hello = (props: Partial<HelloProps>) => {
  const [switchState, setSwitchState] = useSwitch(false);

  return (
    <div>
      <button onClick={setSwitchState}> alma</button>
      Hello {switchState.toString()}!
    </div>
  );
};
