import { useEffect, useRef } from "react";

/**
 * Custom hook to add and remove event listeners.
 * @param {string} eventType The event type to listen for (e.g., "click", "keydown", etc.).
 * @param {(event: Event) => void} callback The event callback function.
 * @param {EventTarget | null} element The target element to attach the event listener. Defaults to `window`.
 */
export function useEventListener(
   eventType: string,
   callback: (event: Event) => void,
   element: EventTarget | null = window
) {
   const callbackRef = useRef<(event: Event) => void>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (element == null) return;

    const handler = (e: Event) => callbackRef.current(e);
    element.addEventListener(eventType, handler);

    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element]);
}
