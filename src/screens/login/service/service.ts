import { instanceAPI } from '../../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ServicesConstants } from '../../../api/constants/constants';

export const authenticate = async (email: string, password: string) => {
  try {
    const body = {
      grant_type: 'password',
      username: email,
      password: password,
      client_id: 2,
      client_secret: 'xOjzZgqTuklsZFhQWnB1CdyCGX2kQOX8v7d21wVr'
    };
    const response = await instanceAPI.post(
      ServicesConstants.URL.authenticate,
      body
    );

    if (response.status === 200) {
      AsyncStorage.setItem('@accessToken', response.data.access_token);
      AsyncStorage.setItem('@refreshToken', response.data.refresh_token);
      return response.data;
    }
    return null;
  } catch (e) {
    console.log({ e });
    return null;
  }
};
