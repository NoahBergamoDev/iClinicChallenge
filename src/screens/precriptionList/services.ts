import AsyncStorage from '@react-native-async-storage/async-storage'
import { AxiosRequestConfig } from 'axios'
import { getApiInstance } from '../../api/api'
import { ServicesConstants } from '../../api/constants/constants'

export const getPrescriptions = async (
    page: number = 1,
    patientOrPhysicianName: string = ''
) => {
    const api = await getApiInstance()
    const url = `${ServicesConstants.URL.prescriptions}${
        patientOrPhysicianName != ''
            ? `?patient_or_physician_name=${patientOrPhysicianName}`
            : `?page=${page}`
    }`
    try {
        const response = await api.get(url)

        if (response.status === 200) {
            return response.data
        }
        return null
    } catch (e) {
        console.log({ e })
        return null
    }
}
