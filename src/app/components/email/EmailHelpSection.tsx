import { EmailData } from '../../types/email';
import svgPaths from "../../imports/svg-fcpzfkbss9";

function SpotSupport() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="SpotSupport">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="SpotSupport">
          <path d={svgPaths.p3f13780} fill="var(--fill-0, white)" id="Rectangle 8126" />
          <path clipRule="evenodd" d={svgPaths.p3c75a480} fill="var(--fill-0, #620F12)" fillRule="evenodd" id="Rectangle 8301 (Stroke)" />
          <path d={svgPaths.p25fae540} fill="var(--fill-0, #D92228)" id="Ellipse 4818" />
          <path d={svgPaths.p1309bba0} fill="var(--fill-0, white)" id="Vector 654" />
          <path clipRule="evenodd" d={svgPaths.p160b0a00} fill="var(--fill-0, #620F12)" fillRule="evenodd" id="Vector 654 (Stroke)" />
          <path d={svgPaths.p39568fb0} fill="var(--fill-0, white)" id="Subtract" />
          <path clipRule="evenodd" d={svgPaths.pc8ba00} fill="var(--fill-0, #620F12)" fillRule="evenodd" id="Union" />
          <path clipRule="evenodd" d={svgPaths.p1abdf100} fill="var(--fill-0, white)" fillRule="evenodd" id="Union_2" />
          <path clipRule="evenodd" d={svgPaths.p335fa480} fill="var(--fill-0, #620F12)" fillRule="evenodd" id="Union (Stroke)" />
          <g id="Union_3">
            <path d={svgPaths.p4999f00} fill="var(--fill-0, #620F12)" />
            <path d={svgPaths.pbcbdaf0} fill="var(--fill-0, #620F12)" />
            <path d={svgPaths.p7b23900} fill="var(--fill-0, #620F12)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

interface EmailHelpSectionProps {
  data: EmailData['body']['helpSection'];
  isDark?: boolean;
}

export function EmailHelpSection({ data, isDark = false }: EmailHelpSectionProps) {
  if (!data.visible || !data.boxes.length) return null;

  const textColor = isDark ? 'text-white' : 'text-[#1a1816]';
  const bgColor = isDark ? 'bg-[#1a1816]' : 'bg-white';
  const borderColor = isDark ? 'border-[#726a60]' : 'border-[#d3cfca]';

  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Help Section">
      <p className={`font-helvetica font-bold leading-[32px] not-italic relative shrink-0 text-[24px] tracking-[0.48px] w-full ${textColor}`}>Need help?</p>
      {data.boxes.map((box) => (
        <div key={box.id} className="min-h-[74px] relative rounded-[8px] shrink-0 w-full" data-name="Help box">
          <div className={`${bgColor} ${borderColor} border border-solid absolute inset-0 rounded-[8px]`} />
          <div className="size-full">
            <div className="box-border content-stretch flex flex-col gap-[12px] px-[32px] py-[12px] relative w-full">
              <div className="flex gap-[12px] items-center">
                <SpotSupport />
                <p className={`basis-0 font-helvetica font-normal grow leading-[1.45] min-h-px min-w-px not-italic relative shrink-0 text-[16px] ${textColor}`}>{box.message}</p>
              </div>
              {box.imageData && (
                <img 
                  src={box.imageData} 
                  alt={box.imageAlt || 'Help section image'} 
                  className="w-full h-auto rounded-[4px]"
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}