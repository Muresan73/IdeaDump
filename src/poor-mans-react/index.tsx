const React = {
  createElement: (tag, props, ...children) => {
    if (typeof tag === 'function') return tag(props);
    console.log({ tag, props: { ...props, children } });
    return { tag, props: { ...props, children } };
  }
};
const useState = initialState => {};

const render = (reactElement, container: Node) => {
  if (['string', 'number'].includes(typeof reactElement)) {
    container.appendChild(document.createTextNode(reactElement));
    return;
  }

  const newDOMelement = document.createElement(reactElement.tag);
  if (reactElement.props) {
    Object.keys(reactElement.props)
      .filter(el => el !== 'children')
      .forEach(key => (newDOMelement[key.toLowerCase()] = reactElement.props[key]));
  }
  if (reactElement.props.children) {
    reactElement.props.children.forEach(child => render(child, newDOMelement));
  }
  container.appendChild(newDOMelement);
};

const App = () => (
  <div>
    <h1>Na szevasz</h1>
    <div>Valami josag</div>
    <div className="input">
      <input onChange={e => console.log('buzika')} />
    </div>
  </div>
);

render(<App />, document.querySelector('#root'));
