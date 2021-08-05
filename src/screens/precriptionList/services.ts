import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosRequestConfig } from 'axios';
import { instanceAPI } from '../../api/api';
import { ServicesConstants } from '../../api/constants/constants';

export const getPrescriptions = async (
  page: number = 1,
  patientOrPhysicianName: string = ''
) => {
  const url = `${ServicesConstants.URL.prescriptions}${
    patientOrPhysicianName != ''
      ? `?patient_or_physician_name=${patientOrPhysicianName}`
      : `?page=${page}`
  }`;
  try {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('@accessToken')}`
      }
    };

    const response = await instanceAPI.get(url, requestConfig);

    if (response.status === 200) {
      console.log('PRESCRIPTIONS: ', response);
      return response.data;
    }
    return null;
  } catch (e) {
    console.log({ e });
    return null;
  }
};
