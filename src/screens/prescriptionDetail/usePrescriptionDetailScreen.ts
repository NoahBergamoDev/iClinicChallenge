import { NavigationProp } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { navigationConstants } from '../../navigation/constants'
import {
    Patient,
    Physician,
    PrescriptionDetails,
} from '../../utils/types/Types'
import {
    deletePrescription,
    getPatient,
    getPrescriptionDetails,
} from './services'

export interface PrescriptionDetailProp {
    prescriptionId: number
    route: any
    navigation: NavigationProp<any, any>
}

const usePrescriptionDetailScreen = (props: PrescriptionDetailProp) => {
    const {
        navigation,
        route: {
            params: { prescriptionId, crm, onDeletePrescription },
        },
    } = props
    const [text, setText] = useState<string>('')
    const [patient, setPatient] = useState<Patient | null>(null)
    const [physician, setPhysician] = useState<Physician | null>(null)

    useEffect(() => {
        getDetails()
    }, [])

    const getPatientData = async (patientId: number) => {
        const response = await getPatient(patientId)
        setPatient(response)
    }
    const getPhysicianData = async (patientId: number) => {
        const response = await getPatient(patientId)
        setPhysician(response)
    }

    const getDetails = async () => {
        const response: PrescriptionDetails = await getPrescriptionDetails(
            prescriptionId
        )
        if (response) {
            setText(response.text)
            getPatientData(response.patient_id)
            getPhysicianData(response.physician_id)
        }
    }

    const onDeletePress = async () => {
        Alert.alert(
            'Confirmação',
            'Você tem certeza que deseja excluir essa prescrição?',
            [
                {
                    text: 'Sim',
                    onPress: async () => {
                        const wasDeleted = await deletePrescription(
                            prescriptionId
                        )
                        if (wasDeleted)
                            navigation.navigate(
                                navigationConstants.SCREENS.PRESCRIPTION_LIST,
                                {
                                    deletedPrescription: prescriptionId,
                                }
                            )
                    },
                },
                { text: 'Não', onPress: () => {} },
            ]
        )
    }
    return {
        text,
        patient,
        physician,
        crm,
        onDeletePress,
        onEditPress: () =>
            navigation.navigate(
                navigationConstants.SCREENS.ADD_EDIT_PRESCRIPTION,
                {
                    editPrescription: true,
                    prescriptionId: prescriptionId,
                    physician: physician,
                    patient: patient,
                    description: text,
                }
            ),
    }
}

export default usePrescriptionDetailScreen
