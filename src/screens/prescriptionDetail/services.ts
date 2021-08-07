import Toast from 'react-native-toast-message'
import { errorHandler, getApiInstance } from '../../api/api'
import { ServicesConstants } from '../../api/constants/constants'

export const getPrescriptionDetails = async (prescriptionId: number) => {
    const api = await getApiInstance()
    const url = `${ServicesConstants.URL.prescriptions}/${prescriptionId}`
    try {
        const response = await api.get(url)

        if (response.status === 200) {
            return response.data[0]
        }
        return null
    } catch (e) {
        errorHandler({
            title: 'Erro ao buscar os detalhes da prescrição',
            message: `ERRO-${e?.response?.status || 'NO_CODE'} : ${e?.message}`,
        })
        return null
    }
}

export const deletePrescription = async (prescriptionId: number) => {
    const api = await getApiInstance()
    const url = `${ServicesConstants.URL.prescriptions}/${prescriptionId}`
    try {
        const response = await api.delete(url)

        if (response.status === 200) {
            Toast.show({
                type: 'success',
                text1: 'Sucesso',
                text2: 'Prescrição excluída',
            })
            return true
        }
        return false
    } catch (e) {
        errorHandler({
            title: 'Erro ao excluir prescrição',
            message: `ERRO-${e?.response?.status || 'NO_CODE'} : ${e?.message}`,
        })
        return false
    }
}

export const getPatient = async (patientId: number) => {
    const api = await getApiInstance()
    const url = `${ServicesConstants.URL.patients}/${patientId}`
    try {
        const response = await api.get(url)

        if (response.status === 200) {
            return response.data[0]
        }
        return null
    } catch (e) {
        errorHandler({
            title: 'Erro ao buscar os dados do paciente',
            message: `ERRO-${e?.response?.status || 'NO_CODE'} : ${e?.message}`,
        })
        return null
    }
}
export const getPhysician = async (physicianId: number) => {
    const api = await getApiInstance()
    const url = `${ServicesConstants.URL.physicians}/${physicianId}`
    try {
        const response = await api.get(url)

        if (response.status === 200) {
            return response.data[0]
        }
        return null
    } catch (e) {
        errorHandler({
            title: 'Erro ao buscar os dados do médico',
            message: `ERRO-${e?.response?.status || 'NO_CODE'} : ${e?.message}`,
        })
        return null
    }
}
