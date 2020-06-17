export interface Vehicle {
  id: string;
  avatar: string;
  brand: string;
  chassis_number: string;
  co2_nedc: number;
  co2_wltp: number;
  color: string;
  contract: Contract;
  description: string;
  fuel: string;
  hp: number;
  initial_registration: Date;
  kind: string;
  model: string;
  owner: string;
  pictures: string[];
  plate: string;
  price: number;
  vendor: string;
}

export interface Contract {
  date: Date;
  initial_amount: number;
  kind: string;
  monthly_amount: number;
  residual_value: number;
  runtime: number;
  supplier: string;
}
