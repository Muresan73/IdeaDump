import { React, useRxState, render } from './engine/GeReact';
import { map, tap } from 'rxjs/operators';
import './index.scss';

const App = () => {
  const [state, updateState] = useRxState(0);
  const [color, updateColor] = useRxState('green');
  return (
    <div>
      <h1>Na szevasz</h1>
      <div>Valami josag</div>
      <div>
        {state}
        <button onClick={() => updateState(state => state + 1)}>+1</button>
      </div>
      {state.pipe(
        tap(state => state > 3 && updateColor(_ => 'tomato')),
        map(
          state =>
            state > 5 &&
            state < 10 && (
              <div>
                Its bigger than 5 man!
                <div>
                  <img src="https://media.giphy.com/media/yJFeycRK2DB4c/giphy.gif" />
                </div>
              </div>
            )
        )
      )}
      <div className="input">
        <input
          onChange={_ => updateColor(_ => 'yellowgreen')}
          asyncProps={{ style: color.pipe(map(color => ({ background: color }))) }}
        />
        <input onChange={_ => updateColor(_ => 'yellowgreen')} style={{ background: 'red' }} />
      </div>
    </div>
  );
};

render(<App />, document.querySelector('#root'));
