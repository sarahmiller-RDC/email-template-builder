import { useState, useRef, useEffect } from 'react';
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
  const editableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editableRef.current && editableRef.current.innerHTML !== value) {
      editableRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editableRef.current) {
      onChange(editableRef.current.innerHTML);
    }
  };

  const applyFormat = (command: string) => {
    document.execCommand(command, false);
    if (editableRef.current) {
      onChange(editableRef.current.innerHTML);
    }
    editableRef.current?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

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
        ref={editableRef}
        contentEditable
        onInput={handleInput}
        onPaste={handlePaste}
        className={`flex w-full rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className} text-[#0a0a0a] ${multiline ? 'min-h-[60px]' : 'h-9 py-1'} overflow-auto`}
        style={{ whiteSpace: multiline ? 'pre-wrap' : 'nowrap' }}
        suppressContentEditableWarning
      />
      {!value && (
        <div className="pointer-events-none absolute top-9 left-3 text-sm text-muted-foreground">
          {placeholder}
        </div>
      )}
    </div>
  );
}