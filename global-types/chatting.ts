import { Doctor, Patient } from './user';

export enum ChatType {
  Text,
  Image,
}

export interface FireChat {
  senderUid: string;
  timestamp: number;
  type: ChatType;
  content: string;
}

export interface FireAllChat {
  [dayDate: string]: {
    [chatId: string]: FireChat;
  };
}

export interface Chat extends FireChat {
  id: string;
}

export interface FireChatHistory {
  lastChatContent: string;
  lastChatTimestamp: number;
  partnerUid: string;
}

export interface FireChatHistories {
  [chatId: string]: FireChatHistory;
}

export interface ChatHistory {
  chatId: string;
  lastChatContent: string;
  lastChatTimestamp: number;
  partner: Patient | Doctor;
}
