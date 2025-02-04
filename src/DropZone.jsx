import React from 'react'
import { useDroppable } from '@dnd-kit/core'

export default function DropZone(props) {
    const {isDropped, setNodeRef} = useDroppable({
        id: 'droppable',
    });
    const style = {
        color: isDropped ? 'red' : undefined,
    }

  return (
    <div ref={setNodeRef} style={style} className='h-screen bg-green-300'>
        {props.children}
    </div>
  )
}
