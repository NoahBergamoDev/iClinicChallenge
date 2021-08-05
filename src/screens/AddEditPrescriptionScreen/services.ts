import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosRequestConfig } from 'axios';
import { instanceAPI } from '../../api/api';
import { ServicesConstants } from '../../api/constants/constants';

export const editPrescription = async (
  patientId: number | undefined,
  physicianId: number | undefined,
  description: string | undefined,
  prescriptionId: number | undefined
) => {
  const url = `${ServicesConstants.URL.prescriptions}/${prescriptionId}`;

  const prescription = {
    clinic_id: 1,
    physician_id: physicianId?.toString(),
    patient_id: patientId?.toString(),
    text: description?.toString()
  };
  try {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('@accessToken')}`
      }
    };

    const response = await instanceAPI.put(url, prescription, requestConfig);

    if (response.status === 200) {
      console.log({ response });
      return response.data;
    }
    return null;
  } catch (e) {
    console.log({ e });
    return null;
  }
};
