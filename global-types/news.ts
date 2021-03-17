export interface FireNews {
  title: string;
  imageUrl: string;
  timestamp: number;
  body: string;
}

export interface News extends FireNews {
  id: string;
}
