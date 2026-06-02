import { PanelConfig, ContentElement } from '../../types/email';
import svgPaths from "../../imports/svg-fcpzfkbss9";

function PrimaryButton({ text, url }: { text: string; url?: string }) {
  return (
    <a href={url || '#'} className="bg-[#d92228] relative rounded-[40px] shrink-0 w-full no-underline" data-name="Primary button">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center justify-center p-[16px] relative w-full">
          <p className="font-helvetica font-bold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre" dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      </div>
    </a>
  );
}

function SecondaryButton({ text, url, isDark = false }: { text: string; url?: string; isDark?: boolean }) {
  const bgColor = isDark ? 'bg-[#393838]' : 'bg-white';

  return (
    <a href={url || '#'} className={`${bgColor} relative rounded-[40px] shrink-0 w-full no-underline`} data-name="Secondary button">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center justify-center p-[16px] relative w-full">
          <p className="font-helvetica font-bold leading-[24px] not-italic relative shrink-0 text-[#d92228] text-[16px] text-nowrap whitespace-pre" dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d92228] border-solid inset-0 pointer-events-none rounded-[40px]" />
    </a>
  );
}

function Divider({ isDark = false }: { isDark?: boolean }) {
  const bgColor = isDark ? 'bg-[#726a60]' : 'bg-[#d3cfca]';
  
  return (
    <div className={`${bgColor} h-px relative shrink-0 w-full`} />
  );
}

function ContentElementRenderer({ element, isDark = false }: { element: ContentElement; isDark?: boolean }) {
  const textColor = isDark ? 'text-white' : 'text-[#1a1816]';
  
  switch (element.type) {
    case 'h1':
      return (
        <p className={`font-helvetica font-bold leading-[40px] not-italic relative shrink-0 text-[32px] w-full ${textColor}`} dangerouslySetInnerHTML={{ __html: element.content }} />
      );
    case 'h2':
      return (
        <p className={`font-helvetica font-bold leading-[32px] not-italic relative shrink-0 text-[24px] tracking-[0.48px] w-full ${textColor}`} dangerouslySetInnerHTML={{ __html: element.content }} />
      );
    case 'heading':
      return (
        <p className={`font-helvetica font-bold leading-[32px] not-italic relative shrink-0 text-[24px] tracking-[0.48px] w-full ${textColor}`} dangerouslySetInnerHTML={{ __html: element.content }} />
      );
    case 'boldedText':
      return (
        <p className={`font-helvetica font-bold leading-[24px] not-italic relative shrink-0 text-[16px] w-full ${textColor}`} dangerouslySetInnerHTML={{ __html: element.content }} />
      );
    case 'bodyText':
      return (
        <p className={`font-helvetica font-normal leading-[24px] not-italic relative shrink-0 text-[16px] w-full ${textColor}`} dangerouslySetInnerHTML={{ __html: element.content }} />
      );
    case 'bulletList':
      return (
        <ul className={`font-helvetica font-normal leading-[24px] relative shrink-0 text-[16px] w-full list-disc pl-6 ${textColor}`}>
          {element.items?.map((item, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      );
    case 'numberedList':
      return (
        <ol className={`font-helvetica font-normal leading-[24px] relative shrink-0 text-[16px] w-full list-decimal pl-6 ${textColor}`}>
          {element.items?.map((item, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ol>
      );
    case 'image':
      if (!element.imageData) {
        return (
          <div className={`w-full p-8 text-center border-2 border-dashed rounded-lg ${isDark ? 'border-gray-600 text-gray-400' : 'border-gray-300 text-gray-500'}`}>
            <p className="font-helvetica text-[14px]">No image uploaded</p>
          </div>
        );
      }
      return (
        <img
          src={element.imageData}
          alt={element.imageAlt || 'Uploaded image'}
          className="w-full h-auto"
        />
      );
    case 'primaryButton':
      return <PrimaryButton text={element.content} url={element.url} />;
    case 'secondaryButton':
      return <SecondaryButton text={element.content} url={element.url} isDark={isDark} />;
    case 'divider':
      return <Divider isDark={isDark} />;
    default:
      return null;
  }
}

function SpotLeadClaiming() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SpotLeadClaiming">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_378)" id="SpotLeadClaiming">
          <circle cx="10" cy="10" fill="var(--fill-0, white)" id="Ellipse 4821" r="9.16667" />
          <path d={svgPaths.p24502f80} fill="var(--fill-0, #D92228)" id="Ellipse 4818" />
          <path d={svgPaths.p29722600} fill="var(--fill-0, #D92228)" id="Ellipse 4861" />
          <path clipRule="evenodd" d={svgPaths.p128fbe00} fill="var(--fill-0, #D92228)" fillRule="evenodd" id="Ellipse 4861 (Stroke)" />
          <path clipRule="evenodd" d={svgPaths.p2848ba00} fill="var(--fill-0, #D92228)" fillRule="evenodd" id="Vector (Stroke)" />
          <path clipRule="evenodd" d={svgPaths.p1d34cef0} fill="var(--fill-0, #620F12)" fillRule="evenodd" id="Ellipse 4820 (Stroke)" />
        </g>
        <defs>
          <clipPath id="clip0_1_378">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function StandardPanel({ config, isDark = false }: { config: PanelConfig; isDark?: boolean }) {
  const elements = config.elements || [];
  const borderColor = isDark ? 'border-[#726a60]' : 'border-[#d3cfca]';
  
  return (
    <div className="relative rounded-[16px] shrink-0 w-full" data-name="Panel">
      <div aria-hidden="true" className={`absolute border ${borderColor} border-solid inset-0 pointer-events-none rounded-[16px]`} />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[32px] relative w-full">
          {elements.map((element) => (
            <ContentElementRenderer key={element.id} element={element} isDark={isDark} />
          ))}
        </div>
      </div>
    </div>
  );
}

function LeadClaimingPanel({ config, isDark = false }: { config: PanelConfig; isDark?: boolean }) {
  const content = config.leadClaimingContent!;
  const additionalElements = config.additionalElements || [];
  const borderColor = isDark ? 'border-[#726a60]' : 'border-[#d3cfca]';
  const textColor = isDark ? 'text-white' : 'text-[#1a1816]';
  const infoBgColor = isDark ? 'bg-[#2d2b2a]' : 'bg-[#f2f0ef]';
  
  return (
    <div className="relative rounded-[16px] shrink-0 w-full" data-name="Panel: Lead claiming">
      <div aria-hidden="true" className={`absolute border ${borderColor} border-solid inset-0 pointer-events-none rounded-[16px]`} />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[32px] relative w-full">
          <div className="content-stretch flex flex-col gap-[2px] items-center relative shrink-0 w-full">
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
              <SpotLeadClaiming />
              <p className={`font-helvetica font-bold leading-[32px] not-italic relative shrink-0 text-[24px] text-nowrap tracking-[0.48px] whitespace-pre ${textColor}`}>{content.leadName}</p>
            </div>
            <p className={`font-helvetica font-normal leading-[24px] not-italic relative shrink-0 text-[16px] w-full ${textColor}`}>{content.leadAddress}</p>
          </div>
          
          {content.note && (
            <div className="content-stretch flex flex-col gap-[2px] items-center relative shrink-0 w-full">
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
                <p className={`basis-0 font-helvetica font-bold grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[16px] ${textColor}`}>Note from client:</p>
              </div>
              <p className={`font-helvetica italic leading-[24px] relative shrink-0 text-[16px] w-full ${textColor}`}>{content.note}</p>
            </div>
          )}
          
          <PrimaryButton text="Claim lead" />
          
          <div className={`${infoBgColor} relative rounded-[16px] shrink-0 w-full`}>
            <div className="flex flex-col items-center justify-center size-full">
              <div className={`box-border content-stretch flex flex-col font-helvetica font-normal gap-[12px] items-center justify-center leading-[0] not-italic p-[24px] relative w-full ${textColor}`}>
                <p className="leading-[1.4] relative shrink-0 text-[16px] w-full">
                  <span>You can also contact </span>
                  <span className="font-bold not-italic">{content.contactName}</span>
                  <span> directly by calling </span>
                  <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-bold not-italic underline">{content.phone}</span>
                  <span> with PIN </span>
                  <span className="font-bold not-italic">2353</span>
                  <span> to receive a call from us to get connected with the client.</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Render additional custom elements */}
          {additionalElements.map((element) => (
            <ContentElementRenderer key={element.id} element={element} isDark={isDark} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProposalPanel({ config, isDark = false }: { config: PanelConfig; isDark?: boolean }) {
  const content = config.proposalContent!;
  const additionalElements = config.additionalElements || [];
  const borderColor = isDark ? 'border-[#726a60]' : 'border-[#d3cfca]';
  const textColor = isDark ? 'text-white' : 'text-[#1a1816]';
  
  return (
    <div className="relative rounded-[16px] shrink-0 w-full" data-name="Panel: Proposal">
      <div aria-hidden="true" className={`absolute border ${borderColor} border-solid inset-0 pointer-events-none rounded-[16px]`} />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[32px] relative w-full">
          <div className={`content-stretch flex flex-col gap-[12px] items-center not-italic relative shrink-0 w-full ${textColor}`}>
            <p className="font-helvetica font-bold leading-[32px] relative shrink-0 text-[24px] tracking-[0.48px] w-full">Proposal details</p>
            <div className="font-helvetica font-normal leading-[1.4] relative shrink-0 text-[0px] text-[16px] w-full">
              <p className="mb-0">Listing commission: {content.commission}%</p>
              <p>Included services: {content.services.join(', ')}</p>
            </div>
          </div>
          <SecondaryButton text="View proposal" isDark={isDark} />
          <p className={`font-helvetica font-normal leading-[1.4] not-italic relative shrink-0 text-[16px] w-full ${textColor}`}>
            Before calling, take a moment to review your proposal, as {content.clientName} may not have reviewed it yet.
          </p>
          
          {/* Render additional custom elements */}
          {additionalElements.map((element) => (
            <ContentElementRenderer key={element.id} element={element} isDark={isDark} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface EmailPanelProps {
  panel: PanelConfig;
  isDark?: boolean;
}

export function EmailPanel({ panel, isDark = false }: EmailPanelProps) {
  switch (panel.type) {
    case 'standard':
      return <StandardPanel config={panel} isDark={isDark} />;
    case 'lead-claiming':
      return <LeadClaimingPanel config={panel} isDark={isDark} />;
    case 'proposal':
      return <ProposalPanel config={panel} isDark={isDark} />;
    default:
      return null;
  }
}