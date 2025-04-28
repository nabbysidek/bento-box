import React from 'react'
import { useDroppable } from '@dnd-kit/core'

export default function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: "droppable",
  });

  const style = {
    background: "lightblue",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    fontWeight: "bold",
    color: isOver ? "#F9629F" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  )
}
