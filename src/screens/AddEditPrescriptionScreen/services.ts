import { AxiosResponse } from 'axios'
import { errorHandler, getApiInstance } from '../../api/api'
import { ServicesConstants } from '../../api/constants/constants'
import { Patient, Physician } from '../../utils/types/Types'

export const submitPrescription = async (
    patientId: number | undefined,
    physicianId: number | undefined,
    description: string | undefined,
    prescriptionId: number | undefined,
    isNew?: boolean
) => {
    const api = await getApiInstance()
    const url = `${ServicesConstants.URL.prescriptions}/${
        isNew ? '' : prescriptionId
    }`

    const prescription = {
        clinic_id: 1,
        physician_id: physicianId,
        patient_id: patientId,
        text: description,
    }

    try {
        const response = isNew
            ? await api.post(url, prescription)
            : await api.put(url, prescription)

        return response?.status
    } catch (e) {
        console.log({ e })
        errorHandler({
            title: `Erro ao ${isNew ? 'cadastrar' : 'editar'} prescrição`,
            message: `ERRO-${e?.response?.status || 'NO_CODE'} : ${e?.message}`,
        })
        return e.response.status
    }
}

export const getPatients = async () => {
    const api = await getApiInstance()
    const url = `${ServicesConstants.URL.patients}`

    try {
        const response: AxiosResponse = await api.get(url)

        if (response.status === 200) {
            const { data } = response.data
            const patients: Patient[] = data

            for (let i = 2; i <= response.data.meta.last_page; i++) {
                const newUrl = `${ServicesConstants.URL.patients}?page=${i}`
                const resp = await api.get(newUrl)
                if (resp.status === 200) {
                    const { data } = resp.data
                    data.map((pat: Patient) => patients.push(pat))
                }
            }
            return patients
        }
        return null
    } catch (e) {
        console.log({ e })
        return null
    }
}

export const getPhysicians = async () => {
    const api = await getApiInstance()
    const url = `${ServicesConstants.URL.physicians}`

    try {
        const response: AxiosResponse = await api.get(url)

        if (response.status === 200) {
            const { data } = response.data
            const physicians: Physician[] = data

            for (let i = 2; i <= response.data.meta.last_page; i++) {
                const newUrl = `${ServicesConstants.URL.physicians}?page=${i}`
                const resp = await api.get(newUrl)
                if (resp.status === 200) {
                    const { data } = resp.data
                    data.map((phy: Physician) => physicians.push(phy))
                }
            }
            return physicians
        }
        return null
    } catch (e) {
        console.log({ e })
        return null
    }
}
