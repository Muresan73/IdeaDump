import * as React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Subject, Observable, merge } from 'rxjs';
import { tap, map, delay, filter } from 'rxjs/operators';

type Action = 'click1' | 'click2';
type Sausage<State> = Observable<[Action, State]>;
type Pipe<State> = (emitter: Sausage<State>) => Sausage<State>;

// type Function1<T>=(arg: T) => T;
// function pipeOperator<T>(...fns: (Function1<T>)[]): Function1<T> {
//   return fns.reduceRight((f, g) => (args: T) => f(g(args)));
// }

const plumbing = <State,>(pipes: Pipe<State>[]): Pipe<State> => (seed: Sausage<State>) =>
  merge(...pipes.map(pipe => pipe(seed)));

function usePiper<State>(initialState: State, pipeLine: Pipe<State>[]): [State, (action: Action) => void] {
  const [state, setState] = useState(initialState);
  const subject = useRef(new Subject<[Action, State]>());

  useEffect(() => {
    const sub = plumbing<State>(pipeLine)(subject.current).subscribe(([_, state]) => setState(state));
    return () => { sub.unsubscribe(); };
  }, []);

  return [state, action => subject.current.next([action, state])];
}

// --------------   Component   --------------

const initalState = { c1: true, c2: false };
const clickPipes: Pipe<typeof initalState>[] = [
  emitter => {
    return emitter.pipe(
      filter(([action, _]) => action === 'click1'),
      tap(x => console.log('1:', x)),
      delay(1000),
      map(([action, state]) => [action, { ...state, c1: !state.c1 }])
    );
  },
  emitter => {
    return emitter.pipe(
      filter(x => x[0] === 'click2'),
      tap(x => console.log('2:', x)),
      delay(1000),
      map(([action, state]) => [action, { ...state, c2: !state.c2 }])
    );
  }
];

export const PipePiperDemo = () => {
  const [state, dispatch] = usePiper(initalState, clickPipes);
  return (
    <div>
      <button onClick={() => dispatch('click1')}>Click ME 1 ({state.c1.toString()})</button>
      <button onClick={() => dispatch('click2')}>Click ME 2 ({state.c2.toString()})</button>
    </div>
  );
};
