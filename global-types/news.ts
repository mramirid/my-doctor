export interface FireNews {
  title: string;
  imageUrl: string;
  date: number;
  body: string;
}

export interface News extends FireNews {
  id: string;
}
