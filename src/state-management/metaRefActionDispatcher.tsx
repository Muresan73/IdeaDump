import * as React from 'react';
import { useState } from 'react';

type Action<State> = (state?: State) => Promise<Partial<State>>;
type Actions<State> = Record<string, Action<State>>;

function useRefDispath<State, ActionList extends Actions<State>>(
  initialState: State,
  actions: ActionList
): [State, ActionList] {
  const [currentState, setState] = useState(initialState);

  const actionHandler = {
    apply: function(target: Action<State>, _this, _args) {
      target(currentState).then(
        newState => (console.log(newState), setState(state => Object.assign({}, state, newState)))
      );
    }
  };

  const handler = {
    get: function(target: ActionList, name: keyof typeof target) {
      return new Proxy(target[name], actionHandler);
    }
  };

  const p = new Proxy(actions, handler);

  return [currentState, p];
}

// --------------   Component   --------------

const initalState = { c1: 1, c2: 1 };
const actions: Actions<typeof initalState> ={
  click1: async state => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('click1');
    return { c1: state.c1 + 1 };
  },
  click2: async state => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('click2');
    return { c2: state.c2 + 1 };
  }
};

export const ReferencedDispached = () => {
  const [state, dispatch] = useRefDispath(initalState, actions);
  return (
    <div>
      <button onClick={()=>dispatch.click1()}>Click ME 1 ({state.c1.toString()})</button>
      <button onClick={()=>dispatch.click2()}>Click ME 2 ({state.c2.toString()})</button>
    </div>
  );
};
