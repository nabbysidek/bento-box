import React from 'react'
import { useDroppable } from '@dnd-kit/core'

export default function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: "droppable",
  });

  const style = {
    background: "lightblue",
    display: "flex",
    width: "600px",
    height: "600px",
    fontWeight: "bold",
    color: isOver ? "lightpink" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  )
}
