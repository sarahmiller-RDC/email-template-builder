import svgPaths from "./svg-18v6w966h2";
import imgHeaderLogo from "figma:asset/a75d8cb7e64c371ad2da470ca1e25efe38774c4c.png";

function Divider() {
  return (
    <div className="bg-white h-px relative shrink-0 w-full" data-name="Divider">
      <div aria-hidden="true" className="absolute border-[#726a60] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Information() {
  return (
    <div className="relative shrink-0 w-full" data-name="Information">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[31px] items-start pb-0 pt-[40px] px-[40px] relative w-full">
          <p className="font-['Helvetica:Bold',sans-serif] leading-[40px] not-italic relative shrink-0 text-[32px] text-nowrap text-white whitespace-pre">[Email name/type]</p>
          <Divider />
          <p className="font-['Helvetica:Bold',sans-serif] leading-[32px] not-italic relative shrink-0 text-[24px] text-nowrap text-white tracking-[0.48px] whitespace-pre">Subject: [subject line]</p>
          <div className="font-['Helvetica:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">
            <p className="mb-0">From: [from address]</p>
            <p className="mb-0">Reply-to: [reply-to address]</p>
            <p>To: user.name@email.com</p>
          </div>
          <Divider />
        </div>
      </div>
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

function TextBlock() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start not-italic relative shrink-0 text-white" data-name="Text block">
      <p className="font-['Helvetica:Bold',sans-serif] leading-[40px] relative shrink-0 text-[32px] w-[600px]">[H1]</p>
      <div className="font-['Helvetica:Regular',sans-serif] leading-[24px] relative shrink-0 text-[16px] w-[600px]">
        <p className="mb-0">[Recipient name],</p>
        <p className="mb-0">&nbsp;</p>
        <p>{`[body] `}</p>
      </div>
    </div>
  );
}

function H3AndBody() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[24px] not-italic relative shrink-0 text-[16px] text-white w-full" data-name="H3 and Body">
      <p className="font-['Helvetica:Bold',sans-serif] relative shrink-0 w-full">{`[Bolded body copy] `}</p>
      <p className="font-['Helvetica:Regular',sans-serif] relative shrink-0 w-full">[body]</p>
    </div>
  );
}

function PrimaryButton() {
  return (
    <div className="bg-[#d92228] relative rounded-[40px] shrink-0 w-full" data-name="Primary button">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center justify-center p-[16px] relative w-full">
          <p className="font-['Helvetica:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">Call to action</p>
        </div>
      </div>
    </div>
  );
}

function Panel() {
  return (
    <div className="bg-[#1a1816] relative rounded-[16px] shrink-0 w-full" data-name="Panel">
      <div aria-hidden="true" className="absolute border border-[#958a7f] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[32px] relative w-full">
          <p className="font-['Helvetica:Bold',sans-serif] leading-[32px] not-italic relative shrink-0 text-[24px] text-white tracking-[0.48px] w-full">[H2] header text</p>
          <H3AndBody />
          <PrimaryButton />
        </div>
      </div>
    </div>
  );
}

function SpotProfile() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SpotProfile">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_378)" id="SpotProfile">
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

function LeadInfo() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Lead info">
      <SpotProfile />
      <p className="font-['Helvetica:Bold',sans-serif] leading-[32px] not-italic relative shrink-0 text-[24px] text-nowrap text-white tracking-[0.48px] whitespace-pre">[Lead Name]</p>
    </div>
  );
}

function LeadInfo1() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-center relative shrink-0 w-full" data-name="Lead info">
      <LeadInfo />
      <p className="font-['Helvetica:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[18px] text-white w-full">[Lead Address]</p>
    </div>
  );
}

function LeadInfo2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Lead info">
      <p className="basis-0 font-['Helvetica:Bold',sans-serif] grow leading-[1.4] min-h-px min-w-px not-italic relative shrink-0 text-[18px] text-white">Note from client:</p>
    </div>
  );
}

function LeadInfo3() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-center relative shrink-0 w-full" data-name="Lead info">
      <LeadInfo2 />
      <p className="font-['Helvetica:Oblique',sans-serif] italic leading-[1.4] relative shrink-0 text-[18px] text-white w-full">“[Note]”</p>
    </div>
  );
}

function PrimaryButton1() {
  return (
    <div className="bg-[#d92228] relative rounded-[40px] shrink-0 w-full" data-name="Primary button">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center justify-center p-[16px] relative w-full">
          <p className="font-['Helvetica:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">Claim lead</p>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-[#393838] relative rounded-[16px] shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col font-['Helvetica:Regular',sans-serif] gap-[12px] items-center justify-center leading-[0] not-italic p-[24px] relative text-white w-full">
          <p className="leading-[1.4] relative shrink-0 text-[16px] w-full">
            <span>{`You can also contact `}</span>
            <span className="font-['Helvetica:Bold',sans-serif] not-italic">[Name]</span>
            <span>{` directly by calling`}</span>
            <span className="font-['Helvetica:Bold',sans-serif] not-italic"> </span>
            <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Helvetica:Bold',sans-serif] not-italic underline">(888) 991-7034</span>
            <span>{` with PIN `}</span>
            <span className="font-['Helvetica:Bold',sans-serif] not-italic">[pin]</span>
            <span>{` to receive a call from us to get connected with the client. The PIN expires in 24 hours.`}</span>
          </p>
          <p className="leading-[1.4] relative shrink-0 text-[13px] w-full">
            <span>{`Every `}</span>
            <span className="font-['Helvetica:Regular',sans-serif] not-italic">Realtor.com</span>
            <span>{` referral is an opportunity—make it a priority to connect during business hours so we deliver the best possible experience for every consumer.`}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function PanelLeadClaiming() {
  return (
    <div className="bg-[#1a1816] relative rounded-[16px] shrink-0 w-full" data-name="Panel: Lead claiming">
      <div aria-hidden="true" className="absolute border border-[#958a7f] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[32px] relative w-full">
          <LeadInfo1 />
          <LeadInfo3 />
          <PrimaryButton1 />
          <Frame2 />
        </div>
      </div>
    </div>
  );
}

function LeadInfo4() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center not-italic relative shrink-0 w-full" data-name="Lead info">
      <p className="font-['Helvetica:Bold',sans-serif] leading-[32px] relative shrink-0 text-[24px] text-white tracking-[0.48px] w-full">Proposal details</p>
      <div className="font-['Helvetica:Regular',sans-serif] leading-[1.4] relative shrink-0 text-[#1a1816] text-[0px] text-[16px] text-white w-full">
        <p className="mb-0">Listing commission: [N]%</p>
        <p>Included services: [service 1], [service 2], [service 3]</p>
      </div>
    </div>
  );
}

function PrimaryButton2() {
  return (
    <div className="bg-white relative rounded-[40px] shrink-0 w-full" data-name="Primary button">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center justify-center p-[16px] relative w-full">
          <p className="font-['Helvetica:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#d92228] text-[16px] text-nowrap whitespace-pre">View proposal</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d92228] border-solid inset-0 pointer-events-none rounded-[40px]" />
    </div>
  );
}

function PanelProposal() {
  return (
    <div className="bg-[#1a1816] relative rounded-[16px] shrink-0 w-full" data-name="Panel: Proposal">
      <div aria-hidden="true" className="absolute border border-[#958a7f] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[32px] relative w-full">
          <LeadInfo4 />
          <PrimaryButton2 />
          <p className="font-['Helvetica:Regular',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[16px] text-white w-full">Before calling, take a moment to review your proposal, as [Name] may not have reviewed it yet.</p>
        </div>
      </div>
    </div>
  );
}

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

function HelpBox() {
  return (
    <div className="bg-[#1a1816] h-[74px] relative rounded-[8px] shrink-0 w-full" data-name="Help box">
      <div aria-hidden="true" className="absolute border border-[#d3cfca] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[74px] items-center justify-center px-[32px] py-[12px] relative w-full">
          <SpotSupport />
          <p className="basis-0 font-['Helvetica:Regular',sans-serif] grow leading-[1.45] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-white">[Message]</p>
        </div>
      </div>
    </div>
  );
}

function HelpSection() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Help Section">
      <p className="font-['Helvetica:Bold',sans-serif] leading-[32px] not-italic relative shrink-0 text-[24px] text-white tracking-[0.48px] w-full">Need help?</p>
      <HelpBox />
    </div>
  );
}

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

function Frame1() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <IconPhone />
      <p className="font-['Helvetica:Regular',sans-serif] leading-[1.43] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">email@realtor.com</p>
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

function Frame() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <IconEmail />
      <p className="font-['Helvetica:Regular',sans-serif] leading-[1.43] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">(650) 226-7449</p>
    </div>
  );
}

function RealtorSignature() {
  return (
    <div className="relative shrink-0 w-full" data-name="Realtor signature">
      <div aria-hidden="true" className="absolute border-[#d92228] border-[0px_0px_0px_5px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start px-[32px] py-[8px] relative w-full">
          <p className="font-['Helvetica:Bold',sans-serif] leading-[32px] not-italic relative shrink-0 text-[24px] text-white tracking-[0.6px] w-full">[Sender Name]</p>
          <p className="font-['Helvetica:Bold',sans-serif] leading-[1.43] not-italic relative shrink-0 text-[16px] text-white w-full">{`[Sender title] `}</p>
          <Frame1 />
          <Frame />
          <p className="font-['Helvetica:Regular',sans-serif] leading-[1.43] not-italic relative shrink-0 text-[16px] text-white w-full">Move Sales, Inc., operator of Realtor.com©</p>
        </div>
      </div>
    </div>
  );
}

function EmailBody() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Email body">
      <TextBlock />
      <Panel />
      <PanelLeadClaiming />
      <PanelProposal />
      <HelpSection />
      <RealtorSignature />
    </div>
  );
}

function EmailContainer() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[37px] items-center p-[24px] relative shrink-0 w-[648px]" data-name="Email container">
      <LogoHeader />
      <EmailBody />
    </div>
  );
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
      <p className="absolute font-['Helvetica:Bold',sans-serif] leading-[13.272px] left-[calc(50%+0.5px)] not-italic text-[#231f20] text-[12.253px] text-center text-nowrap top-[37.48px] tracking-[-0.1915px] translate-x-[-50%] whitespace-pre">
        <span className="tracking-[-0.0558px]"> </span>
        <span className="text-white">#1 site real estate professionals trust</span>
      </p>
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-[#1a1816] box-border content-stretch flex flex-col gap-[14px] items-center justify-center overflow-clip px-[16px] py-[32px] relative shrink-0 w-[1264px]" data-name="Footer">
      <FooterLogo />
      <p className="font-['Helvetica:Regular',sans-serif] leading-[1.4] min-w-full not-italic relative shrink-0 text-[12px] text-center text-white w-[min-content]">901 E 6th St, Austin, TX 78702</p>
      <p className="font-['Helvetica:Regular',sans-serif] leading-[1.4] min-w-full not-italic relative shrink-0 text-[12px] text-center text-white w-[min-content] whitespace-pre-wrap">
        <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline">Terms of Use</span>
        <span>{`   |   `}</span>
        <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline">Privacy</span>
        <span className="font-['Helvetica:Oblique',sans-serif] italic"> </span>
        <span>{`|     `}</span>
        <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline">Unsubscribe</span> <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline">|</span> <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline">Share your success story</span>
        <span>{`   |   `}</span>
        <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline">Equal Housing</span>
      </p>
      <p className="font-['Helvetica:Regular',sans-serif] leading-[1.4] min-w-full not-italic relative shrink-0 text-[12px] text-center text-white w-[min-content]">
        <span>{`Move Sales, Inc. does not use any National Association of REALTORS dues to operate and maintain `}</span>
        <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline">Realtor.com</span>©.
      </p>
      <p className="font-['Helvetica:Regular',sans-serif] leading-[1.4] max-w-[540px] min-w-full not-italic relative shrink-0 text-[12px] text-center text-white w-[min-content]">REALTOR® and Realtor.com® are trademarks of the NATIONAL ASSOCIATION OF REALTORS® and are used with its permission. © 2025 Move, Inc. All rights reserved.</p>
    </div>
  );
}

function Email() {
  return (
    <div className="bg-[#393838] content-stretch flex flex-col gap-[40px] items-center relative shrink-0" data-name="Email">
      <EmailContainer />
      <Footer />
    </div>
  );
}

export default function StandardTemplate() {
  return (
    <div className="bg-[#1a1816] relative size-full" data-name="Standard Template">
      <div className="content-stretch flex flex-col items-center relative size-full">
        <Information />
        <Email />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}