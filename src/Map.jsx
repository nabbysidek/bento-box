import React, {useEffect, useRef, useState} from 'react'
import { DndContext } from '@dnd-kit/core'
import Droppable from './Droppable'
import Draggable from './Draggable'
import Header from './Header'

export default function Map() {
  const [items, setItems] = useState([]);
  const droppableRef = useRef(null);

  useEffect(() => {
    const droppableBounds = droppableRef.current?.getBoundingClientRect();

    if (droppableBounds) {
      const startX = (droppableBounds.width - 30) / 2;
      const startY = (droppableBounds.height - 30) / 2;
      setItems([{ id: '1', position: {x: startX, y: startY}}]);
    }
  }, []);

  const addDraggable = () => {
    // Get droppable bounds (the container size)
    const droppableBounds = droppableRef.current.getBoundingClientRect();
    const count = items.length;

    if(!droppableBounds) return;

    const newItem = {
      id: `${count + 1}`,
      position: {
        x: 50 * count,
        y: 50 * count,
      },
    };

    setItems((prev) => [...prev, newItem]);
  };

  const handleDragEnd = (event) => {
    const { active, delta } = event;

    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === active.id) {
          const newX = Math.max(0, item.position.x + delta.x);
          const newY = Math.max(0, item.position.y + delta.y);
          return {
            ...item,
            position: { x: newX, y: newY },
          };
        }
        return item;
      })
    );
  };

  return (
    <div>
      <Header onAddDraggable={addDraggable} />
      <DndContext onDragEnd={handleDragEnd}>
        <Droppable ref={droppableRef}>
        {items.map((item) => (
           <Draggable key={item.id} id={item.id} position={item.position}>
           {item.id}
         </Draggable>
          ))}
        </Droppable>
      </DndContext>
    </div>
  );
}
