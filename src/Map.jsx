import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Droppable from "./Droppable";
import Draggable from "./Draggable";

export default function Map() {
  const [droppedItem, setDroppedItem] = useState(null); // null as no id of droppable item is present yet
  // once droppable item is dropped, we exchanged the null to the id  

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
      <div className="">
        <DndContext onDragEnd={handleDragEnd}>
          <div className="flex flex-row">
            <div className="space-x-4">
              <Droppable id="dropzone-1">
                {droppedItem === "dropzone-1" ? "📫" : "📪"}
              </Droppable>
            </div>
            <div className="space-x-4">
              <Droppable id="dropzone-2">
                {droppedItem === "dropzone-2" ? "📫" : "📪"}
              </Droppable>
            </div>
            <div className="space-x-4">
              <Droppable id="dropzone-3">
                {droppedItem === "dropzone-3" ? "📫" : "📪"}
              </Droppable>
            </div>
          </div>

          <div className="mt-5">
            {!droppedItem && <Draggable id="drag-item-1">💌</Draggable>}
          </div>
        </DndContext>
      </div>
    </>
  );
}
