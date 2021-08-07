import React, { FC, useEffect, useState } from 'react'
import { NavigationProp, Route } from '@react-navigation/native'

import { Patient, Physician } from '../../utils/types/Types'
import { Button, Input, AutocompleteInput } from '../../components/'
import { getPatients, getPhysicians, submitPrescription } from './services'
import { AutoCompletesContainer, ButtonContainer, Container } from './styles'

interface Props {
    route: Route<any, any>
    navigation: NavigationProp<any, any>
}

const AddEditPrescriptionScreen: FC<Props> = props => {
    const {
        navigation,
        route: { params },
    } = props

    const [description, setDescription] = useState<string>('')
    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)

    const [patientName, setPatientName] = useState<string>('')
    const [patient, setPatient] = useState<Patient>()

    const [patients, setPatients] = useState<Patient[]>([])
    const [physicians, setPhysicians] = useState<Physician[]>([])

    const [physicianName, setPhysicianName] = useState<string>('')
    const [physician, setPhysician] = useState<Physician>()

    const [errorMessage, setErrorMessage] = useState<string>('')

    const isEditing = params?.editPrescription

    useEffect(() => {
        if (isFirstLoad) {
            setIsFirstLoad(false)
            navigation.setOptions({
                headerTitle: isEditing
                    ? 'Alterar Prescrição'
                    : 'Adicionar Prescrição',
            })
            fetchPatients()
            fetchPhysicians()
            if (params?.patient) {
                setPatientName(params.patient.name)
                setPatient(params.patient)
            }
            if (params?.physician) {
                setPhysicianName(params.physician.name)
                setPhysician(params.physician)
            }
            if (params?.description) {
                setDescription(params.description)
            }
        }
    }, [params, isEditing, navigation, isFirstLoad])

    const fetchPatients = async () => {
        const response = await getPatients()
        if (response) {
            setPatients(response)
        }
    }
    const fetchPhysicians = async () => {
        const response = await getPhysicians()
        if (response) {
            setPhysicians(response)
        }
    }

    const submitData = async () => {
        if (!patient || !physician || !description) {
            setErrorMessage('Todos os campos são obrigatórios')
            return
        }
        const status = await submitPrescription(
            patient?.id,
            physician?.id,
            description,
            params?.prescriptionId,
            !isEditing
        )
        if (status === 200) {
            navigation.goBack()
            return
        }
        setErrorMessage(
            `Ocorreu um erro ao tentar gravar os dados. - Erro - ${status}`
        )
    }

    const isPatient = (person: Patient | Physician) => {
        return (person as Patient).phone !== undefined
    }

    const handleSelection = (item: Physician | Patient) => {
        setErrorMessage('')
        if (isPatient(item)) {
            setPatientName(item.name)
            setPatient(item as Patient)
            return
        }

        setPhysicianName(item.name)
        setPhysician(item as Physician)
        return
    }

    return (
        <Container>
            <AutoCompletesContainer
                contentContainerStyle={{
                    alignItems: 'center',
                    paddingBottom: 20,
                }}
            >
                <AutocompleteInput
                    data={patients}
                    inputText={patientName}
                    onSelect={handleSelection}
                    label='Pacientes'
                    disabled={isEditing}
                />
                <AutocompleteInput
                    data={physicians}
                    inputText={physicianName}
                    onSelect={handleSelection}
                    label='Médicos'
                    disabled={isEditing}
                />
                <Input
                    label='Descrição'
                    onChangeText={text => setDescription(text)}
                    value={description}
                    multiline
                    bigTextBox
                />
            </AutoCompletesContainer>
            <ButtonContainer>
                <Button label='Salvar' onPress={submitData} />
                <Button label='Cancelar' onPress={() => navigation.goBack()} />
            </ButtonContainer>
        </Container>
    )
}

export default AddEditPrescriptionScreen
