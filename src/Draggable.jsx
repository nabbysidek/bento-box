import React from 'react'
import { useDraggable } from '@dnd-kit/core'

const itemStyle = {
  display: "flex",
  position: "absolute",
  justifyContent: "center",
  alignItems: "center",
  width: "30px",
  height: "30px",
  background: "lightpink",
  top: 0,
  left: 0,
};

export default function Draggable({children, position}) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: 'draggable',
  });

  if (!position) return null;

  const translate = transform 
  ? { x: position.x + transform.x, y: position.y + transform.y }
  : position;

  const style = {
    ...itemStyle,
    transform: `translate3d(${translate.x}px, ${translate.y}px, 0)`,
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>{children}</button>
  )
}
