import { RefObject } from 'react';
import { useEventListener } from '.';

/**
 * Custom hook to trigger a callback when a click occurs outside the provided ref element.
 * @param {RefObject<HTMLElement>} ref The ref object representing the element to watch for clicks outside.
 * @param {(event: Event) => void} callback The callback function to be executed when a click occurs outside the element.
 */
export function useOutside(
   ref: RefObject<HTMLElement>,
   callback: (event: Event) => void
) {
   useEventListener('click', (e: Event) => {
      if (ref.current == null || ref.current.contains(e.target as Node)) return;
      callback(e);
    }, document);
}
