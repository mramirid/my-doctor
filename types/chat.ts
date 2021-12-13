import { ReadonlyDeep } from 'type-fest';

export const enum ChatType {
  Text,
  Image,
}

export type ChatData = Readonly<{
  senderUid: string;
  timestamp: number;
  type: ChatType;
  content: string;
}>;

export type Chat = ChatData & { readonly id: string };

export type ChatHistories = ReadonlyDeep<{
  [chatId: string]: {
    lastChatContent: string;
    lastChatTimestamp: number;
    partnerUid: string;
  };
}>;
