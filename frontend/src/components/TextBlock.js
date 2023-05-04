import { useEffect, useRef } from "react";

export const TextBlock = ({ text, size }) => {
  const div = useRef(null);

  useEffect(() => {
    const minSize = 1;         
    do {
      div.current.style.fontSize = size + "px";
      size = size - 0.1;
    } while (
      (div.current.clientWidth < div.current.scrollWidth ||
        div.current.clientHeight < div.current.scrollHeight) &&
      size > minSize
    );
  }, [text]);

  return <p ref={div}>{text}</p>;
};