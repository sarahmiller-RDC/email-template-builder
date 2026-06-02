import { EmailData } from '../types/email';

export const defaultEmailData: EmailData = {
  information: {
    visible: true,
    emailName: 'Email Name/Type',
    subject: 'Subject Line',
    fromAddress: 'From Address',
    replyToAddress: 'Reply-to address',
    toAddress: 'To Address',
  },
  body: {
    bodyItems: [
      {
        itemType: 'content',
        id: 'opening-heading',
        data: {
          id: 'opening-heading',
          type: 'h1',
          content: 'Join RealPro Select Seller Leads today.',
        },
      },
      {
        itemType: 'content',
        id: 'agent-name',
        data: {
          id: 'agent-name',
          type: 'bodyText',
          content: '[Agent name],',
        },
      },
      {
        itemType: 'content',
        id: 'opening-body',
        data: {
          id: 'opening-body',
          type: 'bodyText',
          content: 'Congratulations! [Owner name] has invited you to join RealPro Select Seller Leads, your solution for high-intent, exclusive seller leads. Follow the steps below to accept your invitation and get started:',
        },
      },
      {
        itemType: 'content',
        id: 'welcome-text',
        data: {
          id: 'welcome-text',
          type: 'bodyText',
          content: 'Welcome to a new era of success!',
        },
      },
      {
        itemType: 'panel',
        id: 'panel-1',
        data: {
          id: 'panel-1',
          type: 'standard',
          elements: [
            {
              id: 'elem-1',
              type: 'h2',
              content: 'How to join',
            },
            {
              id: 'elem-2',
              type: 'bodyText',
              content: '<strong>Log in or create your account</strong><br>Access your RealPro Dashboard at <u>dashboard.realtor.com</u>. If you don\'t have an account, create one.',
            },
            {
              id: 'elem-3',
              type: 'bodyText',
              content: 'Once logged in, you\'ll see a pop-up with your invitation to join RealPro Select Seller Leads. Be sure to review the Terms & Conditions and accept the invitation.',
            },
            {
              id: 'elem-4',
              type: 'primaryButton',
              content: 'Log in and accept invitation',
              url: 'https://dashboard.realtor.com',
            },
          ],
        },
      },
    ],
    helpSection: {
      visible: true,
      boxes: [
        {
          id: 'help-1',
          message: 'Please contact your Account Manager with any questions.',
        },
      ],
    },
    signatureSection: {
      visible: true,
      senderName: 'Sender Name',
      senderTitle: 'Sender title',
      email: 'email@realtor.com',
      phone: '(650) 226-7449',
    },
  },
  footer: {
    address: {
      visible: true,
      content: '901 E 6th St, Austin, TX 78702',
    },
    links: {
      termsOfUse: { visible: true, label: 'Terms of Use', url: '#' },
      privacyPolicy: { visible: true, label: 'Privacy', url: '#' },
      shareStory: { visible: true, label: 'Share your success story', url: '#' },
      customLinks: [
        { id: 'unsubscribe', visible: true, label: 'Unsubscribe', url: '#' },
      ],
    },
    disclaimer: {
      visible: true,
      content: 'Move Sales, Inc. does not use any National Association of REALTORS dues to operate and maintain Realtor.com©.',
    },
    copyright: {
      visible: true,
      content: 'REALTOR® and Realtor.com® are trademarks of the NATIONAL ASSOCIATION OF REALTORS® and are used with its permission. © 2025 Move, Inc. All rights reserved.',
    },
  },
};