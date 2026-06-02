import { EmailData, ViewportMode, ThemeMode } from '../types/email';
import { EmailInformation } from './email/EmailInformation';
import { EmailPanel } from './email/EmailPanels';
import { EmailHelpSection } from './email/EmailHelpSection';
import { EmailSignature } from './email/EmailSignature';
import { EmailFooter, LogoHeader } from './email/EmailFooter';
import { EmailContentBlock } from './email/EmailContentBlock';
import { Monitor, Tablet, Smartphone, Sun, Moon, Download } from 'lucide-react';
import { Button } from './ui/button';
import { useRef } from 'react';

interface EmailPreviewProps {
  emailData: EmailData;
  viewportMode: ViewportMode;
  themeMode: ThemeMode;
  onViewportChange: (mode: ViewportMode) => void;
  onThemeChange: (mode: ThemeMode) => void;
  showInformation: boolean;
}

export function EmailPreview({
  emailData,
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

    const height = emailRef.current.scrollHeight;
    const width = emailRef.current.scrollWidth;

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
              body { margin: 0; }
              @page { size: ${width}px ${height}px; margin: 0; }
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
          <Button
            size="sm"
            onClick={exportPDF}
          >
            <Download className="size-4 mr-2" />
            Export PDF
          </Button>
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