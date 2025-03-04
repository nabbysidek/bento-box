import { useEffect, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Droppable from "./Droppable";
import Draggable from "./Draggable";

export default function Map() {
  const [occupiedDropzones, setOccupiedDropzones] = useState([]); // Track multiple occupied zones
  const [dropzoneCount, setDropzoneCount] = useState(1); // Default: 1 dropzones
  const [draggables, setDraggables] = useState([]); // Track draggable items

  // Function: Handle resizing and update dropzone count
  useEffect(() => {
    function updateDropzones() {
      const width = window.innerWidth;
      if (width >= 1024) {
        setDropzoneCount(7);
      } else if (width >= 768) {
        setDropzoneCount(5);
      } else {
        setDropzoneCount(3);
      }
    }

    // Run on mount and listen for resizing
    updateDropzones();
    window.addEventListener("resize", updateDropzones);
    return () => window.removeEventListener("resize", updateDropzones);
  }, []);

  function handleDragEnd(event) {
    const { active, over } = event;

    if (over) {
      const nextAvailableSlot = `dropzone-${occupiedDropzones.length + 1}`;

      if (
        over.id === nextAvailableSlot &&
        !occupiedDropzones.includes(over.id)
      ) {
        setOccupiedDropzones([...occupiedDropzones, over.id]);
        // Remove the dropped draggable from the list
        setDraggables((prev) => prev.filter((d) => d !== active.id));
      }
    }
  }

  function addDraggable() {
    if (occupiedDropzones.length + draggables.length < dropzoneCount) {
      setDraggables([...draggables, `drag-item-${draggables.length + 1}`]);
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
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
            {/* Drop zones */}
            {[...Array(dropzoneCount)].map((_, index) => {
              const id = `dropzone-${index + 1}`;
              return (
                <Droppable key={id} id={id}>
                  {occupiedDropzones.includes(id) ? "📫" : "📪"}
                </Droppable>
              );
            })}
          </div>

          <div className="mt-5 flex justify-center gap-4">
          {draggables.map((id) => (
            <Draggable key={id} id={id}>💌</Draggable>
          ))}
          </div>
        </DndContext>

        {/* Add Draggable button */}
        <div className="mt-4 flex justify-center">
          <button onClick={addDraggable} className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer" disabled={occupiedDropzones.length + draggables.length >= dropzoneCount}>+ New</button>
        </div>
      </div>
    </>
  );
}
