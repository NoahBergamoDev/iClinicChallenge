import { NavigationProp } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { FC } from 'react'
import { View, Text, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Title, Button } from '../../components'
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
import { Container } from './styles'

interface Props {
    prescriptionId: number
    route: any
    navigation: NavigationProp<any, any>
}

const PrescriptionDetailScreen: FC<Props> = props => {
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
    return (
        <Container>
            <ScrollView>
                <Title text='Médico' left />
                <Text>CRM: {crm.split('-')[1]}</Text>
                <Text>Nome: {physician?.name}</Text>

                <Title text='Paciente' left />
                <Text>Nome: {patient?.name}</Text>
                <Text>E-mail: {patient?.email}</Text>
                <Text>Telefone: {patient?.phone}</Text>

                <Title text='Descrição' left />
                <Text>{text}</Text>
            </ScrollView>
            <View style={{ alignItems: 'center' }}>
                <Button
                    label='Alterar'
                    onPress={() =>
                        navigation.navigate(
                            navigationConstants.SCREENS.ADD_EDIT_PRESCRIPTION,
                            {
                                editPrescription: true,
                                prescriptionId: prescriptionId,
                                physician: physician,
                                patient: patient,
                                description: text,
                            }
                        )
                    }
                />
                <Button label='Excluir' onPress={onDeletePress} />
            </View>
        </Container>
    )
}

export default PrescriptionDetailScreen
