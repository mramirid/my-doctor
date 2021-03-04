import Doctor from '../../global-types/doctor';
import DoctorSpecialist from '../doctor-specialist';
import Gender from '../gender';

const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Alexander Jannie',
    photoUrl: 'https://i.ibb.co/hYSYqTk/doctor-alexander-jannie.png',
    specialist: DoctorSpecialist.Pediatrician,
    gender: Gender.Female,
    rating: 5,
  },
  {
    id: '2',
    name: 'Alexa Rachel',
    photoUrl: 'https://i.ibb.co/yX7n5zD/doctor-alexa-rachel.png',
    specialist: DoctorSpecialist.Pediatrician,
    gender: Gender.Female,
    rating: 5,
  },
  {
    id: '3',
    name: 'James Rivillia',
    photoUrl: 'https://i.ibb.co/d7QNNHt/doctor-james-rivillia.png',
    specialist: DoctorSpecialist.Pediatrician,
    gender: Gender.Male,
    rating: 5,
  },
  {
    id: '4',
    name: 'John McParker Steve',
    photoUrl: 'https://i.ibb.co/ZXH1vdq/doctor-mcparker-steve.png',
    specialist: DoctorSpecialist.Pediatrician,
    gender: Gender.Male,
    rating: 5,
  },
  {
    id: '5',
    name: 'Nairobi Putri Hayza',
    photoUrl: 'https://i.ibb.co/9nqPWmN/doctor-nairobi-putri.png',
    specialist: DoctorSpecialist.Pediatrician,
    gender: Gender.Female,
    rating: 5,
  },
  {
    id: '6',
    name: 'Salsabila Citra',
    photoUrl: 'https://i.ibb.co/HD5N137/doctor-salsabila-citra.png',
    specialist: DoctorSpecialist.Podiatrist,
    gender: Gender.Female,
    rating: 5,
  },
  {
    id: '7',
    name: 'Sunny Frank',
    photoUrl: 'https://i.ibb.co/9cQ5hnm/doctor-sunny-frank.png',
    specialist: DoctorSpecialist.Dentist,
    gender: Gender.Male,
    rating: 5,
  },

  {
    id: '8',
    name: 'Sunny Frank',
    photoUrl: 'https://i.ibb.co/9cQ5hnm/doctor-sunny-frank.png',
    specialist: DoctorSpecialist.Dentist,
    gender: Gender.Male,
    rating: 5,
  },

  {
    id: '9',
    name: 'Sunny Frank',
    photoUrl: 'https://i.ibb.co/9cQ5hnm/doctor-sunny-frank.png',
    specialist: DoctorSpecialist.Dentist,
    gender: Gender.Male,
    rating: 5,
  },

  {
    id: '10',
    name: 'Sunny Frank',
    photoUrl: 'https://i.ibb.co/9cQ5hnm/doctor-sunny-frank.png',
    specialist: DoctorSpecialist.Dentist,
    gender: Gender.Male,
    rating: 5,
  },
];

export default doctors;
