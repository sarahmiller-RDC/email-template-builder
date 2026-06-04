import { useState, useEffect } from 'react';
import { EmailData, PanelConfig, PanelType, ContentElement, ContentElementType, BodyItem } from '../types/email';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Plus, Trash2, Type, AlignLeft, Bold as BoldIcon, MousePointerClick, Italic, Underline, ChevronDown, Pencil, Minus, List, ListOrdered, Image as ImageIcon, Upload, Save, FolderOpen } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { DraggableBodyItem } from './DraggableBodyItem';
import { DraggableElement } from './DraggableElement';
import { DraggableListItem } from './DraggableListItem';
import { RichTextInput } from './RichTextInput';

interface EmailEditorProps {
  emailData: EmailData;
  onEmailDataChange: (data: EmailData) => void;
  showInformation: boolean;
  onShowInformationChange: (value: boolean) => void;
}

const elementTypeLabels: Record<ContentElementType, string> = {
  h1: 'H1 Heading',
  h2: 'H2 Heading',
  bodyText: 'Body Text',
  bulletList: 'Bullet List',
  numberedList: 'Numbered List',
  primaryButton: 'Primary Button',
  secondaryButton: 'Secondary Button',
  divider: 'Divider',
  image: 'Image',
};

const elementTypeIcons: Record<ContentElementType, any> = {
  h1: Type,
  h2: Type,
  bodyText: AlignLeft,
  bulletList: List,
  numberedList: ListOrdered,
  primaryButton: MousePointerClick,
  secondaryButton: MousePointerClick,
  divider: Minus,
  image: ImageIcon,
};

export function EmailEditor({ emailData, onEmailDataChange, showInformation, onShowInformationChange }: EmailEditorProps) {
  const [activeTab, setActiveTab] = useState<'information' | 'body' | 'footer'>('body');
  const [openPanels, setOpenPanels] = useState<Record<string, boolean>>({});
  const [editingDisclaimer, setEditingDisclaimer] = useState(false);
  const [editingCopyright, setEditingCopyright] = useState(false);
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [addMenuBottomOpen, setAddMenuBottomOpen] = useState(false);
  const [panelAddMenuOpen, setPanelAddMenuOpen] = useState<Record<string, boolean>>({});

  // Initialize all panels as open by default
  useEffect(() => {
    const panelIds = emailData.body.bodyItems
      .filter(item => item.itemType === 'panel')
      .map(item => item.id);

    setOpenPanels(prev => {
      const newOpenPanels = { ...prev };
      panelIds.forEach(id => {
        if (!(id in newOpenPanels)) {
          newOpenPanels[id] = true;
        }
      });
      return newOpenPanels;
    });
  }, [emailData.body.bodyItems]);

  const updateInformation = (field: keyof EmailData['information'], value: string) => {
    onEmailDataChange({
      ...emailData,
      information: {
        ...emailData.information,
        [field]: value,
      },
    });
  };

  const updateFooter = (field: keyof EmailData['footer'], value: any) => {
    onEmailDataChange({
      ...emailData,
      footer: {
        ...emailData.footer,
        [field]: value,
      },
    });
  };

  const addPanel = (type: PanelType, position: 'top' | 'bottom' = 'top') => {
    const newPanel: PanelConfig = {
      id: `panel-${Date.now()}`,
      type,
      ...(type === 'standard' ? { elements: [] } : {}),
      ...(type === 'lead-claiming' ? {
        leadClaimingContent: {
          leadName: 'Lead Name',
          leadAddress: 'Lead Address',
          note: 'Note',
          contactName: 'Name',
          phone: '(888) 991-7034',
          pin: '3525',
        },
        additionalElements: [],
      } : {}),
      ...(type === 'proposal' ? {
        proposalContent: {
          commission: 'N',
          services: ['service 1', 'service 2', 'service 3'],
          clientName: 'Name',
        },
        additionalElements: [],
      } : {}),
    };

    const newBodyItem: BodyItem = {
      itemType: 'panel',
      id: `item-${Date.now()}`,
      data: newPanel,
    };

    onEmailDataChange({
      ...emailData,
      body: {
        ...emailData.body,
        bodyItems: position === 'top'
          ? [newBodyItem, ...emailData.body.bodyItems]
          : [...emailData.body.bodyItems, newBodyItem],
      },
    });
  };

  const addContentBlock = (type: ContentElementType, position: 'top' | 'bottom' = 'top') => {
    const newBlock: ContentElement = {
      id: `block-${Date.now()}`,
      type,
      content: type === 'h1' ? 'H1' :
               type === 'h2' ? 'H2' :
               type === 'bodyText' ? 'Body text' :
               type === 'bulletList' ? '' :
               type === 'numberedList' ? '' :
               type === 'primaryButton' ? 'Primary button' :
               type === 'secondaryButton' ? 'Secondary button' :
               type === 'image' ? '' :
               '',
      ...(type === 'primaryButton' || type === 'secondaryButton' ? { url: 'https://example.com' } : {}),
      ...(type === 'bulletList' || type === 'numberedList' ? { items: ['List item 1', 'List item 2', 'List item 3'] } : {}),
      ...(type === 'image' ? { imageData: '', imageAlt: 'Image description' } : {}),
    };

    const newBodyItem: BodyItem = {
      itemType: 'content',
      id: `item-${Date.now()}`,
      data: newBlock,
    };

    onEmailDataChange({
      ...emailData,
      body: {
        ...emailData.body,
        bodyItems: position === 'top'
          ? [newBodyItem, ...emailData.body.bodyItems]
          : [...emailData.body.bodyItems, newBodyItem],
      },
    });
  };

  const updateContentBlock = (itemId: string, field: keyof ContentElement, value: string) => {
    onEmailDataChange({
      ...emailData,
      body: {
        ...emailData.body,
        bodyItems: emailData.body.bodyItems.map(item =>
          item.itemType === 'content' && item.id === itemId
            ? { ...item, data: { ...item.data, [field]: value } }
            : item
        ),
      },
    });
  };

  const deleteBodyItem = (itemId: string) => {
    onEmailDataChange({
      ...emailData,
      body: {
        ...emailData.body,
        bodyItems: emailData.body.bodyItems.filter(item => item.id !== itemId),
      },
    });
  };

  // List item management for standalone content blocks
  const addListItemToContent = (itemId: string) => {
    onEmailDataChange({
      ...emailData,
      body: {
        ...emailData.body,
        bodyItems: emailData.body.bodyItems.map(item => {
          if (item.itemType === 'content' && item.id === itemId) {
            return {
              ...item,
              data: {
                ...item.data,
                items: [...(item.data.items || []), 'New list item']
              }
            };
          }
          return item;
        }),
      },
    });
  };

  const updateListItemInContent = (itemId: string, listItemIndex: number, value: string) => {
    onEmailDataChange({
      ...emailData,
      body: {
        ...emailData.body,
        bodyItems: emailData.body.bodyItems.map(item => {
          if (item.itemType === 'content' && item.id === itemId) {
            const newItems = [...(item.data.items || [])];
            newItems[listItemIndex] = value;
            return {
              ...item,
              data: {
                ...item.data,
                items: newItems
              }
            };
          }
          return item;
        }),
      },
    });
  };

  const deleteListItemFromContent = (itemId: string, listItemIndex: number) => {
    onEmailDataChange({
      ...emailData,
      body: {
        ...emailData.body,
        bodyItems: emailData.body.bodyItems.map(item => {
          if (item.itemType === 'content' && item.id === itemId) {
            const newItems = [...(item.data.items || [])];
            newItems.splice(listItemIndex, 1);
            return {
              ...item,
              data: {
                ...item.data,
                items: newItems
              }
            };
          }
          return item;
        }),
      },
    });
  };

  const moveListItemInContent = (itemId: string) => 
    (dragIndex: number, hoverIndex: number) => {
      onEmailDataChange({
        ...emailData,
        body: {
          ...emailData.body,
          bodyItems: emailData.body.bodyItems.map(item => {
            if (item.itemType === 'content' && item.id === itemId) {
              const newItems = [...(item.data.items || [])];
              const [removed] = newItems.splice(dragIndex, 1);
              newItems.splice(hoverIndex, 0, removed);
              return {
                ...item,
                data: {
                  ...item.data,
                  items: newItems
                }
              };
            }
            return item;
          }),
        },
      });
    };

  const updatePanel = (itemId: string, updates: Partial<PanelConfig>) => {
    onEmailDataChange({
      ...emailData,
      body: {
        ...emailData.body,
        bodyItems: emailData.body.bodyItems.map(item =>
          item.itemType === 'panel' && item.id === itemId
            ? { ...item, data: { ...item.data, ...updates } }
            : item
        ),
      },
    });
  };

  const moveBodyItem = (dragIndex: number, hoverIndex: number) => {
    const newBodyItems = [...emailData.body.bodyItems];
    const [removed] = newBodyItems.splice(dragIndex, 1);
    newBodyItems.splice(hoverIndex, 0, removed);
    
    onEmailDataChange({
      ...emailData,
      body: {
        ...emailData.body,
        bodyItems: newBodyItems,
      },
    });
  };

  const addElement = (itemId: string, type: ContentElementType, isAdditional = false) => {
    const newElement: ContentElement = {
      id: `elem-${Date.now()}`,
      type,
      content: type === 'divider' ? '' : 
               type === 'h1' ? 'H1' : 
               type === 'h2' ? 'H2' : 
               type === 'bodyText' ? 'Body text' :
               type === 'bulletList' ? '' :
               type === 'numberedList' ? '' :
               type === 'primaryButton' ? 'Primary button' : 
               type === 'secondaryButton' ? 'Secondary button' :
               type === 'image' ? '' : 
               'Body text',
      ...(type === 'primaryButton' || type === 'secondaryButton' ? { url: 'https://example.com' } : {}),
      ...(type === 'bulletList' || type === 'numberedList' ? { items: ['List item 1', 'List item 2', 'List item 3'] } : {}),
      ...(type === 'image' ? { imageData: '', imageAlt: 'Image description' } : {}),
    };

    onEmailDataChange({
      ...emailData,
      body: {
        ...emailData.body,
        bodyItems: emailData.body.bodyItems.map(item => {
          if (item.itemType === 'panel' && item.id === itemId) {
            if (isAdditional) {
              return {
                ...item,
                data: {
                  ...item.data,
                  additionalElements: [newElement, ...(item.data.additionalElements || [])],
                },
              };
            } else {
              return {
                ...item,
                data: {
                  ...item.data,
                  elements: [newElement, ...(item.data.elements || [])],
                },
              };
            }
          }
          return item;
        }),
      },
    });
  };

  const updateElement = (itemId: string, elementIndex: number, content: string, isAdditional = false) => {
    onEmailDataChange({
      ...emailData,
      body: {
        ...emailData.body,
        bodyItems: emailData.body.bodyItems.map(item => {
          if (item.itemType === 'panel' && item.id === itemId) {
            if (isAdditional) {
              const newElements = [...(item.data.additionalElements || [])];
              newElements[elementIndex] = { ...newElements[elementIndex], content };
              return { ...item, data: { ...item.data, additionalElements: newElements } };
            } else {
              const newElements = [...(item.data.elements || [])];
              newElements[elementIndex] = { ...newElements[elementIndex], content };
              return { ...item, data: { ...item.data, elements: newElements } };
            }
          }
          return item;
        }),
      },
    });
  };

  const deleteElement = (itemId: string, elementIndex: number, isAdditional = false) => {
    onEmailDataChange({
      ...emailData,
      body: {
        ...emailData.body,
        bodyItems: emailData.body.bodyItems.map(item => {
          if (item.itemType === 'panel' && item.id === itemId) {
            if (isAdditional) {
              return {
                ...item,
                data: {
                  ...item.data,
                  additionalElements: (item.data.additionalElements || []).filter((_, i) => i !== elementIndex),
                },
              };
            } else {
              return {
                ...item,
                data: {
                  ...item.data,
                  elements: (item.data.elements || []).filter((_, i) => i !== elementIndex),
                },
              };
            }
          }
          return item;
        }),
      },
    });
  };

  const moveElementInPanel = (itemId: string, isAdditional: boolean) => 
    (dragIndex: number, hoverIndex: number) => {
      onEmailDataChange({
        ...emailData,
        body: {
          ...emailData.body,
          bodyItems: emailData.body.bodyItems.map(item => {
            if (item.itemType === 'panel' && item.id === itemId) {
              const elements = isAdditional ? [...(item.data.additionalElements || [])] : [...(item.data.elements || [])];
              const [removed] = elements.splice(dragIndex, 1);
              elements.splice(hoverIndex, 0, removed);
              
              if (isAdditional) {
                return { ...item, data: { ...item.data, additionalElements: elements } };
              } else {
                return { ...item, data: { ...item.data, elements } };
              }
            }
            return item;
          }),
        },
      });
    };

  const toggleHelpSection = (visible: boolean) => {
    onEmailDataChange({
      ...emailData,
      body: {
        ...emailData.body,
        helpSection: {
          ...emailData.body.helpSection,
          visible,
        },
      },
    });
  };

  const updateHelpMessage = (index: number, message: string) => {
    const newBoxes = [...emailData.body.helpSection.boxes];
    newBoxes[index] = { ...newBoxes[index], message };
    onEmailDataChange({
      ...emailData,
      body: {
        ...emailData.body,
        helpSection: {
          ...emailData.body.helpSection,
          boxes: newBoxes,
        },
      },
    });
  };

  const toggleSignatureSection = (visible: boolean) => {
    onEmailDataChange({
      ...emailData,
      body: {
        ...emailData.body,
        signatureSection: {
          ...emailData.body.signatureSection,
          visible,
        },
      },
    });
  };

  const updateSignature = (field: keyof EmailData['body']['signatureSection'], value: string | boolean) => {
    onEmailDataChange({
      ...emailData,
      body: {
        ...emailData.body,
        signatureSection: {
          ...emailData.body.signatureSection,
          [field]: value,
        },
      },
    });
  };

  // List item management functions
  const addListItem = (itemId: string, elementIndex: number, isAdditional: boolean) => {
    onEmailDataChange({
      ...emailData,
      body: {
        ...emailData.body,
        bodyItems: emailData.body.bodyItems.map(item => {
          if (item.itemType === 'panel' && item.id === itemId) {
            if (isAdditional) {
              const newElements = [...(item.data.additionalElements || [])];
              const element = newElements[elementIndex];
              newElements[elementIndex] = { 
                ...element, 
                items: [...(element.items || []), 'New list item'] 
              };
              return { ...item, data: { ...item.data, additionalElements: newElements } };
            } else {
              const newElements = [...(item.data.elements || [])];
              const element = newElements[elementIndex];
              newElements[elementIndex] = { 
                ...element, 
                items: [...(element.items || []), 'New list item'] 
              };
              return { ...item, data: { ...item.data, elements: newElements } };
            }
          }
          return item;
        }),
      },
    });
  };

  const updateListItem = (itemId: string, elementIndex: number, listItemIndex: number, value: string, isAdditional: boolean) => {
    onEmailDataChange({
      ...emailData,
      body: {
        ...emailData.body,
        bodyItems: emailData.body.bodyItems.map(item => {
          if (item.itemType === 'panel' && item.id === itemId) {
            if (isAdditional) {
              const newElements = [...(item.data.additionalElements || [])];
              const element = newElements[elementIndex];
              const newItems = [...(element.items || [])];
              newItems[listItemIndex] = value;
              newElements[elementIndex] = { ...element, items: newItems };
              return { ...item, data: { ...item.data, additionalElements: newElements } };
            } else {
              const newElements = [...(item.data.elements || [])];
              const element = newElements[elementIndex];
              const newItems = [...(element.items || [])];
              newItems[listItemIndex] = value;
              newElements[elementIndex] = { ...element, items: newItems };
              return { ...item, data: { ...item.data, elements: newElements } };
            }
          }
          return item;
        }),
      },
    });
  };

  const deleteListItem = (itemId: string, elementIndex: number, listItemIndex: number, isAdditional: boolean) => {
    onEmailDataChange({
      ...emailData,
      body: {
        ...emailData.body,
        bodyItems: emailData.body.bodyItems.map(item => {
          if (item.itemType === 'panel' && item.id === itemId) {
            if (isAdditional) {
              const newElements = [...(item.data.additionalElements || [])];
              const element = newElements[elementIndex];
              const newItems = [...(element.items || [])];
              newItems.splice(listItemIndex, 1);
              newElements[elementIndex] = { ...element, items: newItems };
              return { ...item, data: { ...item.data, additionalElements: newElements } };
            } else {
              const newElements = [...(item.data.elements || [])];
              const element = newElements[elementIndex];
              const newItems = [...(element.items || [])];
              newItems.splice(listItemIndex, 1);
              newElements[elementIndex] = { ...element, items: newItems };
              return { ...item, data: { ...item.data, elements: newElements } };
            }
          }
          return item;
        }),
      },
    });
  };

  const moveListItemInPanel = (itemId: string, elementIndex: number, isAdditional: boolean) => 
    (dragIndex: number, hoverIndex: number) => {
      onEmailDataChange({
        ...emailData,
        body: {
          ...emailData.body,
          bodyItems: emailData.body.bodyItems.map(item => {
            if (item.itemType === 'panel' && item.id === itemId) {
              if (isAdditional) {
                const newElements = [...(item.data.additionalElements || [])];
                const element = newElements[elementIndex];
                const newItems = [...(element.items || [])];
                const [removed] = newItems.splice(dragIndex, 1);
                newItems.splice(hoverIndex, 0, removed);
                newElements[elementIndex] = { ...element, items: newItems };
                return { ...item, data: { ...item.data, additionalElements: newElements } };
              } else {
                const newElements = [...(item.data.elements || [])];
                const element = newElements[elementIndex];
                const newItems = [...(element.items || [])];
                const [removed] = newItems.splice(dragIndex, 1);
                newItems.splice(hoverIndex, 0, removed);
                newElements[elementIndex] = { ...element, items: newItems };
                return { ...item, data: { ...item.data, elements: newElements } };
              }
            }
            return item;
          }),
        },
      });
    };

  // Image upload handler
  const handleImageUpload = (itemId: string, elementIndex: number, isAdditional: boolean, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result as string;
      onEmailDataChange({
        ...emailData,
        body: {
          ...emailData.body,
          bodyItems: emailData.body.bodyItems.map(item => {
            if (item.itemType === 'panel' && item.id === itemId) {
              if (isAdditional) {
                const newElements = [...(item.data.additionalElements || [])];
                newElements[elementIndex] = { ...newElements[elementIndex], imageData };
                return { ...item, data: { ...item.data, additionalElements: newElements } };
              } else {
                const newElements = [...(item.data.elements || [])];
                newElements[elementIndex] = { ...newElements[elementIndex], imageData };
                return { ...item, data: { ...item.data, elements: newElements } };
              }
            }
            if (item.itemType === 'content' && item.id === itemId) {
              return { ...item, data: { ...item.data, imageData } };
            }
            return item;
          }),
        },
      });
    };
    reader.readAsDataURL(file);
  };

  const handleImageAltChange = (itemId: string, elementIndex: number, isAdditional: boolean, alt: string) => {
    onEmailDataChange({
      ...emailData,
      body: {
        ...emailData.body,
        bodyItems: emailData.body.bodyItems.map(item => {
          if (item.itemType === 'panel' && item.id === itemId) {
            if (isAdditional) {
              const newElements = [...(item.data.additionalElements || [])];
              newElements[elementIndex] = { ...newElements[elementIndex], imageAlt: alt };
              return { ...item, data: { ...item.data, additionalElements: newElements } };
            } else {
              const newElements = [...(item.data.elements || [])];
              newElements[elementIndex] = { ...newElements[elementIndex], imageAlt: alt };
              return { ...item, data: { ...item.data, elements: newElements } };
            }
          }
          if (item.itemType === 'content' && item.id === itemId) {
            return { ...item, data: { ...item.data, imageAlt: alt } };
          }
          return item;
        }),
      },
    });
  };

  // Help section image upload handler
  const handleHelpImageUpload = (helpBoxIndex: number, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result as string;
      const newBoxes = [...emailData.body.helpSection.boxes];
      newBoxes[helpBoxIndex] = { ...newBoxes[helpBoxIndex], imageData };
      onEmailDataChange({
        ...emailData,
        body: {
          ...emailData.body,
          helpSection: {
            ...emailData.body.helpSection,
            boxes: newBoxes,
          },
        },
      });
    };
    reader.readAsDataURL(file);
  };

  const handleHelpImageAltChange = (helpBoxIndex: number, alt: string) => {
    const newBoxes = [...emailData.body.helpSection.boxes];
    newBoxes[helpBoxIndex] = { ...newBoxes[helpBoxIndex], imageAlt: alt };
    onEmailDataChange({
      ...emailData,
      body: {
        ...emailData.body,
        helpSection: {
          ...emailData.body.helpSection,
          boxes: newBoxes,
        },
      },
    });
  };

  const handleHelpImageRemove = (helpBoxIndex: number) => {
    const newBoxes = [...emailData.body.helpSection.boxes];
    newBoxes[helpBoxIndex] = { 
      ...newBoxes[helpBoxIndex], 
      imageData: undefined,
      imageAlt: undefined 
    };
    onEmailDataChange({
      ...emailData,
      body: {
        ...emailData.body,
        helpSection: {
          ...emailData.body.helpSection,
          boxes: newBoxes,
        },
      },
    });
  };

  const renderElementEditor = (
    element: ContentElement,
    itemId: string,
    elementIndex: number,
    elementsLength: number,
    isAdditional = false
  ) => {
    return (
      <div className="rounded-[10px] p-3 space-y-2 bg-[#f1f7ff]">
        <div className="flex items-center justify-between">
          <span className="text-[16px] text-blue-700">{elementTypeLabels[element.type]}</span>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => deleteElement(itemId, elementIndex, isAdditional)}
          >
            <Trash2 className="size-4 text-blue-700" />
          </Button>
        </div>
        
        {element.type !== 'divider' && (
          <>
            {element.type === 'bulletList' || element.type === 'numberedList' ? (
              <div className="space-y-2">
                {(element.items || []).map((item, idx) => (
                  <DraggableListItem
                    key={idx}
                    id={`${element.id}-item-${idx}`}
                    index={idx}
                    elementId={element.id}
                    moveListItem={moveListItemInPanel(itemId, elementIndex, isAdditional)}
                  >
                    <Input
                      value={item}
                      onChange={(e) => updateListItem(itemId, elementIndex, idx, e.target.value, isAdditional)}
                      className="text-[14px] bg-white flex-1"
                      placeholder={`List item ${idx + 1}`}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteListItem(itemId, elementIndex, idx, isAdditional)}
                      disabled={(element.items || []).length <= 1}
                    >
                      <Trash2 className="size-4 text-blue-700" />
                    </Button>
                  </DraggableListItem>
                ))}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => addListItem(itemId, elementIndex, isAdditional)}
                  className="w-full text-[12px] h-8"
                >
                  <Plus className="size-3 mr-1" />
                  Add list item
                </Button>
              </div>
            ) : (
              <div>
                {element.type === 'bodyText' || element.type === 'h1' || element.type === 'h2' ? (
                  <RichTextInput
                    value={element.content}
                    onChange={(content) => updateElement(itemId, elementIndex, content, isAdditional)}
                    multiline={true}
                    rows={2}
                    className="text-[14px]"
                  />
                ) : (
                  <Textarea
                    value={element.content}
                    onChange={(e) => updateElement(itemId, elementIndex, e.target.value, isAdditional)}
                    className="text-[14px] bg-white"
                  />
                )}
              </div>
            )}
            {(element.type === 'primaryButton' || element.type === 'secondaryButton') && (
              <div>
                <Label className="text-[12px] text-gray-600">Button URL</Label>
                <Textarea
                  value={element.url || ''}
                  onChange={(e) => {
                    onEmailDataChange({
                      ...emailData,
                      body: {
                        ...emailData.body,
                        bodyItems: emailData.body.bodyItems.map(item => {
                          if (item.itemType === 'panel' && item.id === itemId) {
                            if (isAdditional) {
                              const newElements = [...(item.data.additionalElements || [])];
                              newElements[elementIndex] = { ...newElements[elementIndex], url: e.target.value };
                              return { ...item, data: { ...item.data, additionalElements: newElements } };
                            } else {
                              const newElements = [...(item.data.elements || [])];
                              newElements[elementIndex] = { ...newElements[elementIndex], url: e.target.value };
                              return { ...item, data: { ...item.data, elements: newElements } };
                            }
                          }
                          return item;
                        }),
                      },
                    });
                  }}
                  className="text-[14px] bg-white"
                  placeholder="https://example.com"
                />
              </div>
            )}
            {element.type === 'image' && (
              <div className="space-y-2">
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleImageUpload(itemId, elementIndex, isAdditional, file);
                      }
                    }}
                    className="hidden"
                    id={`image-upload-${itemId}-${elementIndex}`}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      document.getElementById(`image-upload-${itemId}-${elementIndex}`)?.click();
                    }}
                    className="w-full text-[12px] h-8 bg-white"
                  >
                    <Upload className="size-3 mr-1" />
                    {element.imageData ? 'Change Image' : 'Upload Image'}
                  </Button>
                </div>
                {element.imageData && (
                  <div className="rounded overflow-hidden">
                    <img src={element.imageData} alt={element.imageAlt || ''} className="w-full h-auto" />
                  </div>
                )}
                <div>
                  <Label className="text-[12px] text-gray-600">Image Alt Text</Label>
                  <Input
                    value={element.imageAlt || ''}
                    onChange={(e) => handleImageAltChange(itemId, elementIndex, isAdditional, e.target.value)}
                    className="text-[14px] bg-white"
                    placeholder="Image description"
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  const renderAddElementMenu = (itemId: string, isAdditional = false) => (
    <div className="space-y-2">
      <Label className="text-[12px] text-gray-600">Add Element</Label>
      <div className="grid grid-cols-2 gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => addElement(itemId, 'h1', isAdditional)}
          className="text-[12px] h-8 bg-[#f1f7ff] border-blue-400 text-blue-700 hover:bg-blue-100"
        >
          <Type className="size-3 mr-1" />
          H1 Heading
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => addElement(itemId, 'h2', isAdditional)}
          className="text-[12px] h-8 bg-[#f1f7ff] border-blue-400 text-blue-700 hover:bg-blue-100"
        >
          <Type className="size-3 mr-1" />
          H2 Heading
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => addElement(itemId, 'bodyText', isAdditional)}
          className="text-[12px] h-8 bg-[#f1f7ff] border-blue-400 text-blue-700 hover:bg-blue-100"
        >
          <AlignLeft className="size-3 mr-1" />
          Body
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => addElement(itemId, 'primaryButton', isAdditional)}
          className="text-[12px] h-8 bg-[#f1f7ff] border-blue-400 text-blue-700 hover:bg-blue-100"
        >
          <MousePointerClick className="size-3 mr-1" />
          Primary button
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => addElement(itemId, 'secondaryButton', isAdditional)}
          className="text-[12px] h-8 bg-[#f1f7ff] border-blue-400 text-blue-700 hover:bg-blue-100"
        >
          <MousePointerClick className="size-3 mr-1" />
          Secondary button
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => addElement(itemId, 'divider', isAdditional)}
          className="text-[12px] h-8 bg-[#f1f7ff] border-blue-400 text-blue-700 hover:bg-blue-100"
        >
          <Minus className="size-3 mr-1" />
          Divider
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => addElement(itemId, 'image', isAdditional)}
          className="text-[12px] h-8 bg-[#f1f7ff] border-blue-400 text-blue-700 hover:bg-blue-100"
        >
          <ImageIcon className="size-3 mr-1" />
          Image
        </Button>
      </div>
    </div>
  );

  const saveJSON = () => {
    const blob = new Blob([JSON.stringify(emailData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${emailData.information.emailName || 'email'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        onEmailDataChange(data);
      } catch {
        alert('Invalid file — please upload a valid email JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="h-full overflow-auto p-4 bg-[#F0F0F0]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[24px] mb-1">Email editor</h2>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={saveJSON} className="gap-1.5 text-[13px]">
            <Save className="size-3.5" /> Save
          </Button>
          <Button size="sm" variant="outline" className="gap-1.5 text-[13px]" onClick={() => document.getElementById('load-json-input')?.click()}>
            <FolderOpen className="size-3.5" /> Load
          </Button>
          <input id="load-json-input" type="file" accept=".json" className="hidden" onChange={loadJSON} />
        </div>
      </div>

      <Tabs defaultValue="body" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="information">Details</TabsTrigger>
          <TabsTrigger value="body">Email Body</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
        </TabsList>

        <TabsContent value="information" className="space-y-3 mt-3">
          <Card className="bg-white">
            <CardHeader className="pb-3 pt-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-[16px]">Email Information</CardTitle>
                <CardDescription>Email metadata and recipient details</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="infoVisible" className="text-[14px] text-gray-600">Show in preview</Label>
                <Switch
                  id="infoVisible"
                  checked={showInformation}
                  onCheckedChange={onShowInformationChange}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="emailName">Email Name/Type</Label>
                <Input
                  id="emailName"
                  value={emailData.information.emailName}
                  onChange={(e) => updateInformation('emailName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="subject">Subject Line</Label>
                <Input
                  id="subject"
                  value={emailData.information.subject}
                  onChange={(e) => updateInformation('subject', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="from">From Address</Label>
                <Input
                  id="from"
                  value={emailData.information.fromAddress}
                  onChange={(e) => updateInformation('fromAddress', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="replyTo">Reply-to Address</Label>
                <Input
                  id="replyTo"
                  value={emailData.information.replyToAddress}
                  onChange={(e) => updateInformation('replyToAddress', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="to">To Address</Label>
                <Input
                  id="to"
                  value={emailData.information.toAddress}
                  onChange={(e) => updateInformation('toAddress', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="body" className="space-y-3 mt-3">
          <Card className="bg-white">
            <CardContent className="space-y-4 pt-3">
              {/* Header with Add Button */}
              <div className="flex items-center justify-between">
                <h3 className="text-[16px] font-semibold">Email content</h3>
                <Popover open={addMenuOpen} onOpenChange={setAddMenuOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="text-[12px] h-8">
                      <Plus className="size-3 mr-1" />
                      Add panel or element
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[340px]" align="end">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-[14px] mb-2">Add content</h4>
                      </div>
                      
                      {/* Panels Group */}
                      <div className="space-y-2">
                        <Label className="text-[12px] text-gray-600">Panels</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            onClick={() => { addPanel('standard'); setAddMenuOpen(false); }}
                            variant="outline"
                            size="sm"
                            className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"
                          >
                            Basic panel
                          </Button>
                          <Button
                            onClick={() => { addPanel('lead-claiming'); setAddMenuOpen(false); }}
                            variant="outline"
                            size="sm"
                            className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"
                          >
                            Lead panel
                          </Button>
                          <Button
                            onClick={() => { addPanel('proposal'); setAddMenuOpen(false); }}
                            variant="outline"
                            size="sm"
                            className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"
                          >
                            Proposal panel
                          </Button>
                        </div>
                      </div>

                      {/* Elements */}
                      <div className="space-y-2">
                        <Label className="text-[12px] text-gray-600">Elements</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            onClick={() => { addContentBlock('h1'); setAddMenuOpen(false); }}
                            variant="outline"
                            size="sm"
                            className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"
                          >
                            <Type className="size-3 mr-1" />H1
                          </Button>
                          <Button
                            onClick={() => { addContentBlock('h2'); setAddMenuOpen(false); }}
                            variant="outline"
                            size="sm"
                            className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"
                          >
                            <Type className="size-3 mr-1" />H2
                          </Button>
                          <Button
                            onClick={() => { addContentBlock('bodyText'); setAddMenuOpen(false); }}
                            variant="outline"
                            size="sm"
                            className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"
                          >
                            <AlignLeft className="size-3 mr-1" />Body
                          </Button>
                          <Button
                            onClick={() => { addContentBlock('bulletList'); setAddMenuOpen(false); }}
                            variant="outline"
                            size="sm"
                            className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"
                          >
                            <List className="size-3 mr-1" />Bullet list
                          </Button>
                          <Button
                            onClick={() => { addContentBlock('numberedList'); setAddMenuOpen(false); }}
                            variant="outline"
                            size="sm"
                            className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"
                          >
                            <ListOrdered className="size-3 mr-1" />Numbered list
                          </Button>
                          <Button
                            onClick={() => { addContentBlock('primaryButton'); setAddMenuOpen(false); }}
                            variant="outline"
                            size="sm"
                            className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"
                          >
                            <MousePointerClick className="size-3 mr-1" />Primary button
                          </Button>
                          <Button
                            onClick={() => { addContentBlock('secondaryButton'); setAddMenuOpen(false); }}
                            variant="outline"
                            size="sm"
                            className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"
                          >
                            <MousePointerClick className="size-3 mr-1" />Secondary button
                          </Button>
                          <Button
                            onClick={() => { addContentBlock('divider'); setAddMenuOpen(false); }}
                            variant="outline"
                            size="sm"
                            className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"
                          >
                            <Minus className="size-3 mr-1" />Divider
                          </Button>
                          <Button
                            onClick={() => { addContentBlock('image'); setAddMenuOpen(false); }}
                            variant="outline"
                            size="sm"
                            className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"
                          >
                            <ImageIcon className="size-3 mr-1" />Image
                          </Button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Unified Body Items - Content Blocks & Panels */}
              {emailData.body.bodyItems.length > 0 && (
                <div className="space-y-3">
                  {emailData.body.bodyItems.map((item, index) => (
                    <DraggableBodyItem
                      key={item.id}
                      id={item.id}
                      index={index}
                      moveItem={moveBodyItem}
                    >
                      {item.itemType === 'content' ? (
                        // Render standalone content block
                        <div className="rounded-[10px] p-3 space-y-2 bg-blue-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {(() => {
                                const Icon = elementTypeIcons[item.data.type];
                                return <Icon className="size-4 text-blue-700" />;
                              })()}
                              <span className="text-[16px] text-blue-700">{elementTypeLabels[item.data.type]}</span>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteBodyItem(item.id)}
                            >
                              <Trash2 className="size-4 text-blue-700" />
                            </Button>
                          </div>
                          
                          {item.data.type !== 'divider' && (
                            <>
                              {item.data.type === 'bulletList' || item.data.type === 'numberedList' ? (
                                <div className="space-y-2">
                                  {(item.data.items || []).map((listItem, idx) => (
                                    <DraggableListItem
                                      key={idx}
                                      id={`${item.id}-item-${idx}`}
                                      index={idx}
                                      elementId={item.id}
                                      moveListItem={moveListItemInContent(item.id)}
                                    >
                                      <Input
                                        value={listItem}
                                        onChange={(e) => updateListItemInContent(item.id, idx, e.target.value)}
                                        className="text-[14px] bg-white flex-1"
                                        placeholder={`List item ${idx + 1}`}
                                      />
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => deleteListItemFromContent(item.id, idx)}
                                        disabled={(item.data.items || []).length <= 1}
                                      >
                                        <Trash2 className="size-4 text-blue-700" />
                                      </Button>
                                    </DraggableListItem>
                                  ))}
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => addListItemToContent(item.id)}
                                    className="w-full text-[12px] h-8"
                                  >
                                    <Plus className="size-3 mr-1" />
                                    Add list item
                                  </Button>
                                </div>
                              ) : item.data.type === 'image' ? (
                                <div className="space-y-2">
                                  <div>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          handleImageUpload(item.id, 0, false, file);
                                        }
                                      }}
                                      className="hidden"
                                      id={`content-image-upload-${item.id}`}
                                    />
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        document.getElementById(`content-image-upload-${item.id}`)?.click();
                                      }}
                                      className="w-full text-[12px] h-8 bg-white"
                                    >
                                      <Upload className="size-3 mr-1" />
                                      {item.data.imageData ? 'Change Image' : 'Upload Image'}
                                    </Button>
                                  </div>
                                  {item.data.imageData && (
                                    <div className="rounded overflow-hidden">
                                      <img src={item.data.imageData} alt={item.data.imageAlt || ''} className="w-full h-auto" />
                                    </div>
                                  )}
                                  <div>
                                    <Label className="text-[12px] text-gray-600">Image Alt Text</Label>
                                    <Input
                                      value={item.data.imageAlt || ''}
                                      onChange={(e) => handleImageAltChange(item.id, 0, false, e.target.value)}
                                      className="text-[14px] bg-white"
                                      placeholder="Image description"
                                    />
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  {item.data.type === 'bodyText' || item.data.type === 'h1' || item.data.type === 'h2' ? (
                                    <RichTextInput
                                      value={item.data.content}
                                      onChange={(content) => updateContentBlock(item.id, 'content', content)}
                                      multiline={true}
                                      rows={2}
                                      className="text-[14px]"
                                      placeholder="Content"
                                    />
                                  ) : (
                                    <Textarea
                                      value={item.data.content}
                                      onChange={(e) => updateContentBlock(item.id, 'content', e.target.value)}
                                      className="text-[14px]"
                                      placeholder="Content"
                                    />
                                  )}
                                </div>
                              )}
                              {(item.data.type === 'primaryButton' || item.data.type === 'secondaryButton') && (
                                <div>
                                  <Textarea
                                    value={item.data.url || ''}
                                    onChange={(e) => updateContentBlock(item.id, 'url', e.target.value)}
                                    className="text-[14px]"
                                    placeholder="Button URL"
                                  />
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      ) : (
                        // Render panel
                        <Collapsible
                          open={openPanels[item.id]}
                          onOpenChange={(open) => setOpenPanels({ ...openPanels, [item.id]: open })}
                        >
                      <Card className="bg-white rounded-[10px]">
                        <CardHeader className={`flex flex-row items-center justify-between space-y-0 ${openPanels[item.id] ? 'rounded-t-[10px]' : 'rounded-[10px]'} px-[24px] pt-[8px] pb-[8px] bg-[#f1f7ff]`}>
                          <CollapsibleTrigger className="flex items-center gap-2 flex-1">
                            <ChevronDown className={`size-4 text-blue-700 transition-transform ${openPanels[item.id] ? '' : '-rotate-90'}`} />
                            <CardTitle className="text-[16px] leading-none text-blue-700">
                              {item.data.type === 'standard' ? 'Basic Panel' : 
                               item.data.type === 'lead-claiming' ? 'Lead Claiming Panel' : 
                               'Proposal Panel'}
                            </CardTitle>
                          </CollapsibleTrigger>
                          <div className="flex gap-1">
                            <button
                              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-gray-100 h-9 w-9"
                              onClick={() => deleteBodyItem(item.id)}
                            >
                              <Trash2 className="size-4 text-gray-600" />
                            </button>
                          </div>
                        </CardHeader>
                        <CollapsibleContent>
                          <CardContent className="space-y-2 pt-2 pb-2 px-2">
                            {/* Standard Panel - Fully customizable elements */}
                            {item.data.type === 'standard' && (
                              <div className="space-y-2">
                                {(item.data.elements || []).map((element, elemIndex) => (
                                  <DraggableElement
                                    key={element.id}
                                    id={element.id}
                                    index={elemIndex}
                                    panelIndex={index}
                                    isAdditional={false}
                                    moveElement={moveElementInPanel(item.id, false)}
                                  >
                                    {renderElementEditor(element, item.id, elemIndex, item.data.elements!.length, false)}
                                  </DraggableElement>
                                ))}
                                <Popover open={panelAddMenuOpen[`${item.id}-standard`]} onOpenChange={(open) => setPanelAddMenuOpen({ ...panelAddMenuOpen, [`${item.id}-standard`]: open })}>
                                  <PopoverTrigger asChild>
                                    <Button variant="outline" size="sm" className="w-full text-[12px] h-8">
                                      <Plus className="size-3 mr-1" />
                                      Add element
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-[340px]" align="end">
                                    <div className="space-y-3">
                                      <h4 className="font-semibold text-[14px]">Add element</h4>
                                      <div className="grid grid-cols-2 gap-2">
                                        <Button onClick={() => { addElement(item.id, 'h1', false); setPanelAddMenuOpen({ ...panelAddMenuOpen, [`${item.id}-standard`]: false }); }} variant="outline" size="sm" className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"><Type className="size-3 mr-1" />H1</Button>
                                        <Button onClick={() => { addElement(item.id, 'h2', false); setPanelAddMenuOpen({ ...panelAddMenuOpen, [`${item.id}-standard`]: false }); }} variant="outline" size="sm" className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"><Type className="size-3 mr-1" />H2</Button>
                                        <Button onClick={() => { addElement(item.id, 'bodyText', false); setPanelAddMenuOpen({ ...panelAddMenuOpen, [`${item.id}-standard`]: false }); }} variant="outline" size="sm" className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"><AlignLeft className="size-3 mr-1" />Body</Button>
                                        <Button onClick={() => { addElement(item.id, 'bulletList', false); setPanelAddMenuOpen({ ...panelAddMenuOpen, [`${item.id}-standard`]: false }); }} variant="outline" size="sm" className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"><List className="size-3 mr-1" />Bullet list</Button>
                                        <Button onClick={() => { addElement(item.id, 'numberedList', false); setPanelAddMenuOpen({ ...panelAddMenuOpen, [`${item.id}-standard`]: false }); }} variant="outline" size="sm" className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"><ListOrdered className="size-3 mr-1" />Numbered list</Button>
                                        <Button onClick={() => { addElement(item.id, 'primaryButton', false); setPanelAddMenuOpen({ ...panelAddMenuOpen, [`${item.id}-standard`]: false }); }} variant="outline" size="sm" className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"><MousePointerClick className="size-3 mr-1" />Primary button</Button>
                                        <Button onClick={() => { addElement(item.id, 'secondaryButton', false); setPanelAddMenuOpen({ ...panelAddMenuOpen, [`${item.id}-standard`]: false }); }} variant="outline" size="sm" className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"><MousePointerClick className="size-3 mr-1" />Secondary button</Button>
                                        <Button onClick={() => { addElement(item.id, 'divider', false); setPanelAddMenuOpen({ ...panelAddMenuOpen, [`${item.id}-standard`]: false }); }} variant="outline" size="sm" className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"><Minus className="size-3 mr-1" />Divider</Button>
                                        <Button onClick={() => { addElement(item.id, 'image', false); setPanelAddMenuOpen({ ...panelAddMenuOpen, [`${item.id}-standard`]: false }); }} variant="outline" size="sm" className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"><ImageIcon className="size-3 mr-1" />Image</Button>
                                      </div>
                                    </div>
                                  </PopoverContent>
                                </Popover>
                              </div>
                            )}

                            {/* Lead Claiming Panel - Structured + Additional */}
                            {item.data.type === 'lead-claiming' && item.data.leadClaimingContent && (
                              <>
                                <div className="space-y-3">
                                  <Label className="text-[14px]">Lead Information</Label>
                                  <div>
                                    <Label className="text-[12px] text-gray-600">Lead Name</Label>
                                    <Input
                                      value={item.data.leadClaimingContent.leadName}
                                      onChange={(e) => updatePanel(item.id, {
                                        leadClaimingContent: { ...item.data.leadClaimingContent!, leadName: e.target.value }
                                      })}
                                      className="text-[14px]"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-[12px] text-gray-600">Lead Address</Label>
                                    <Input
                                      value={item.data.leadClaimingContent.leadAddress}
                                      onChange={(e) => updatePanel(item.id, {
                                        leadClaimingContent: { ...item.data.leadClaimingContent!, leadAddress: e.target.value }
                                      })}
                                      className="text-[14px]"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-[12px] text-gray-600">Note</Label>
                                    <Textarea
                                      value={item.data.leadClaimingContent.note}
                                      onChange={(e) => updatePanel(item.id, {
                                        leadClaimingContent: { ...item.data.leadClaimingContent!, note: e.target.value }
                                      })}
                                      className="text-[14px]"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-[12px] text-gray-600">Contact Name</Label>
                                    <Input
                                      value={item.data.leadClaimingContent.contactName}
                                      onChange={(e) => updatePanel(item.id, {
                                        leadClaimingContent: { ...item.data.leadClaimingContent!, contactName: e.target.value }
                                      })}
                                      className="text-[14px]"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-[12px] text-gray-600">Phone</Label>
                                    <Input
                                      value={item.data.leadClaimingContent.phone}
                                      onChange={(e) => updatePanel(item.id, {
                                        leadClaimingContent: { ...item.data.leadClaimingContent!, phone: e.target.value }
                                      })}
                                      className="text-[14px]"
                                    />
                                  </div>
                                </div>
                                
                                <Separator />
                                
                                <div className="space-y-2">
                                  <Label className="text-[14px]">Additional Elements</Label>
                                  {(item.data.additionalElements || []).map((element, elemIndex) => (
                                    <DraggableElement
                                      key={element.id}
                                      id={element.id}
                                      index={elemIndex}
                                      panelIndex={index}
                                      isAdditional={true}
                                      moveElement={moveElementInPanel(item.id, true)}
                                    >
                                      {renderElementEditor(element, item.id, elemIndex, item.data.additionalElements!.length, true)}
                                    </DraggableElement>
                                  ))}
                                  <Popover open={panelAddMenuOpen[`${item.id}-lead`]} onOpenChange={(open) => setPanelAddMenuOpen({ ...panelAddMenuOpen, [`${item.id}-lead`]: open })}>
                                    <PopoverTrigger asChild>
                                      <Button variant="outline" size="sm" className="w-full text-[12px] h-8">
                                        <Plus className="size-3 mr-1" />
                                        Add element
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[340px]" align="end">
                                        <div className="space-y-3">
                                          <h4 className="font-semibold text-[14px]">Add element</h4>
                                          <div className="grid grid-cols-2 gap-2">
                                            <Button onClick={() => { addElement(item.id, 'h1', true); setPanelAddMenuOpen({ ...panelAddMenuOpen, [`${item.id}-lead`]: false }); }} variant="outline" size="sm" className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"><Type className="size-3 mr-1" />H1</Button>
                                            <Button onClick={() => { addElement(item.id, 'h2', true); setPanelAddMenuOpen({ ...panelAddMenuOpen, [`${item.id}-lead`]: false }); }} variant="outline" size="sm" className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"><Type className="size-3 mr-1" />H2</Button>
                                            <Button onClick={() => { addElement(item.id, 'bodyText', true); setPanelAddMenuOpen({ ...panelAddMenuOpen, [`${item.id}-lead`]: false }); }} variant="outline" size="sm" className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"><AlignLeft className="size-3 mr-1" />Body</Button>
                                            <Button onClick={() => { addElement(item.id, 'bulletList', true); setPanelAddMenuOpen({ ...panelAddMenuOpen, [`${item.id}-lead`]: false }); }} variant="outline" size="sm" className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"><List className="size-3 mr-1" />Bullet list</Button>
                                            <Button onClick={() => { addElement(item.id, 'numberedList', true); setPanelAddMenuOpen({ ...panelAddMenuOpen, [`${item.id}-lead`]: false }); }} variant="outline" size="sm" className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"><ListOrdered className="size-3 mr-1" />Numbered list</Button>
                                            <Button onClick={() => { addElement(item.id, 'primaryButton', true); setPanelAddMenuOpen({ ...panelAddMenuOpen, [`${item.id}-lead`]: false }); }} variant="outline" size="sm" className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"><MousePointerClick className="size-3 mr-1" />Primary button</Button>
                                            <Button onClick={() => { addElement(item.id, 'secondaryButton', true); setPanelAddMenuOpen({ ...panelAddMenuOpen, [`${item.id}-lead`]: false }); }} variant="outline" size="sm" className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"><MousePointerClick className="size-3 mr-1" />Secondary button</Button>
                                            <Button onClick={() => { addElement(item.id, 'divider', true); setPanelAddMenuOpen({ ...panelAddMenuOpen, [`${item.id}-lead`]: false }); }} variant="outline" size="sm" className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"><Minus className="size-3 mr-1" />Divider</Button>
                                            <Button onClick={() => { addElement(item.id, 'image', true); setPanelAddMenuOpen({ ...panelAddMenuOpen, [`${item.id}-lead`]: false }); }} variant="outline" size="sm" className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"><ImageIcon className="size-3 mr-1" />Image</Button>
                                          </div>
                                        </div>
                                      </PopoverContent>
                                    </Popover>
                                </div>
                              </>
                            )}

                            {/* Proposal Panel - Structured + Additional */}
                            {item.data.type === 'proposal' && item.data.proposalContent && (
                              <>
                                <div className="space-y-3">
                                  <Label className="text-[14px]">Proposal Information</Label>
                                  <div>
                                    <Label className="text-[12px] text-gray-600">Commission (%)</Label>
                                    <Input
                                      value={item.data.proposalContent.commission}
                                      onChange={(e) => updatePanel(item.id, {
                                        proposalContent: { ...item.data.proposalContent!, commission: e.target.value }
                                      })}
                                      className="text-[14px]"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-[12px] text-gray-600">Services (comma separated)</Label>
                                    <Input
                                      value={item.data.proposalContent.services.join(', ')}
                                      onChange={(e) => updatePanel(item.id, {
                                        proposalContent: { ...item.data.proposalContent!, services: e.target.value.split(',').map(s => s.trim()) }
                                      })}
                                      className="text-[14px]"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-[12px] text-gray-600">Client Name</Label>
                                    <Input
                                      value={item.data.proposalContent.clientName}
                                      onChange={(e) => updatePanel(item.id, {
                                        proposalContent: { ...item.data.proposalContent!, clientName: e.target.value }
                                      })}
                                      className="text-[14px]"
                                    />
                                  </div>
                                </div>
                              </>
                            )}
                          </CardContent>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                      )}
                </DraggableBodyItem>
              ))}
                </div>
              )}
              
              {/* Add Panel or Element Button */}
              <div className="px-4 pb-3">
                <Popover open={addMenuBottomOpen} onOpenChange={setAddMenuBottomOpen}>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-[12px] h-8"
                    >
                      <Plus className="size-3 mr-1" />
                      Add panel or element
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[340px]" align="center">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-[14px] mb-2">Add content</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            onClick={() => { addContentBlock('h1', 'bottom'); setAddMenuBottomOpen(false); }}
                            variant="outline"
                            size="sm"
                            className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"
                          >
                            <Type className="size-3 mr-1" />
                            H1
                          </Button>
                          <Button
                            onClick={() => { addContentBlock('h2', 'bottom'); setAddMenuBottomOpen(false); }}
                            variant="outline"
                            size="sm"
                            className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"
                          >
                            <Type className="size-3 mr-1" />
                            H2
                          </Button>
                          <Button
                            onClick={() => { addContentBlock('bodyText', 'bottom'); setAddMenuBottomOpen(false); }}
                            variant="outline"
                            size="sm"
                            className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"
                          >
                            <AlignLeft className="size-3 mr-1" />Body
                          </Button>
                          <Button
                            onClick={() => { addContentBlock('bulletList', 'bottom'); setAddMenuBottomOpen(false); }}
                            variant="outline"
                            size="sm"
                            className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"
                          >
                            <List className="size-3 mr-1" />
                            Bullet list
                          </Button>
                          <Button
                            onClick={() => { addContentBlock('numberedList', 'bottom'); setAddMenuBottomOpen(false); }}
                            variant="outline"
                            size="sm"
                            className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"
                          >
                            <ListOrdered className="size-3 mr-1" />
                            Numbered list
                          </Button>
                          <Button
                            onClick={() => { addContentBlock('primaryButton', 'bottom'); setAddMenuBottomOpen(false); }}
                            variant="outline"
                            size="sm"
                            className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"
                          >
                            <MousePointerClick className="size-3 mr-1" />Primary button
                          </Button>
                          <Button
                            onClick={() => { addContentBlock('secondaryButton', 'bottom'); setAddMenuBottomOpen(false); }}
                            variant="outline"
                            size="sm"
                            className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"
                          >
                            <MousePointerClick className="size-3 mr-1" />Secondary button
                          </Button>
                          <Button
                            onClick={() => { addContentBlock('divider', 'bottom'); setAddMenuBottomOpen(false); }}
                            variant="outline"
                            size="sm"
                            className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"
                          >
                            <Minus className="size-3 mr-1" />Divider
                          </Button>
                          <Button
                            onClick={() => { addContentBlock('image', 'bottom'); setAddMenuBottomOpen(false); }}
                            variant="outline"
                            size="sm"
                            className="text-[12px] h-8 bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"
                          >
                            <ImageIcon className="size-3 mr-1" />Image
                          </Button>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="font-semibold text-[14px] mb-2">Add panel</h4>
                        <div className="grid grid-cols-1 gap-2">
                          <Button
                            onClick={() => { addPanel('standard', 'bottom'); setAddMenuBottomOpen(false); }}
                            variant="outline"
                            size="sm"
                            className="text-[12px] h-8 bg-[#f1f7ff] border-blue-400 text-blue-700 hover:bg-blue-100"
                          >
                            Basic Panel
                          </Button>
                          <Button
                            onClick={() => { addPanel('lead-claiming', 'bottom'); setAddMenuBottomOpen(false); }}
                            variant="outline"
                            size="sm"
                            className="text-[12px] h-8 bg-[#f1f7ff] border-blue-400 text-blue-700 hover:bg-blue-100"
                          >
                            Lead Claiming Panel
                          </Button>
                          <Button
                            onClick={() => { addPanel('proposal', 'bottom'); setAddMenuBottomOpen(false); }}
                            variant="outline"
                            size="sm"
                            className="text-[12px] h-8 bg-[#f1f7ff] border-blue-400 text-blue-700 hover:bg-blue-100"
                          >
                            Proposal Panel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 px-[24px] py-[12px]">
              <CardTitle className="text-[16px]">Help Section</CardTitle>
              <Switch
                id="showHelp"
                checked={emailData.body.helpSection.visible}
                onCheckedChange={toggleHelpSection}
              />
            </CardHeader>
            {emailData.body.helpSection.visible && (
              <CardContent className="space-y-4">
                {emailData.body.helpSection.boxes.map((box, index) => (
                  <div key={box.id}>
                    <Label>Help Message</Label>
                    <Textarea
                      value={box.message}
                      onChange={(e) => updateHelpMessage(index, e.target.value)}
                    />
                  </div>
                ))}
              </CardContent>
            )}
          </Card>

          <Card className="bg-white">
            <CardHeader className="pb-1 pt-3 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-[16px]">Signature</CardTitle>
              <Switch
                id="showSignature"
                checked={emailData.body.signatureSection.visible}
                onCheckedChange={toggleSignatureSection}
              />
            </CardHeader>
            {emailData.body.signatureSection.visible && (
              <CardContent className="space-y-4 pt-3">
                <div>
                  <Label htmlFor="sigSenderName">Sender Name</Label>
                  <Input
                    id="sigSenderName"
                    value={emailData.body.signatureSection.senderName}
                    onChange={(e) => updateSignature('senderName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="sigSenderTitle">Sender Title</Label>
                  <Input
                    id="sigSenderTitle"
                    value={emailData.body.signatureSection.senderTitle}
                    onChange={(e) => updateSignature('senderTitle', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="sigEmail">Email</Label>
                  <Input
                    id="sigEmail"
                    value={emailData.body.signatureSection.email}
                    onChange={(e) => updateSignature('email', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="sigPhone">Phone</Label>
                  <Input
                    id="sigPhone"
                    value={emailData.body.signatureSection.phone}
                    onChange={(e) => updateSignature('phone', e.target.value)}
                  />
                </div>
              </CardContent>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="footer" className="space-y-3 mt-3">
          <Card className="bg-white">
            <CardHeader className="pb-2 pt-3 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-[16px]">Address</CardTitle>
              <Switch
                checked={emailData.footer.address.visible}
                onCheckedChange={(visible) => updateFooter('address', { ...emailData.footer.address, visible })}
              />
            </CardHeader>
            <CardContent className="pt-2">
              {emailData.footer.address.visible && (
                <Input
                  value={emailData.footer.address.content}
                  onChange={(e) => updateFooter('address', { ...emailData.footer.address, content: e.target.value })}
                />
              )}
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="pb-3 pt-4">
              <CardTitle className="text-[16px]">Footer Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              {/* Terms of Use */}
              <div className="space-y-2 p-3 rounded border border-gray-200">
                <div className="flex items-center justify-between">
                  <Label className="text-[14px]">Terms of Use</Label>
                  <Switch
                    checked={emailData.footer.links.termsOfUse.visible}
                    onCheckedChange={(visible) => updateFooter('links', {
                      ...emailData.footer.links,
                      termsOfUse: { ...emailData.footer.links.termsOfUse, visible }
                    })}
                  />
                </div>
                {emailData.footer.links.termsOfUse.visible && (
                  <>
                    <Input
                      placeholder="Link Label"
                      value={emailData.footer.links.termsOfUse.label}
                      onChange={(e) => updateFooter('links', {
                        ...emailData.footer.links,
                        termsOfUse: { ...emailData.footer.links.termsOfUse, label: e.target.value }
                      })}
                    />
                    <Input
                      placeholder="URL"
                      value={emailData.footer.links.termsOfUse.url}
                      onChange={(e) => updateFooter('links', {
                        ...emailData.footer.links,
                        termsOfUse: { ...emailData.footer.links.termsOfUse, url: e.target.value }
                      })}
                    />
                  </>
                )}
              </div>

              {/* Privacy Policy */}
              <div className="space-y-2 p-3 rounded border border-gray-200">
                <div className="flex items-center justify-between">
                  <Label className="text-[14px]">Privacy Policy</Label>
                  <Switch
                    checked={emailData.footer.links.privacyPolicy.visible}
                    onCheckedChange={(visible) => updateFooter('links', {
                      ...emailData.footer.links,
                      privacyPolicy: { ...emailData.footer.links.privacyPolicy, visible }
                    })}
                  />
                </div>
                {emailData.footer.links.privacyPolicy.visible && (
                  <>
                    <Input
                      placeholder="Link Label"
                      value={emailData.footer.links.privacyPolicy.label}
                      onChange={(e) => updateFooter('links', {
                        ...emailData.footer.links,
                        privacyPolicy: { ...emailData.footer.links.privacyPolicy, label: e.target.value }
                      })}
                    />
                    <Input
                      placeholder="URL"
                      value={emailData.footer.links.privacyPolicy.url}
                      onChange={(e) => updateFooter('links', {
                        ...emailData.footer.links,
                        privacyPolicy: { ...emailData.footer.links.privacyPolicy, url: e.target.value }
                      })}
                    />
                  </>
                )}
              </div>

              {/* Share Story */}
              <div className="space-y-2 p-3 rounded border border-gray-200">
                <div className="flex items-center justify-between">
                  <Label className="text-[14px]">Share Your Success Story</Label>
                  <Switch
                    checked={emailData.footer.links.shareStory.visible}
                    onCheckedChange={(visible) => updateFooter('links', {
                      ...emailData.footer.links,
                      shareStory: { ...emailData.footer.links.shareStory, visible }
                    })}
                  />
                </div>
                {emailData.footer.links.shareStory.visible && (
                  <>
                    <Input
                      placeholder="Link Label"
                      value={emailData.footer.links.shareStory.label}
                      onChange={(e) => updateFooter('links', {
                        ...emailData.footer.links,
                        shareStory: { ...emailData.footer.links.shareStory, label: e.target.value }
                      })}
                    />
                    <Input
                      placeholder="URL"
                      value={emailData.footer.links.shareStory.url}
                      onChange={(e) => updateFooter('links', {
                        ...emailData.footer.links,
                        shareStory: { ...emailData.footer.links.shareStory, url: e.target.value }
                      })}
                    />
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="pb-2 pt-3 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-[16px]">Disclaimer</CardTitle>
              <Switch
                checked={emailData.footer.disclaimer.visible}
                onCheckedChange={(visible) => updateFooter('disclaimer', { ...emailData.footer.disclaimer, visible })}
              />
            </CardHeader>
            <CardContent className="pt-2">
              {emailData.footer.disclaimer.visible && (
                <Textarea
                  value={emailData.footer.disclaimer.content}
                  onChange={(e) => updateFooter('disclaimer', { ...emailData.footer.disclaimer, content: e.target.value })}
                  rows={3}
                />
              )}
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="pb-2 pt-3 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-[16px]">Copyright</CardTitle>
              <Switch
                checked={emailData.footer.copyright.visible}
                onCheckedChange={(visible) => updateFooter('copyright', { ...emailData.footer.copyright, visible })}
              />
            </CardHeader>
            <CardContent className="pt-2">
              {emailData.footer.copyright.visible && (
                <Textarea
                  value={emailData.footer.copyright.content}
                  onChange={(e) => updateFooter('copyright', { ...emailData.footer.copyright, content: e.target.value })}
                  rows={2}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}