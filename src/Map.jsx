import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Droppable from "./Droppable";
import Draggable from "./Draggable";

export default function Map() {
    const [isDropped, setIsDropped] = useState(false);
    const draggableItem = (
        <Draggable>Drag me!</Draggable>
    );

    function handleDragEnd(event) {
        if(event.over && event.over.id === 'droppable') {
            setIsDropped(true);
        }
    };

  return (
    <>
      {/* 
    
      Let's create a container called MAP for the drag and drops
    
    */}
      <div className="flex flex-row bg-blue-500"> 
        <DndContext onDragEnd={handleDragEnd}>
            {!isDropped ? draggableItem : null}
            <Droppable>
                {isDropped ? draggableItem : 'Drop here!'}
            </Droppable>
        </DndContext>
      </div>
    </>
  );
}
