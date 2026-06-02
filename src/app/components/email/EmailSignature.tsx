import { EmailData } from '../../types/email';
import svgPaths from "../../imports/svg-fcpzfkbss9";

function IconPhone() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="IconPhone">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="IconPhone">
          <g id="Vector">
            <path d={svgPaths.p10b9fb80} fill="var(--fill-0, #D92228)" />
            <path clipRule="evenodd" d={svgPaths.p36288480} fill="var(--fill-0, #D92228)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function IconEmail() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="IconEmail">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="IconEmail">
          <g id="Vector">
            <path d={svgPaths.p971d5f0} fill="var(--fill-0, #D92228)" />
            <path clipRule="evenodd" d={svgPaths.p29435a80} fill="var(--fill-0, #D92228)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

interface EmailSignatureProps {
  data: EmailData['body']['signatureSection'];
  isDark?: boolean;
}

export function EmailSignature({ data, isDark = false }: EmailSignatureProps) {
  const textColor = isDark ? 'text-white' : 'text-[#1a1816]';
  
  return (
    <div className="relative shrink-0 w-full" data-name="Realtor signature">
      <div aria-hidden="true" className="absolute border-[#d92228] border-[0px_0px_0px_5px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start px-[32px] py-[8px] relative w-full">
          <p className={`font-helvetica font-bold leading-[32px] not-italic relative shrink-0 text-[24px] tracking-[0.6px] w-full ${textColor}`}>{data.senderName}</p>
          <p className={`font-helvetica font-bold leading-[1.43] not-italic relative shrink-0 text-[16px] w-full ${textColor}`}>{data.senderTitle}</p>
          <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
            <IconPhone />
            <p className={`font-helvetica font-normal leading-[1.43] not-italic relative shrink-0 text-[16px] text-nowrap whitespace-pre ${textColor}`}>{data.email}</p>
          </div>
          <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
            <IconEmail />
            <p className={`font-helvetica font-normal leading-[1.43] not-italic relative shrink-0 text-[16px] text-nowrap whitespace-pre ${textColor}`}>{data.phone}</p>
          </div>
          <p className={`font-helvetica font-normal leading-[1.43] not-italic relative shrink-0 text-[16px] w-full ${textColor}`}>Move Sales, Inc., operator of Realtor.com©</p>
        </div>
      </div>
    </div>
  );
}