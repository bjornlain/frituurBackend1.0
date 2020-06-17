export interface Employee {
  id: string;
  address: Address;
  bank_account: BankAccount;
  birth_date: string;
  birth_place: string;
  civil_status: string;
  deleted: boolean;
  emergency_contact: EmergencyContact;
  first_name: string;
  gender: string;
  identity_card_number: string;
  language: string;
  last_name: string;
  nationality: string;
  position: string;
  social_security_number: string;
  teams: Array<string>;
  work_contact: WorkContact;
}

export interface Address {
  city: string;
  country: string;
  line1: string;
  state: string;
  zip_code: string;
}

export interface BankAccount {
  bic: string;
  iban: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relation: string;
}

export interface WorkContact {
  email: string;
  mobile: string;
}
