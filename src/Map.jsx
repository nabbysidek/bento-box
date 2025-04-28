import React, {useState} from 'react'
import { DndContext } from '@dnd-kit/core'
import Droppable from './Droppable'
import Draggable from './Draggable'

export default function Map() {
  const [position, setPosition] = useState({x: 0, y: 0});

  function handleDragEnd(event) {
    const { delta } = event; // delta is the amount moved during the drag
    setPosition(prev => ({
      x: prev.x + delta.x,
      y: prev.y + delta.y,
    }));
  };

  return (
    <div>
      <DndContext onDragEnd={handleDragEnd}>
        <Droppable>
          <Draggable position={position}>🩵</Draggable>
        </Droppable>
      </DndContext>
    </div>
  );
}
