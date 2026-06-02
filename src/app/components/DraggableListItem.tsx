import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';
import { GripVertical } from 'lucide-react';

interface DragItem {
  index: number;
  id: string;
  type: string;
}

interface DraggableListItemProps {
  id: string;
  index: number;
  elementId: string; // Unique ID to scope drag type
  moveListItem: (dragIndex: number, hoverIndex: number) => void;
  children: React.ReactNode;
}

export function DraggableListItem({ 
  id, 
  index, 
  elementId,
  moveListItem, 
  children 
}: DraggableListItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const dragType = `list-item-${elementId}`;

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: dragType,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: dragType,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  preview(drop(ref));

  return (
    <div ref={ref} style={{ opacity }} data-handler-id={handlerId} className="flex items-center gap-2">
      <div
        ref={drag}
        className="cursor-move hover:bg-gray-200 rounded p-1 flex-shrink-0"
        style={{ touchAction: 'none' }}
      >
        <GripVertical className="size-4 text-gray-400" />
      </div>
      <div className="flex-1 flex items-center gap-2">
        {children}
      </div>
    </div>
  );
}
