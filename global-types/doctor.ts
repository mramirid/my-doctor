import DoctorSpecialist from '../constants/doctor-specialist';
import Gender from '../constants/gender';

export interface DoctorCategory {
  id: string;
  name: DoctorSpecialist;
}

export default interface Doctor {
  id: string;
  name: string;
  gender: Gender;
  specialist: DoctorSpecialist;
  photoUrl: string;
  almamater: string;
  workplace: string;
  credentialID: string;
  rating: number;
}
