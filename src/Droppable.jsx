import { useDroppable } from "@dnd-kit/core";

export default function Droppable({id, children}) {
    const {setNodeRef} = useDroppable({
        id,
    });

  return (
    <div ref={setNodeRef} className="bg-blue-300 text-white font-medium w-30 h-30 flex items-center justify-center m-3">
        {children}
    </div>
  );
}
