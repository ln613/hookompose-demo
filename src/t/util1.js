import { useState, useEffect } from 'react';

export const tap = x => { console.log(x); return x; }

export const compose = (...enhancers) =>
  Comp => props =>
    Comp(enhancers.reduce(
      (currentProps, nextEnhancer) => ({ ...currentProps, ...nextEnhancer(currentProps)}),
      props
    ))

export const withState = (state, setter, initialValue) => p => {
  const r = useState(initialValue);
  return { [state]: r[0], [setter]: r[1] };
}

export const withEffect = (effect, cleanup, deps) => p => {
  useEffect(
    () => {
      effect(p);
      return cleanup && (() => cleanup(p));
    },
    deps && deps.map(d => p[d])
  );
  return {};
}

export const withEventHandler = (event, handler, deps) => p => {
  useEffect(
    () => {
      const h = () => handler(p);
      window.addEventListener(event, h);
      return () => window.removeEventListener(event, h);
    },
    deps && deps.map(d => p[d])
  );
  return {};
}
