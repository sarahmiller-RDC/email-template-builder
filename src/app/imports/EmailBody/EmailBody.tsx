import imgHeaderLogo from "./a75d8cb7e64c371ad2da470ca1e25efe38774c4c.png";

function LeadInfo() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start not-italic relative shrink-0 w-full" data-name="Lead info">
      <p className="font-['Helvetica:Bold',sans-serif] leading-[24px] relative shrink-0 text-[#1a1816] text-[16px] w-full">Log in or create your account</p>
      <div className="font-['Galano_Grotesque_Alt:Regular',sans-serif] leading-[0] relative shrink-0 text-[0px] text-black w-full whitespace-pre-wrap">
        <p className="font-['Helvetica:Regular',sans-serif] mb-0 text-[16px]">
          <span className="leading-[24px]">Access your RealPro Dashboard at</span>
          <a className="cursor-pointer leading-[24px]" href="http://dashboard.realtor.com" target="_blank">
            <span href="http://dashboard.realtor.com" target="_blank">{` `}</span>
          </a>
          <a className="cursor-pointer decoration-solid leading-[24px] underline" href="http://dashboard.realtor.com" target="_blank">
            <span className="decoration-solid underline" href="http://dashboard.realtor.com" target="_blank">
              dashboard.realtor.com
            </span>
          </a>
          <span className="decoration-solid leading-[24px] underline">.</span>
          <span className="leading-[24px]">{` If you don’t have an account, create one.`}</span>
        </p>
        <p className="leading-[24px] mb-0 text-[16px]">​</p>
        <p className="font-['Helvetica:Oblique',sans-serif] italic leading-[24px] text-[16px]">Forgot Your Password? Click ‘Forgot Password’ on the login page to reset your credentials if needed.</p>
      </div>
    </div>
  );
}

function LeadInfo1() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start leading-[24px] not-italic relative shrink-0 text-[16px] w-full" data-name="Lead info">
      <p className="font-['Helvetica:Bold',sans-serif] relative shrink-0 text-[#1a1816] w-full">Accept your invitation</p>
      <p className="font-['Helvetica:Regular',sans-serif] relative shrink-0 text-black w-full">{`Once logged in, you’ll see a pop-up with your invitation to join RealPro Select Seller Leads. Be sure to review the Terms & Conditions and accept the invitation.`}</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <LeadInfo1 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame2 />
    </div>
  );
}

function PrimaryButton() {
  return (
    <div className="bg-[#d92228] h-[48px] relative rounded-[40px] shrink-0 w-full" data-name="Primary button">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[12px] relative size-full">
          <p className="font-['Helvetica:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Log in and accept invitation</p>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative rounded-[16px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#d3cfca] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[24px] relative size-full">
        <p className="font-['Helvetica:Bold',sans-serif] leading-[32px] not-italic relative shrink-0 text-[#1a1816] text-[24px] tracking-[0.48px] w-full">How to join</p>
        <LeadInfo />
        <Frame3 />
        <PrimaryButton />
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <p className="font-['Helvetica:Bold',sans-serif] leading-[40px] not-italic relative shrink-0 text-[#1a1816] text-[32px] w-full">Join RealPro Select Seller Leads today.</p>
      <div className="font-['Galano_Grotesque_Alt:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[0px] text-black w-full whitespace-pre-wrap">
        <p className="font-['Helvetica:Regular',sans-serif] leading-[24px] mb-0 text-[16px]">[Agent name],</p>
        <p className="leading-[24px] mb-0 text-[16px]">​</p>
        <p className="font-['Helvetica:Regular',sans-serif] text-[16px]">
          <span className="leading-[24px]">{`Congratulations! [Owner name] has invited you to join `}</span>
          <span className="leading-[24px] text-black">RealPro Select Seller Leads</span>
          <span className="leading-[24px]">, your solution for high-intent, exclusive seller leads. Follow the steps below to accept your invitation and get started:</span>
        </p>
      </div>
      <p className="font-['Helvetica:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-black w-full">Welcome to a new era of success!</p>
      <Frame />
    </div>
  );
}

export default function EmailBody() {
  return (
    <div className="content-stretch flex flex-col gap-[37px] items-center p-[24px] relative size-full" data-name="Email body">
      <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Logo header">
        <div className="h-[74px] relative rounded-[10px] shrink-0 w-[321px]" data-name="Header logo">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[10px]">
            <div className="absolute bg-white inset-0 rounded-[10px]" />
            <img alt="" className="absolute max-w-none object-cover rounded-[10px] size-full" src={imgHeaderLogo} />
          </div>
        </div>
      </div>
      <Frame1 />
    </div>
  );
}