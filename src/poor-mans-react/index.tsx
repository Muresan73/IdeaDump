import { Observable, BehaviorSubject, isObservable, Subject } from 'rxjs';
import { first, map, startWith, pairwise } from 'rxjs/operators';
import './index.scss';

const React = {
  createElement: (tag, props, ...children) => {
    if (typeof tag === 'function') return tag(props);
    return { tag, props: { ...props, children } };
  }
};

const render = (reactElement, container?: Node) => {
  if (['string', 'number'].includes(typeof reactElement)) {
    const newTextElement = document.createTextNode(reactElement);
    container && container.appendChild(newTextElement);
    return newTextElement;
  }

  if (isObservable(reactElement)) {
    const subject = new Subject<Element>();
    subject.pipe(startWith(null), pairwise()).subscribe(([prev, current]) => {
      if (current && prev) {
        prev.replaceWith(current);
      } else {
        if (prev) prev.remove();
        if (current) container.appendChild(current);
      }
    });
    reactElement.subscribe(element => {
      subject.next(render(element));
    });
    return;
  }

  if (!reactElement) return;

  const newDOMelement = document.createElement(reactElement.tag);
  if (reactElement.props) {
    Object.keys(reactElement.props)
      .filter(el => el !== 'children')
      .forEach(key => (newDOMelement[key.toLowerCase()] = reactElement.props[key]));
  }
  if (reactElement.props.children) {
    reactElement.props.children.forEach(child => render(child, newDOMelement));
  }
  container && container.appendChild(newDOMelement);
  return newDOMelement;
};

function useRxState<State>(initialState: State): [Observable<State>, (callbackFn: (state: State) => State) => void] {
  const distributor = new BehaviorSubject<State>(initialState);
  const updater = (callbackFn: (state: State) => State) =>
    distributor.pipe(first()).subscribe(state => distributor.next(callbackFn(state)));
  return [distributor, updater];
}

const App = () => {
  const [state, updateState] = useRxState(0);
  return (
    <div>
      <h1>Na szevasz</h1>
      <div>Valami josag</div>
      <div>
        {state}
        <button onClick={() => updateState(state => state + 1)}>+1</button>
      </div>
      {state.pipe(
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
        <input onChange={e => console.log('buzika')} />
      </div>
    </div>
  );
};

render(<App />, document.querySelector('#root'));
