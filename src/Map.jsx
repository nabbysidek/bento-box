import React, {useEffect, useRef, useState} from 'react'
import { DndContext } from '@dnd-kit/core'
import Droppable from './Droppable'
import Draggable from './Draggable'

export default function Map() {
  const [position, setPosition] = useState(null);
  const droppableRef = useRef(null);

  useEffect(() => {
    const droppableBounds = droppableRef.current?.getBoundingClientRect();

    if (droppableBounds) {
      const startX = (droppableBounds.width - 30) / 2;
      const startY = (droppableBounds.height - 30) / 2;
      setPosition({x: startX, y: startY});
    }
  }, []);

  function handleDragEnd(event) {
    // Get droppable bounds (the container size)
    const droppableBounds = droppableRef.current?.getBoundingClientRect();

    if(!droppableBounds) return;

    const draggableSize = 30;
    const maxX = droppableBounds.width - draggableSize;
    const maxY = droppableBounds.height -draggableSize;

    let newX = position.x + event.delta.x;
    let newY = position.y + event.delta.y;

    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

      setPosition({x: newX, y: newY});
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
