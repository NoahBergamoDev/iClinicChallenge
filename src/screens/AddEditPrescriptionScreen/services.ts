import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosRequestConfig, AxiosResponse, ResponseType } from 'axios';
import { instanceAPI } from '../../api/api';
import { ServicesConstants } from '../../api/constants/constants';
import { Patient, Physician } from '../precriptionList/types/PrescriptionTypes';

export const submitPrescription = async (
  patientId: number | undefined,
  physicianId: number | undefined,
  description: string | undefined,
  prescriptionId: number | undefined,
  isNew?: boolean
) => {
  const url = `${ServicesConstants.URL.prescriptions}/${
    isNew ? '' : prescriptionId
  }`;

  const prescription = {
    clinic_id: 1,
    physician_id: physicianId,
    patient_id: patientId,
    text: description
  };

  try {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('@accessToken')}`
      }
    };

    const response = isNew
      ? await instanceAPI.post(url, prescription, requestConfig)
      : await instanceAPI.put(url, prescription, requestConfig);

    return response.status;
  } catch (e) {
    console.log({ e });
    return e.response.status;
  }
};

export const getPatients = async () => {
  const url = `${ServicesConstants.URL.patients}`;

  try {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('@accessToken')}`
      }
    };

    const response: AxiosResponse = await instanceAPI.get(url, requestConfig);

    if (response.status === 200) {
      const { data } = response.data;
      const patients: Patient[] = data;

      for (let i = 2; i <= response.data.meta.last_page; i++) {
        const newUrl = `${ServicesConstants.URL.patients}?page=${i}`;
        const resp = await instanceAPI.get(newUrl, requestConfig);
        if (resp.status === 200) {
          const { data } = resp.data;
          data.map((pat: Patient) => patients.push(pat));
        }
      }
      return patients;
    }
    return null;
  } catch (e) {
    console.log({ e });
    return null;
  }
};

export const getPhysicians = async () => {
  const url = `${ServicesConstants.URL.physicians}`;

  try {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('@accessToken')}`
      }
    };

    const response: AxiosResponse = await instanceAPI.get(url, requestConfig);

    if (response.status === 200) {
      const { data } = response.data;
      const physicians: Physician[] = data;

      for (let i = 2; i <= response.data.meta.last_page; i++) {
        const newUrl = `${ServicesConstants.URL.physicians}?page=${i}`;
        const resp = await instanceAPI.get(newUrl, requestConfig);
        if (resp.status === 200) {
          const { data } = resp.data;
          data.map((phy: Physician) => physicians.push(phy));
        }
      }
      return physicians;
    }
    return null;
  } catch (e) {
    console.log({ e });
    return null;
  }
};
