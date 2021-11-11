import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ReferencedDispached } from './state-management/metaRefActionDispatcher';
import { PipePiperDemo } from './state-management/pipePiperDemo';

const Selector = () => {
    const [state, dispatch] = React.useState<'meta'|'piper'>('piper');
    return (
      <div>
        <select value={state} onChange={e=>dispatch(e.target.value as any)}>
          <option value="meta">ReferencedDispached</option>
          <option value="piper">PipePiperDemo</option>
        </select>
        {state === "meta" && <ReferencedDispached />}
        {state === "piper" && <PipePiperDemo />}
      </div>
    );
  };

ReactDOM.render(<Selector/>, document.getElementById('root'));
