import { useEffect, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Droppable from "./Droppable";
import Draggable from "./Draggable";

export default function Map() {
  const [droppedItem, setDroppedItem] = useState(null); // null as no id of droppable item is present yet
  // once droppable item is dropped, we exchanged the null to the id
  const [dropzoneCount, setDropzoneCount] = useState(1); // default: 1 dropzones

  // function: handle resizing and update dropzone count
  useEffect(() => {
    function updateDropzones() {
      const width = window.innerWidth;
      if(width >= 1024) {
        setDropzoneCount(7);
      } else if (width >= 768) {
        setDropzoneCount(5);
      } else {
        setDropzoneCount(3);
      }
    }

    // Run on mount and listen for resizing
    updateDropzones();
    window.addEventListener('resize', updateDropzones);
    return () => window.removeEventListener('resize', updateDropzones);
  }, []);

  function handleDragEnd(event) {
    const { active, over } = event;

    if (over) {
      setDroppedItem(over.id); // save the dragged item's ID
    }
  }

  return (
    <>
      {/* 
    
      Let's create a container called MAP for the drag and drops
    
    */}
      <div className="p-4">
        <DndContext onDragEnd={handleDragEnd}>
          {/* Responsive container */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start items-center mx-auto max-w-6xl">
            {/* Drop zones */}
            {[...Array(dropzoneCount)].map((_, index) => (
               <Droppable key={index} id={`dropzone-${index + 1}`}>
               {droppedItem === `dropzone-${index + 1}` ? "📫" : "📪"}
             </Droppable>
            ))}
          </div>

          <div className="mt-5 flex justify-center">
            {!droppedItem && <Draggable id="drag-item-1">💌</Draggable>}
          </div>
        </DndContext>
      </div>
    </>
  );
}
