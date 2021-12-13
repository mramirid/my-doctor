export type HospitalData = Readonly<{
  name: string;
  type: string;
  address: string;
  imageUrl: string;
}>;

export type Hospital = HospitalData & { readonly id: string };
