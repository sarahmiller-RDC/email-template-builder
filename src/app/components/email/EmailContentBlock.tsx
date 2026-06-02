import { ContentElement } from '../../types/email';

interface EmailContentBlockProps {
  block: ContentElement;
  isDark?: boolean;
}

export function EmailContentBlock({ block, isDark = false }: EmailContentBlockProps) {
  const textColor = isDark ? 'text-white' : 'text-[#1a1816]';
  const buttonTextDark = isDark ? 'text-white' : 'text-[#1a1816]';
  
  if (block.type === 'h1') {
    return (
      <p className={`font-helvetica font-bold leading-[40px] relative shrink-0 text-[32px] w-full ${textColor}`} dangerouslySetInnerHTML={{ __html: block.content }} />
    );
  }

  if (block.type === 'h2') {
    return (
      <p className={`font-helvetica font-bold leading-[29.76px] relative shrink-0 text-[24px] w-full ${textColor}`} dangerouslySetInnerHTML={{ __html: block.content }} />
    );
  }

  if (block.type === 'bodyText') {
    return (
      <p className={`font-helvetica font-normal leading-[24px] relative shrink-0 text-[16px] w-full ${textColor}`} dangerouslySetInnerHTML={{ __html: block.content }} />
    );
  }

  if (block.type === 'primaryButton') {
    return (
      <a
        href={block.url || '#'}
        className="bg-[#d92228] box-border content-stretch flex flex-col gap-[8px] items-center overflow-clip px-[24px] py-[16px] relative rounded-[32px] shrink-0 no-underline w-full border border-solid border-[#d92228]"
      >
        <p className="font-helvetica font-bold leading-[19.84px] not-italic relative shrink-0 text-[16px] text-center text-white w-[min-content] whitespace-pre" dangerouslySetInnerHTML={{ __html: block.content }} />
      </a>
    );
  }

  if (block.type === 'secondaryButton') {
    return (
      <a
        href={block.url || '#'}
        className={`box-border content-stretch flex flex-col gap-[8px] items-center overflow-clip px-[24px] py-[16px] relative rounded-[32px] shrink-0 no-underline w-full border border-solid ${isDark ? 'border-[#d92228]' : 'border-[#d92228]'}`}
      >
        <p className="font-helvetica font-bold leading-[19.84px] not-italic relative shrink-0 text-[16px] text-center w-[min-content] whitespace-pre text-[#d92228]" dangerouslySetInnerHTML={{ __html: block.content }} />
      </a>
    );
  }

  if (block.type === 'bulletList') {
    return (
      <ul className={`font-helvetica font-normal leading-[24px] relative shrink-0 text-[16px] w-full list-disc pl-6 ${textColor}`}>
        {block.items?.map((item, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>
    );
  }

  if (block.type === 'numberedList') {
    return (
      <ol className={`font-helvetica font-normal leading-[24px] relative shrink-0 text-[16px] w-full list-decimal pl-6 ${textColor}`}>
        {block.items?.map((item, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ol>
    );
  }

  if (block.type === 'divider') {
    return (
      <div className={`w-full h-[1px] ${isDark ? 'bg-[#4a4a4a]' : 'bg-gray-300'}`} />
    );
  }

  if (block.type === 'image') {
    if (!block.imageData) {
      return (
        <div className={`w-full p-8 text-center border-2 border-dashed rounded-lg ${isDark ? 'border-gray-600 text-gray-400' : 'border-gray-300 text-gray-500'}`}>
          <p className="font-helvetica text-[14px]">No image uploaded</p>
        </div>
      );
    }
    return (
      <img 
        src={block.imageData} 
        alt={block.imageAlt || 'Uploaded image'} 
        className="w-full h-auto"
      />
    );
  }

  return null;
}