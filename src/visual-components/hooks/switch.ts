import { useState } from 'react';

export default function useSwitch(initState: boolean = false): [boolean, typeof onEvent] {
  const [switchState, setSwitchState] = useState(initState);
  const onEvent = (_: unknown = null) => (console.log(switchState), setSwitchState(!switchState));

  return [switchState, onEvent];
}
