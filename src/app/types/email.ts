export type ContentElementType = 'h1' | 'h2' | 'bodyText' | 'bulletList' | 'numberedList' | 'primaryButton' | 'secondaryButton' | 'divider' | 'image';

export type PanelType = 'standard' | 'lead-claiming' | 'proposal';

export interface ContentElement {
  id: string;
  type: ContentElementType;
  content: string;
  url?: string; // For buttons and links
  items?: string[]; // For bulletList and numberedList
  imageData?: string; // For image elements - base64 data URL
  imageAlt?: string; // For image alt text
}

export interface LeadClaimingContent {
  leadName: string;
  leadAddress: string;
  note: string;
  contactName: string;
  phone: string;
  pin: string;
}

export interface ProposalContent {
  commission: string;
  services: string[];
  clientName: string;
}

export interface PanelConfig {
  id: string;
  type: PanelType;
  // For standard panel - fully customizable elements
  elements?: ContentElement[];
  // For lead-claiming panel - structured content
  leadClaimingContent?: LeadClaimingContent;
  // For proposal panel - structured content
  proposalContent?: ProposalContent;
  // Both lead and proposal can have additional custom elements
  additionalElements?: ContentElement[];
}

// Unified body item that can be either a standalone content block or a panel
export type BodyItem = 
  | { itemType: 'content'; id: string; data: ContentElement }
  | { itemType: 'panel'; id: string; data: PanelConfig };

export interface HelpBoxConfig {
  id: string;
  message: string;
  imageData?: string; // Optional image data URL
  imageAlt?: string; // Optional image alt text
}

export interface EmailData {
  information: {
    visible: boolean;
    emailName: string;
    subject: string;
    fromAddress: string;
    replyToAddress: string;
    toAddress: string;
  };
  body: {
    bodyItems: BodyItem[];
    helpSection: {
      visible: boolean;
      boxes: HelpBoxConfig[];
    };
    signatureSection: {
      visible: boolean;
      senderName: string;
      senderTitle: string;
      email: string;
      phone: string;
    };
  };
  footer: {
    address: {
      visible: boolean;
      content: string;
    };
    links: {
      termsOfUse: { visible: boolean; label: string; url: string };
      privacyPolicy: { visible: boolean; label: string; url: string };
      shareStory: { visible: boolean; label: string; url: string };
      customLinks: Array<{ id: string; visible: boolean; label: string; url: string }>;
    };
    disclaimer: {
      visible: boolean;
      content: string;
    };
    copyright: {
      visible: boolean;
      content: string;
    };
  };
}

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';
export type ThemeMode = 'light' | 'dark';