import Gender from '../constants/gender';

export enum Specialist {
  Pediatrician = 'Dokter Anak',
  Dentist = 'Dokter Gigi',
  Podiatrist = 'Dokter Kaki',
}

export default interface Doctor {
  id: string;
  photoUrl: string;
  name: string;
  specialist: Specialist;
  gender: Gender;
  rating: number;
}
