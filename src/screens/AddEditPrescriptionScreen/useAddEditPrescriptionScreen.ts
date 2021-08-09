import { NavigationProp, RouteProp } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { errorHandler } from '../../api/api'
import { Patient, Physician } from '../../utils/types/Types'
import { getPatients, getPhysicians, submitPrescription } from './services'

export interface AddEditPrescriptionScreenProps {
    route: RouteProp<any>
    navigation: NavigationProp<any>
}

interface InitialDataType {
    patientName: string
    physicianName: string
    description: string
}

const useAddEditPrescriptionScreen = (
    props: AddEditPrescriptionScreenProps
) => {
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
            errorHandler({
                title: 'Campos obrigatórios',
                message:
                    'Favor escolher o paciente, o médico e preencher a descrição',
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
        } else navigation.goBack()
    }

    return {
        patient,
        patientName,
        patients,
        description,
        setDescription,
        physicians,
        physicianName,
        isEditing,
        loading,
        dataHasChanged,
        submitData,
        handleSelection,
        onBack,
    }
}

export default useAddEditPrescriptionScreen
