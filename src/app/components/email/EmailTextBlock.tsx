import { EmailData } from '../../types/email';

interface EmailTextBlockProps {
  data: EmailData['body']['textBlock'];
}

export function EmailTextBlock({ data }: EmailTextBlockProps) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start not-italic relative shrink-0" data-name="Text block">
      <p className="font-helvetica font-bold leading-[40px] relative shrink-0 text-[#1a1816] text-[32px] w-full" dangerouslySetInnerHTML={{ __html: data.heading }} />
      <div className="font-helvetica font-normal leading-[24px] relative shrink-0 text-[16px] text-black w-full">
        <p className="mb-0" dangerouslySetInnerHTML={{ __html: data.recipientName }} />
        <p className="mb-0">&nbsp;</p>
        <p dangerouslySetInnerHTML={{ __html: data.body }} />
      </div>
    </div>
  );
}