import { ReadonlyDeep } from 'type-fest';

type NewsData = Readonly<{
  title: string;
  imageUrl: string;
  timestamp: number;
  body: string;
}>;

export type DBNews = ReadonlyDeep<{
  [id: string]: NewsData;
}>;

export type News = NewsData & { readonly id: string };
