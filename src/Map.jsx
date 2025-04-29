import React, {useRef, useState} from 'react'
import { DndContext } from '@dnd-kit/core'
import Droppable from './Droppable'
import Draggable from './Draggable'

export default function Map() {
  const [position, setPosition] = useState({x: 0, y: 0});
  const droppableRef = useRef(null);

  function handleDragEnd(event) {
    const { delta } = event; // delta is the amount moved during the drag
   
    // Get droppable bounds (the container size)
    const droppableBounds = droppableRef.current?.getBoundingClientRect();

    if (droppableBounds) {
      let newX = position.x + delta.x;
      let newY = position.y + delta.y;

      newX = Math.max(0, Math.min(newX, droppableBounds.width - 30));
      newY = Math.max(0, Math.min(newY, droppableBounds.height - 30));

      setPosition({x: newX, y: newY});
    }
  };

  return (
    <div>
      <DndContext onDragEnd={handleDragEnd}>
        <Droppable ref={droppableRef}>
          <Draggable position={position}>🩵</Draggable>
        </Droppable>
      </DndContext>
    </div>
  );
}
