import React, { FC, useEffect, useState } from 'react'
import { NavigationProp, RouteProp } from '@react-navigation/native'

import { Patient, Physician } from '../../utils/types/Types'
import { Button, Input, AutocompleteInput } from '../../components/'
import { getPatients, getPhysicians, submitPrescription } from './services'
import { AutoCompletesContainer, ButtonContainer, Container } from './styles'
import Toast from 'react-native-toast-message'
import { Alert } from 'react-native'

interface Props {
    route: RouteProp<any>
    navigation: NavigationProp<any>
}

interface InitialDataType {
    patientName: string
    physicianName: string
    description: string
}

const AddEditPrescriptionScreen: FC<Props> = props => {
    const {
        navigation,
        route: { params },
    } = props

    const [description, setDescription] = useState<string>('')
    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)

    const [initialData, setInitialData] = useState<InitialDataType>()

    const [patientName, setPatientName] = useState<string>('')
    const [patient, setPatient] = useState<Patient>()

    const [patients, setPatients] = useState<Patient[]>([])
    const [physicians, setPhysicians] = useState<Physician[]>([])

    const [physicianName, setPhysicianName] = useState<string>('')
    const [physician, setPhysician] = useState<Physician>()

    const [loading, setLoading] = useState<boolean>(false)

    const isEditing = params?.editPrescription

    useEffect(() => {
        if (isFirstLoad) {
            setIsFirstLoad(false)
            navigation.setOptions({
                headerTitle: isEditing
                    ? 'Alterar Prescrição'
                    : 'Adicionar Prescrição',
            })
            // navigation.setParams({checkIfDataChanged: () => })
            fetchPatients()
            fetchPhysicians()
            const dataObj: InitialDataType = {
                patientName: '',
                physicianName: '',
                description: '',
            }
            if (params?.patient) {
                const { patient } = params
                setPatientName(patient.name)
                dataObj.patientName = patient.name
                setPatient(patient)
            }
            if (params?.physician) {
                const { physician } = params
                dataObj.physicianName = physician.name
                setPhysicianName(physician.name)
                setPhysician(physician)
            }
            if (params?.description) {
                dataObj.description = params.description
                setDescription(params.description)
            }
            setInitialData(dataObj)
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
        setLoading(true)
        if (!patient || !physician || !description) {
            Toast.show({
                type: 'error',
                text1: 'Campos obrigatórios',
                text2: 'Favor escolher o paciente, o médico e preencher a descrição',
                autoHide: false,
            })
            setLoading(false)
            return
        }
        const sucessfullySubmited = await submitPrescription(
            patient?.id,
            physician?.id,
            description,
            params?.prescriptionId,
            !isEditing
        )
        if (sucessfullySubmited) {
            navigation.goBack()
            return
        }
        setLoading(false)
    }

    const isPatient = (person: Patient | Physician) => {
        return (person as Patient).phone !== undefined
    }

    const handleSelection = (item: Physician | Patient) => {
        if (isPatient(item)) {
            setPatientName(item.name)
            setPatient(item as Patient)
            return
        }

        setPhysicianName(item.name)
        setPhysician(item as Physician)
        return
    }
    const dataHasChanged = () =>
        initialData?.patientName != patientName ||
        initialData?.physicianName != physicianName ||
        initialData?.description != description

    const onBack = () => {
        if (dataHasChanged()) {
            Alert.alert(
                'Você tem certeza que deseja voltar?',
                'Você perderá todas as alterações não salvas',
                [
                    {
                        text: 'Sim',
                        onPress: () => navigation.goBack(),
                    },
                    { text: 'Não', onPress: () => {} },
                ]
            )
        }
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
                <Button
                    label='Salvar'
                    onPress={submitData}
                    loading={loading}
                    disabled={!dataHasChanged()}
                />
                <Button label='Cancelar' onPress={onBack} disabled={loading} />
            </ButtonContainer>
        </Container>
    )
}

export default AddEditPrescriptionScreen
