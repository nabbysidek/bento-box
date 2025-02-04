import React, { useState } from 'react'
import { DndContext } from '@dnd-kit/core'
import DropZone from './DropZone'
import DraggableItem from './DraggableItem'
import './styles.css'
import 'tailwindcss'

function App() {
  const [isDropped, setIsDropped] = useState(false);
  const draggableItem = (
    <DraggableItem>Item!</DraggableItem>
  );

  function handleDragEnd(event) {
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true);
    }
  }

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
          {!isDropped ? draggableItem : null}
          <DropZone>
            {isDropped ? draggableItem : 'Drop!'}
          </DropZone>
      </DndContext>
    </>
  )
}

export default App
