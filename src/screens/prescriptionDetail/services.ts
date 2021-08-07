import { getApiInstance } from '../../api/api'
import { ServicesConstants } from '../../api/constants/constants'

export const getPrescriptionDetails = async (prescriptionId: number) => {
    const api = await getApiInstance()
    const url = `${ServicesConstants.URL.prescriptions}/${prescriptionId}`
    try {
        const response = await api.get(url)

        if (response.status === 200) {
            console.log({ response })
            return response.data[0]
        }
        return null
    } catch (e) {
        console.log({ e })
        return null
    }
}

export const getPatient = async (patientId: number) => {
    const api = await getApiInstance()
    const url = `${ServicesConstants.URL.patients}/${patientId}`
    try {
        const response = await api.get(url)

        if (response.status === 200) {
            console.log({ response })
            return response.data[0]
        }
        return null
    } catch (e) {
        console.log({ e })
        return null
    }
}
export const getPhysician = async (physicianId: number) => {
    const api = await getApiInstance()
    const url = `${ServicesConstants.URL.physicians}/${physicianId}`
    try {
        const response = await api.get(url)

        if (response.status === 200) {
            console.log({ response })
            return response.data[0]
        }
        return null
    } catch (e) {
        console.log({ e })
        return null
    }
}
