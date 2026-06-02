import { EmailData } from '../../types/email';
import svgPaths from "../../imports/svg-fcpzfkbss9";
import imgHeaderLogo from "figma:asset/a75d8cb7e64c371ad2da470ca1e25efe38774c4c.png";

// Helper function to render text with superscript ® symbols
function renderWithSuperscript(text: string) {
  const parts = text.split('®');
  return parts.map((part, index) => (
    <span key={index}>
      {part}
      {index < parts.length - 1 && <sup>®</sup>}
    </span>
  ));
}

function Rdc() {
  return (
    <div className="absolute h-[21.943px] left-1/2 top-[8.52px] translate-x-[-50%] w-[160px]" data-name="RDC">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 160 22">
        <g id="RDC">
          <g id="Logo">
            <path d={svgPaths.p30ba3c00} fill="var(--fill-0, white)" />
            <path clipRule="evenodd" d={svgPaths.p2bb8400} fill="var(--fill-0, white)" fillRule="evenodd" />
            <path d={svgPaths.p3dc70f80} fill="var(--fill-0, white)" />
            <path d={svgPaths.p13c64d80} fill="var(--fill-0, white)" />
            <path d={svgPaths.p30f30e00} fill="var(--fill-0, white)" />
            <path clipRule="evenodd" d={svgPaths.p131f1800} fill="var(--fill-0, white)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p12bbdf80} fill="var(--fill-0, white)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p18042c80} fill="var(--fill-0, white)" fillRule="evenodd" />
            <path d={svgPaths.pb30df00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p22082f70} fill="var(--fill-0, white)" />
            <path d={svgPaths.p21a5ef80} fill="var(--fill-0, white)" />
            <path clipRule="evenodd" d={svgPaths.p3e34d400} fill="var(--fill-0, white)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p282c6c80} fill="var(--fill-0, white)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p2f63800} fill="var(--fill-0, white)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function FooterLogo() {
  return (
    <div className="bg-[#1a1816] h-[60px] relative rounded-[10px] shrink-0 w-[242px]" data-name="Footer Logo">
      <Rdc />
      <p className="absolute font-helvetica font-bold leading-[13.272px] left-[calc(50%+0.5px)] not-italic text-[#231f20] text-[12.253px] text-center text-nowrap top-[37.48px] tracking-[-0.1915px] translate-x-[-50%] whitespace-pre">
        <span className="tracking-[-0.0558px]"> </span>
        <span className="text-white">#1 site real estate professionals trust</span>
      </p>
    </div>
  );
}

interface EmailFooterProps {
  data: EmailData['footer'];
  isDark?: boolean;
}

export function EmailFooter({ data, isDark = false }: EmailFooterProps) {
  const visibleLinks = [
    ...(data.links.termsOfUse.visible ? [{ label: data.links.termsOfUse.label, url: data.links.termsOfUse.url }] : []),
    ...(data.links.privacyPolicy.visible ? [{ label: data.links.privacyPolicy.label, url: data.links.privacyPolicy.url }] : []),
    ...(data.links.shareStory.visible ? [{ label: data.links.shareStory.label, url: data.links.shareStory.url }] : []),
    ...data.links.customLinks.filter(link => link.visible).map(link => ({ label: link.label, url: link.url })),
  ];

  return (
    <div className="bg-[#1a1816] box-border content-stretch flex flex-col gap-[14px] items-center justify-center overflow-clip px-[16px] pt-[32px] pb-[32px] relative shrink-0 w-full" data-name="Footer">
      <FooterLogo />
      {data.address.visible && (
        <p className="font-helvetica font-normal leading-[1.4] min-w-full not-italic relative shrink-0 text-[12px] text-center text-white w-[min-content]">{data.address.content}</p>
      )}
      {visibleLinks.length > 0 && (
        <p className="font-helvetica font-normal leading-[1.4] min-w-full not-italic relative shrink-0 text-[12px] text-center text-white w-[min-content] whitespace-pre-wrap">
          {visibleLinks.map((link, index) => (
            <span key={index}>
              <a href={link.url} className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline">{link.label}</a>
              {index < visibleLinks.length - 1 && <span>   |   </span>}
            </span>
          ))}
        </p>
      )}
      {data.disclaimer.visible && (
        <p className="font-helvetica font-normal leading-[1.4] min-w-full not-italic relative shrink-0 text-[12px] text-center text-white w-[min-content]">
          {data.disclaimer.content}
        </p>
      )}
      {data.copyright.visible && (
        <p className="font-helvetica font-normal leading-[1.4] max-w-[540px] min-w-full not-italic relative shrink-0 text-[12px] text-center text-white w-[min-content] mb-[18px]">
          {renderWithSuperscript(data.copyright.content)}
        </p>
      )}
    </div>
  );
}

function LogoHeader() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-center relative shrink-0 w-full" data-name="Logo header">
      <div className="h-[74px] relative rounded-[10px] shrink-0 w-[321px]" data-name="Header logo">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[10px]">
          <div className="absolute bg-white inset-0 rounded-[10px]" />
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[10px] size-full" src={imgHeaderLogo} />
        </div>
      </div>
    </div>
  );
}

export { LogoHeader };