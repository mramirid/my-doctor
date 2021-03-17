import Chat from '../../global-types/chat';

const chats: Chat[] = [
  {
    id: '1',
    message: 'Ibu dokter, apakah memakan jeruk tiap hari itu buruk?',
    timestamp: new Date().getTime(),
    sender: {
      id: 'A',
      photoUrl: 'https://i.ibb.co/9nqPWmN/doctor-nairobi-putri.png',
    },
  },
  {
    id: '2',
    message: 'Oh tentu saja tidak karena jeruk itu sangat sehat...',
    timestamp: new Date().getTime() + 3600000,
    sender: {
      id: 'B',
      photoUrl: 'https://i.ibb.co/9nqPWmN/doctor-nairobi-putri.png',
    },
  },
  {
    id: '3',
    message: 'Baik ibu, terima kasih atas waktu dan ilmunya...',
    timestamp: new Date().getTime() + 3600000,
    sender: {
      id: 'A',
      photoUrl: 'https://i.ibb.co/9nqPWmN/doctor-nairobi-putri.png',
    },
  },
  {
    id: '4',
    message: 'Baik ibu, terima kasih atas waktu dan ilmunya...',
    timestamp: new Date().getTime() + 3600000,
    sender: {
      id: 'B',
      photoUrl: 'https://i.ibb.co/9nqPWmN/doctor-nairobi-putri.png',
    },
  },
  {
    id: '5',
    message: 'Baik ibu, terima kasih atas waktu dan ilmunya...',
    timestamp: new Date().getTime() + 3600000,
    sender: {
      id: 'A',
      photoUrl: 'https://i.ibb.co/9nqPWmN/doctor-nairobi-putri.png',
    },
  },
  {
    id: '6',
    message: 'Baik ibu, terima kasih atas waktu dan ilmunya...',
    timestamp: new Date().getTime() + 3600000,
    sender: {
      id: 'A',
      photoUrl: 'https://i.ibb.co/9nqPWmN/doctor-nairobi-putri.png',
    },
  },
];

export default chats;
