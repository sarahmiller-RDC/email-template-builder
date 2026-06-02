import { useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Bold, Italic, Underline } from 'lucide-react';

interface RichTextInputProps {
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  rows?: number;
  className?: string;
  placeholder?: string;
}

export function RichTextInput({
  value,
  onChange,
  multiline = false,
  rows = 2,
  className = '',
  placeholder = ''
}: RichTextInputProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isUpdatingRef = useRef(false);

  useEffect(() => {
    if (!editorRef.current || isUpdatingRef.current) return;

    const currentHtml = editorRef.current.innerHTML;
    const normalizedValue = value || '';

    // Only update if the content is different
    if (currentHtml !== normalizedValue) {
      editorRef.current.innerHTML = normalizedValue;
    }
  }, [value]);

  const handleInput = () => {
    if (!editorRef.current) return;

    isUpdatingRef.current = true;
    let html = editorRef.current.innerHTML;

    // Normalize tags: <b> -> <strong>, <i> -> <em>
    html = html.replace(/<b>/g, '<strong>').replace(/<\/b>/g, '</strong>');
    html = html.replace(/<i>/g, '<em>').replace(/<\/i>/g, '</em>');

    onChange(html);

    setTimeout(() => {
      isUpdatingRef.current = false;
    }, 0);
  };

  const applyFormat = (command: string) => {
    document.execCommand(command, false);
    editorRef.current?.focus();
    handleInput();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      if (multiline) {
        // Insert line break
        e.preventDefault();
        const selection = window.getSelection();
        const range = selection?.getRangeAt(0);
        if (range) {
          range.deleteContents();
          const br = document.createElement('br');
          range.insertNode(br);
          range.setStartAfter(br);
          range.setEndAfter(br);
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
        handleInput();
      } else {
        // Prevent line breaks in single-line mode
        e.preventDefault();
      }
    }
  };

  const minHeight = multiline ? `${rows * 24}px` : '36px';

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        <Button
          size="sm"
          variant="outline"
          type="button"
          onClick={() => applyFormat('bold')}
          className="h-7 px-2"
          title="Bold"
        >
          <Bold className="size-3" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          type="button"
          onClick={() => applyFormat('italic')}
          className="h-7 px-2"
          title="Italic"
        >
          <Italic className="size-3" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          type="button"
          onClick={() => applyFormat('underline')}
          className="h-7 px-2"
          title="Underline"
        >
          <Underline className="size-3" />
        </Button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        className={`w-full rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${className} text-[#0a0a0a]`}
        style={{ minHeight }}
        data-placeholder={placeholder}
        suppressContentEditableWarning
      />
      <style>{`
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}