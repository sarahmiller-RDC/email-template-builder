import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';
import { GripVertical } from 'lucide-react';

interface DragItem {
  index: number;
  id: string;
  type: string;
}

interface DraggablePanelProps {
  id: string;
  index: number;
  movePanel: (dragIndex: number, hoverIndex: number) => void;
  children: React.ReactNode;
}

export function DraggablePanel({ id, index, movePanel, children }: DraggablePanelProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: 'panel',
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

      movePanel(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'panel',
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
    <div ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      <div className="flex items-start gap-2">
        <div
          ref={drag}
          className="cursor-move pt-3 hover:bg-gray-100 rounded p-1 flex-shrink-0"
          style={{ touchAction: 'none' }}
        >
          <GripVertical className="size-5 text-gray-400" />
        </div>
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
