import DoctorSpecialist from '../constants/doctor-specialist';
import Gender from '../constants/gender';

export default interface Doctor {
  id: string;
  photoUrl: string;
  name: string;
  specialist: DoctorSpecialist;
  gender: Gender;
  rating: number;
}
