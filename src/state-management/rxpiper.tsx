import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Subject, Observable, merge, zip } from 'rxjs';
import { tap, map, delay, filter, groupBy, mergeMap } from 'rxjs/operators';

type Action = 'click1' | 'click2';
type Sausage<State> = Observable<[Action, State]>;
type Pipe<State> = (emitter: Sausage<State>) => Sausage<Partial<State>>;


function usePiper<State>(initialState: State, pipeLine: Pipe<State>[]): [State, (action: Action) => void] {
  const [currentState, setState] = useState(initialState);

  const subject = useRef(new Subject<[Action, State]>());
  const latestStateSubject = useRef(new Subject<State>());

  useEffect(() => {
    latestStateSubject.current.subscribe(console.log);
    const sub = zip(
      plumbing<State>(pipeLine)(subject.current),
      latestStateSubject.current
    ).subscribe(([[_, newState], currentState]) => setState(state => Object.assign({}, state, newState)));
    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    console.log('next');
    latestStateSubject.current.next(currentState);
  }, [currentState]);

  return [currentState, action => subject.current.next([action, currentState])];
}

// --------------   Component   --------------
stateObservalbe
actionObservable
combineLatest(stateObservalbe, actionObservable);

const initalState = { c1: true, c2: false };
const clickPipes: Pipe<typeof initalState> = 
  emitter => {
    const actionGroup = emitter.pipe(
      groupBy(([action, _]) => action),
      mergeMap(group=>{
        switch (group.key) {
          case 'click1':
            
            return [action, { c1: !state.c1 }];
        
          default:
            break;
        } 
      })
    )
    actionGroup.key
      tap(x=>x),
      filter(([action, _]) => action === 'click1'),
      delay(1000),
      tap(x => console.log('1:', x)),
      map(([action, state]) => [action, { c1: !state.c1 }])
    );
  }
;

export const Rxpiper = () => {
  const [state, dispatch] = usePiper(initalState, clickPipes);
  return (
    <div>
      <button onClick={() => dispatch('click1')}>Click ME 1 ({state.c1.toString()})</button>
      <button onClick={() => dispatch('click2')}>Click ME 2 ({state.c2.toString()})</button>
    </div>
  );
};
