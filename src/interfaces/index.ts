export interface StringMap { [key: string]: any; }

export interface CandidateDataObj {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  qualifications: string;
  status: string;
  reactjsExp: string;
  nodejsExp: string;
  expectedSalary: number;
  computedScore?: number;
}

export type CandidateDataT = CandidateDataObj[] | [];