import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';
import { GripVertical } from 'lucide-react';

interface DragItem {
  index: number;
  id: string;
  type: string;
  panelIndex: number;
  isAdditional: boolean;
}

interface DraggableElementProps {
  id: string;
  index: number;
  panelIndex: number;
  isAdditional: boolean;
  moveElement: (dragIndex: number, hoverIndex: number) => void;
  children: React.ReactNode;
}

export function DraggableElement({ 
  id, 
  index, 
  panelIndex, 
  isAdditional,
  moveElement, 
  children 
}: DraggableElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const dragType = `element-${panelIndex}-${isAdditional ? 'additional' : 'main'}`;

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

      moveElement(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: dragType,
    item: () => {
      return { id, index, panelIndex, isAdditional };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  preview(drop(ref));

  return (
    <div ref={ref} style={{ opacity }} data-handler-id={handlerId} className="flex items-start gap-2">
      <div
        ref={drag}
        className="cursor-move hover:bg-gray-200 rounded p-1 flex-shrink-0 mt-3"
        style={{ touchAction: 'none' }}
      >
        <GripVertical className="size-4 text-gray-400" />
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
