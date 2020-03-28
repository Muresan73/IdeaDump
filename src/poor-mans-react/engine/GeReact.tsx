import { Observable, BehaviorSubject, isObservable, Subject } from 'rxjs';
import { first, map, startWith, pairwise, filter, tap } from 'rxjs/operators';
import { asyncType } from './type';

export const React = {
  createElement: (tag, props, ...children) => {
    if (typeof tag === 'function') return tag(props);
    return { tag, props: { ...props, children } };
  }
};

const mapProps2Element = (props, targetDOMelement) => {
  if (props) {
    Object.keys(props)
      .filter(el => !['children', 'style', 'asyncProps'].includes(el))
      .forEach(key => (targetDOMelement[key.toLowerCase()] = props[key]));
  }
  if (props.style) {
    Object.entries(props.style).forEach(([key, value]) => (targetDOMelement.style[key] = value));
  }
  if (props.children) {
    props.children.forEach(child => render(child, targetDOMelement));
  }
  if (props.asyncProps) {
    Object.entries(props.asyncProps as asyncType<unknown>).forEach(([key, asyncProps]) =>
      asyncProps.subscribe(attributes => mapProps2Element({ [key]: attributes }, targetDOMelement))
    );
  }
};

export const render = (reactElement, container?: Node) => {
  if (['string', 'number'].includes(typeof reactElement)) {
    const newTextElement = document.createTextNode(reactElement);
    container && container.appendChild(newTextElement);
    return newTextElement;
  }

  if (isObservable(reactElement)) {
    const renderedElement = new Subject<Element>();
    renderedElement
      .pipe(
        startWith(null),
        pairwise(),
        filter(([prev, current]) => !(prev && current?.outerHTML && current.outerHTML === prev.outerHTML)),
        map(([_, current]) => current),
        startWith(null),
        pairwise()
      )
      .subscribe(([prev, current]) => {
        if (current && prev) {
          prev.replaceWith(current);
        } else {
          if (prev) prev.remove();
          if (current) container.appendChild(current);
        }
      });
    reactElement.subscribe(element => {
      renderedElement.next(render(element));
    });
    return;
  }

  if (!reactElement) return;

  const newDOMelement = document.createElement(reactElement.tag);
  mapProps2Element(reactElement.props, newDOMelement);
  container && container.appendChild(newDOMelement);
  return newDOMelement;
};

export function useRxState<State>(
  initialState: State
): [Observable<State>, (callbackFn: (state: State) => State) => void] {
  const distributor = new BehaviorSubject<State>(initialState);
  const updater = (callbackFn: (state: State) => State) =>
    distributor.pipe(first()).subscribe(state => distributor.next(callbackFn(state)));
  return [distributor, updater];
}
