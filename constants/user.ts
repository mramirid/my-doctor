export enum Gender {
  Male = 'Pria',
  Female = 'Wanita',
}

export const genderOptions = Object.values(Gender);

export enum DoctorSpecialist {
  GeneralPractitioner = 'Dokter Umum',
  Pediatrician = 'Dokter Anak',
  Dentist = 'Dokter Gigi',
  Podiatrist = 'Dokter Kaki',
  Medicine = 'Dokter Obat',
  Psychiatrist = 'Psikiater',
  Veterinarian = 'Dokter Hewan',
  FamilyPhysician = 'Dokter Keluarga',
  Neurologist = 'Dokter Saraf',
  Surgeon = 'Dokter Bedah',
  Neurosurgeon = 'Dokter Bedah Saraf',
  PlasticSurgeon = 'Dokter Bedah Plastik',
  Dermatologist = 'Dokter Kulit',
  Pathologist = 'Dokter Patologi',
  Ophthalmologist = 'Dokter Mata',
  Internist = 'Dokter Penyakit Dalam',
  Otolaryngologist = 'Dokter THT',
  Anesthesiologist = 'Dokter Anestesi',
  Urologist = 'Dokter Urologi',
  ForensicPathologist = 'Dokter Forensik',
  Andrologist = 'Dokter Andrologi',
  Radiologist = 'Dokter Radiologi',
  Pulmonologist = 'Dokter Paru',
  Cardiologist = 'Dokter Jantung & Pembuluh Darah',
  OrthopedicSurgeon = 'Dokter Bedah Tulang',
  Parasitologist = 'Dokter Parasitologi',
  Microbiologist = 'Dokter Mikrobiologi',
  Obstetrician = 'Dokter Kandungan',
  Gynecologist = 'Dokter Penyakit Wanita',
  Physiatrist = 'Dokter Rehabilitasi Medik',
  PediatricSurgeon = 'Dokter Bedah Anak',
  ThoracicSurgeon = 'Dokter Bedah Thorax',
}

export const specialistOptions = Object.values(DoctorSpecialist);
