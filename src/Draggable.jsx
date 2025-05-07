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

export default function Draggable({children, position, id}) {
  // Take up 'id' as props to generate more draggables
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    // This means only one draggable is exected
    // id: 'draggable'

    id,
    // This id as a prop
    // We're passing id from the Map like id='1', id-'2'
    // Each draggable now has a unique ID
  });

  if (!position) return null;

  const translate = transform 
  ? { x: position.x + transform.x, y: position.y + transform.y }
  : position;
  // position is our home base for the draggable
  // transform here is the live drag movement
  // this is to ensure we get a smooth live preview while dragging

  const style = {
    ...itemStyle,
    transform: `translate3d(${translate.x}px, ${translate.y}px, 0)`,
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>{children}</button>
  )
}
