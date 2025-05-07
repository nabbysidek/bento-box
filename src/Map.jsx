import React, {useEffect, useRef, useState} from 'react'
import { DndContext } from '@dnd-kit/core'
import Droppable from './Droppable'
import Draggable from './Draggable'
import Header from './Header'

export default function Map() {
  const [items, setItems] = useState([]); 
  const [desktopPositions, setDesktopPositions] = useState({}); // stores saved positions for desktop layouts
  const droppableRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    // droppableRef.current is the actual DOM element of the droppable container
    // .getBoundingClientRect() returns the position and dimensions of an element relative to the viewport
    const droppableBounds = droppableRef.current?.getBoundingClientRect();

    // Initial draggable: Centered on the screen on desktop
    if (droppableBounds) {
      const startX = (droppableBounds.width - 30) / 2;
      const startY = (droppableBounds.height - 30) / 2;
      setItems([{ id: '1', position: {x: startX, y: startY}}]);
    }

    // Resize listener: Dynamically updates isMobile
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, []);

  // Add new draggable button handler
  // When Header button is clicked, adds a new draggable with a staggered position
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

  // To handle dragging and dropping
  const handleDragEnd = (event) => {
    const { active, delta } = event;
    const droppableBounds = droppableRef.current.getBoundingClientRect();
    const draggableSize = 30;

    // Snpas it inside the bounds
    if(!droppableBounds) return;

    // Updates the draggables' positions
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === active.id) {
          const rawX = item.position.x + delta.x;
          const rawY = item.position.y + delta.y;

          const newX = Math.min(Math.max(0, rawX), droppableBounds.width - draggableSize);
          const newY = Math.min(Math.max(0, rawY), droppableBounds.height -draggableSize);

          // Saves desktop positions when not on mobile
          if (!isMobile) {
            setDesktopPositions((prev) => ({
              ...prev,
              [item.id]: {x: newX, y: newY},
            }));
          }

          return {
            ...item,
            position: { x: newX, y: newY },
          };
        }
        return item;
      })
    );
  };

  // Responsive positioning on screen resize
  // Repositions all draggables
  // On mobile: stacks them vertically
  // On desktop: restores previous saved positions
  useEffect(() => {
    setItems((prevItems) => 
    prevItems.map((item, index) => {
      if (isMobile) {
        return {
          ...item,
          position: {x:10, y:50 * index + 10},
        };
      } else {
        return {
          ...item,
          position: desktopPositions[item.id] || item.position,
        };
      }
    })
  );
  }, [isMobile]);

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
