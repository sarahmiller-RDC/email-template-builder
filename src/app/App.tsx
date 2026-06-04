import { useState } from 'react';
import { EmailEditor } from './components/EmailEditor';
import { EmailPreview } from './components/EmailPreview';
import { EmailData, ViewportMode, ThemeMode } from './types/email';
import { defaultEmailData } from './lib/defaultEmailData';
import { Switch } from './components/ui/switch';
import { Label } from './components/ui/label';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function App() {
  const [emailData, setEmailData] = useState<EmailData>(defaultEmailData);
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [showInformation, setShowInformation] = useState(true);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        {/* Left Panel - Editor */}
        <div className="w-[550px] flex-shrink-0 border-r-2 border-gray-300">
          <EmailEditor emailData={emailData} onEmailDataChange={setEmailData} showInformation={showInformation} onShowInformationChange={setShowInformation} />
        </div>

        {/* Right Panel - Preview */}
        <div className="flex-1 flex flex-col">
          <div className="border-b bg-white p-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                id="show-info"
                checked={showInformation}
                onCheckedChange={setShowInformation}
              />
              <Label htmlFor="show-info">Show Details Section</Label>
            </div>
          </div>
          <EmailPreview
            emailData={emailData}
            viewportMode={viewportMode}
            themeMode={themeMode}
            onViewportChange={setViewportMode}
            onThemeChange={setThemeMode}
            showInformation={showInformation}
          />
        </div>
      </div>
    </DndProvider>
  );
}