import React from 'react'
import { useDraggable } from '@dnd-kit/core'

const itemStyle = {
  display: "flex",
  width: "30px",
  height: "30px",
  background: "lightpink",
};

export default function Draggable(props) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: 'draggable',
  });

  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`, } : undefined;

  return (
    <button ref={setNodeRef} style={{...style, ...itemStyle}} {...listeners} {...attributes}>{props.children}</button>
  )
}
