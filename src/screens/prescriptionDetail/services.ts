import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosRequestConfig } from 'axios';
import { instanceAPI } from '../../api/api';
import { ServicesConstants } from '../../api/constants/constants';

export const getPrescriptionDetails = async (prescriptionId: number) => {
  const url = `${ServicesConstants.URL.prescriptions}/${prescriptionId}`;
  try {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('@accessToken')}`
      }
    };

    const response = await instanceAPI.get(url, requestConfig);

    if (response.status === 200) {
      console.log({ response });
      return response.data[0];
    }
    return null;
  } catch (e) {
    console.log({ e });
    return null;
  }
};

export const getPatient = async (patientId: number) => {
  const url = `${ServicesConstants.URL.patients}/${patientId}`;
  try {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('@accessToken')}`
      }
    };

    const response = await instanceAPI.get(url, requestConfig);

    if (response.status === 200) {
      console.log({ response });
      return response.data[0];
    }
    return null;
  } catch (e) {
    console.log({ e });
    return null;
  }
};
export const getPhysician = async (physicianId: number) => {
  const url = `${ServicesConstants.URL.physicians}/${physicianId}`;
  try {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('@accessToken')}`
      }
    };

    const response = await instanceAPI.get(url, requestConfig);

    if (response.status === 200) {
      console.log({ response });
      return response.data[0];
    }
    return null;
  } catch (e) {
    console.log({ e });
    return null;
  }
};
