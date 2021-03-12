export interface FireHospitals {
  name: string;
  type: string;
  address: string;
  imageUrl: string;
}

export default interface Hospital extends FireHospitals {
  id: string;
}
