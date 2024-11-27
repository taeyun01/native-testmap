import {ForwardedRef} from 'react';

// 여러 개의 ref를 하나로 합쳐주는 함수 (ref를 두개 이상 사용할 때 사용)
export const mergeRefs = <T>(...refs: ForwardedRef<T>[]) => {
  return (node: T) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    });
  };
};
