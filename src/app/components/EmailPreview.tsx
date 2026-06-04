import { EmailData, ViewportMode, ThemeMode } from '../types/email';
import { EmailInformation } from './email/EmailInformation';
import { EmailPanel } from './email/EmailPanels';
import { EmailHelpSection } from './email/EmailHelpSection';
import { EmailSignature } from './email/EmailSignature';
import { EmailFooter, LogoHeader } from './email/EmailFooter';
import { EmailContentBlock } from './email/EmailContentBlock';
import { Monitor, Tablet, Smartphone, Sun, Moon, ChevronDown, FileDown, FileUp, FileJson } from 'lucide-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useRef } from 'react';

interface EmailPreviewProps {
  emailData: EmailData;
  onEmailDataChange: (data: EmailData) => void;
  viewportMode: ViewportMode;
  themeMode: ThemeMode;
  onViewportChange: (mode: ViewportMode) => void;
  onThemeChange: (mode: ThemeMode) => void;
  showInformation: boolean;
}

export function EmailPreview({
  emailData,
  onEmailDataChange,
  viewportMode,
  themeMode,
  onViewportChange,
  onThemeChange,
  showInformation,
}: EmailPreviewProps) {
  const emailRef = useRef<HTMLDivElement>(null);

  const viewportWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  };

  const isDark = themeMode === 'dark';

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(emailData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${emailData.information.emailName || 'email'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const exportPDF = () => {
    if (!emailRef.current) return;

    const emailHTML = emailRef.current.outerHTML;

    const styles = Array.from(document.styleSheets)
      .map(sheet => {
        try {
          return Array.from(sheet.cssRules).map(rule => rule.cssText).join('\n');
        } catch {
          return '';
        }
      })
      .join('\n');

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const rect = emailRef.current.getBoundingClientRect();
    const height = rect.height;
    const width = rect.width;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Email Export</title>
          <style>${styles}</style>
          <style>
            * { box-sizing: border-box; }
            body { margin: 0; padding: 0; background: ${isDark ? '#1a1816' : '#ffffff'}; }
            @media print {
              html, body { margin: 0; padding: 0; overflow: hidden; }
              @page { size: ${width}px ${Math.ceil(height * 1.02)}px; margin: 0; }
              * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            }
          </style>
        </head>
        <body>
          ${emailHTML}
          <script>
            window.onload = () => { window.print(); window.onafterprint = () => window.close(); }
          <\/script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Controls */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex gap-2">
          <Button
            variant={viewportMode === 'desktop' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewportChange('desktop')}
            className={viewportMode !== 'desktop' ? 'border-2' : ''}
          >
            <Monitor className="size-4 mr-2" />
            Desktop
          </Button>
          <Button
            variant={viewportMode === 'tablet' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewportChange('tablet')}
            className={viewportMode !== 'tablet' ? 'border-2' : ''}
          >
            <Tablet className="size-4 mr-2" />
            Tablet
          </Button>
          <Button
            variant={viewportMode === 'mobile' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewportChange('mobile')}
            className={viewportMode !== 'mobile' ? 'border-2' : ''}
          >
            <Smartphone className="size-4 mr-2" />
            Mobile
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            variant={themeMode === 'light' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onThemeChange('light')}
            className={themeMode !== 'light' ? 'border-2' : ''}
          >
            <Sun className="size-4 mr-2" />
            Light
          </Button>
          <Button
            variant={themeMode === 'dark' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onThemeChange('dark')}
            className={themeMode !== 'dark' ? 'border-2' : ''}
          >
            <Moon className="size-4 mr-2" />
            Dark
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm">
                Import / Export <ChevronDown className="size-3.5 ml-1.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Export</DropdownMenuLabel>
              <DropdownMenuItem onClick={exportPDF}>
                <FileDown className="size-4 mr-2" /> Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportJSON}>
                <FileJson className="size-4 mr-2" /> Export as JSON
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Import</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => document.getElementById('import-json-input')?.click()}>
                <FileUp className="size-4 mr-2" /> Import JSON
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <input id="import-json-input" type="file" accept=".json" className="hidden" onChange={importJSON} />
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 overflow-auto bg-gray-100">
        <div className="mx-auto pb-8 transition-all" style={{ maxWidth: viewportWidths[viewportMode] }}>
          <div ref={emailRef} className={`${isDark ? 'bg-[#1a1816]' : 'bg-white'} relative`} data-name="Standard Template">
            {showInformation && emailData.information.visible && <EmailInformation data={emailData.information} isDark={isDark} />}
            <div className={`content-stretch flex flex-col items-center relative w-full ${isDark ? 'bg-[#393838]' : ''}`}>
              {/* Divider between information and email */}
              <div className={`w-full h-[1px] mt-8 ${isDark ? 'bg-[#4a4a4a]' : 'bg-gray-300'}`} />
              <div className="content-stretch flex flex-col gap-[40px] items-center relative shrink-0 w-full" data-name="Email">
                <div className="box-border content-stretch flex flex-col gap-[37px] items-center p-[24px] relative shrink-0 w-full max-w-[648px]" data-name="Email container">
                  <LogoHeader />
                  <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Email body">
                    {emailData.body.bodyItems.map((item) => {
                      if (item.itemType === 'content') {
                        return <EmailContentBlock key={item.id} block={item.data} isDark={isDark} />;
                      } else {
                        return <EmailPanel key={item.id} panel={item.data} isDark={isDark} />;
                      }
                    })}
                    
                    <EmailHelpSection data={emailData.body.helpSection} isDark={isDark} />
                    {emailData.body.signatureSection.visible && (
                      <EmailSignature data={emailData.body.signatureSection} isDark={isDark} />
                    )}
                  </div>
                </div>
                
                <EmailFooter data={emailData.footer} isDark={isDark} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}