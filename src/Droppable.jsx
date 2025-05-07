import React, { forwardRef } from 'react';
import { useDroppable } from '@dnd-kit/core';

const Droppable = forwardRef((props, ref) => {
  // forwardRef is to expose the DOM element to its parent (so Map can call .getBoundingClientRect() ).
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });

  const style = {
    position: "relative",
    background: "lightblue",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontWeight: "bold",
    color: isOver ? "#F9629F" : undefined,
  };

  // Connect both the dnd-kit ref and your forwarded ref
  return (
    <div
      ref={(node) => {
        setNodeRef(node);     // Required by dnd-kit
        if (typeof ref === 'function') {
          ref(node); // Hnalde functional refs (gives Map access to the DOM node)
        } else if (ref) {
          ref.current = node;
        }
      }}
      style={style}
    >
      {props.children}
    </div>
  );
});

export default Droppable;
