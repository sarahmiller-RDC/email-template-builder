import { EmailData } from '../../types/email';

function Divider() {
  return (
    <div className="bg-white h-px relative shrink-0 w-full" data-name="Divider">
      <div aria-hidden="true" className="absolute border-[#beb8b0] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

interface EmailInformationProps {
  data: EmailData['information'];
  isDark?: boolean;
}

export function EmailInformation({ data, isDark = false }: EmailInformationProps) {
  const textColor = isDark ? 'text-white' : 'text-[#1a1816]';
  const borderColor = isDark ? 'border-[#726a60]' : 'border-[#beb8b0]';
  
  return (
    <div className="relative shrink-0 w-full" data-name="Information">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[31px] items-start pb-0 pt-[40px] px-[40px] relative w-full">
          <p className={`font-helvetica font-bold leading-[28px] not-italic relative shrink-0 text-[22px] text-nowrap whitespace-pre ${textColor}`}>{data.emailName}</p>
          <div className="bg-white h-px relative shrink-0 w-full" data-name="Divider">
            <div aria-hidden="true" className={`absolute ${borderColor} border-[1px_0px_0px] border-solid inset-0 pointer-events-none`} />
          </div>
          <p className={`font-helvetica font-bold leading-[22px] not-italic relative shrink-0 text-[17px] text-nowrap tracking-[0.48px] whitespace-pre ${textColor}`}>Subject: {data.subject}</p>
          <div className={`font-helvetica font-normal leading-[17px] not-italic relative shrink-0 text-[11px] text-nowrap whitespace-pre ${textColor}`}>
            <p className="mb-0">From: {data.fromAddress}</p>
            <p className="mb-0">Reply-to: {data.replyToAddress}</p>
            <p>To: {data.toAddress}</p>
          </div>
        </div>
      </div>
    </div>
  );
}