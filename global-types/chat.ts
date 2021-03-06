export default interface Chat {
  id: string;
  message: string;
  date: number;
  sender: {
    id: string;
    photoUrl: string;
  };
}
