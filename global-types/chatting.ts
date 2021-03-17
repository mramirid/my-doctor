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

export interface ChatHistory {
  lastChatContent: string;
  lastChatTimestamp: number;
  partnerUid: string;
}
