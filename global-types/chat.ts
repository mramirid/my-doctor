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

export default interface Chat extends FireChat {
  id: string;
}
