import React, {useState} from 'react'
import { DndContext } from '@dnd-kit/core'
import Droppable from './Droppable'
import Draggable from './Draggable'

export default function Map() {
  const [isDropped, setDropped] = useState(false);
  const draggableMarkup = (
    <Draggable>🩵</Draggable>
  );

  return (
    <div>
      <DndContext onDragEnd={handleDragEnd}>
        {!isDropped ? draggableMarkup : null}
        <Droppable>
          {isDropped ? draggableMarkup : "HERE!"}
        </Droppable>
      </DndContext>
    </div>
  );

  function handleDragEnd(event) {
    if(event.over && event.over.id === "droppable") {
      setDropped(true);
    }
  }
}
