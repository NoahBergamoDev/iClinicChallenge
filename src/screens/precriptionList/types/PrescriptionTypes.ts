export interface Clinic {
  id: number | undefined;
  name: string | undefined;
  created_at?: string | undefined;
  updated_at?: string | undefined;
}

export interface Patient {
  id: number;
  email: string | undefined;
  name: string;
  phone: string | undefined;
  created_at?: string | undefined;
  updated_at?: string | undefined;
}

export interface Physician {
  id: number;
  crm: string | undefined;
  name: string;
  created_at?: string | undefined;
  updated_at?: string | undefined;
}

export interface Prescription {
  id: number | undefined;
  clinic: Clinic | undefined;
  physician: Physician | undefined;
  patient: Patient | undefined;
}

export interface PrescriptionDetails {
  id: number | undefined;
  clinic_id: number;
  patient_id: number;
  physician_id: number;
  text: string;
  created_at?: string | undefined;
  updated_at?: string | undefined;
}
