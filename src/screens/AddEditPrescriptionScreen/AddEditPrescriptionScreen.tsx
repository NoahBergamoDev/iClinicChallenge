import { NavigationProp, Route } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { FC } from 'react'
import { KeyboardAvoidingView, Text, View } from 'react-native'
import Button from '../../components/button/Button'
import Input from '../../components/input/Input'
import { getPatients, getPhysicians, submitPrescription } from './services'
import { Patient, Physician } from '../precriptionList/types/PrescriptionTypes'
import AutocompleteInput from '../../components/autocompleteInput/AutocompleteInput'
import { colors } from '../../utils/colors'
interface Props {
    route: Route<any, any>;
    navigation: NavigationProp<any, any>
}

const AddEditPrescriptionScreen: FC<Props> = (props) => {
    const { navigation, route: { params } } = props
    const [description, setDescription] = useState<string>('')

    const [patientName, setPatientName] = useState<string>('')
    const [patient, setPatient] = useState<Patient>()

    const [patients, setPatients] = useState<Patient[]>([])
    const [physicians, setPhysicians] = useState<Physician[]>([])

    const [physicianName, setPhysicianName] = useState<string>('')
    const [physician, setPhysician] = useState<Physician>()

    const [errorMessage, setErrorMessage] = useState<string>('')

    const isEditing = params?.editPrescription

    useEffect(() => {
        navigation.setOptions({
            headerTitle: isEditing ? 'Alterar Prescrição' : 'Adicionar Prescrição'
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
        if (params?.description) setDescription(params.description)
    }, [])

    const fetchPatients = async () => {
        const response = await getPatients()
        if (response) setPatients(response)
    }
    const fetchPhysicians = async () => {
        const response = await getPhysicians()
        if (response) setPhysicians(response)
    }

    const submitData = async () => {
        if (!patient || !physician || !description) {
            setErrorMessage('Todos os campos são obrigatórios')
            return
        }
        const status = await submitPrescription(patient?.id, physician?.id, description, params?.prescriptionId, !isEditing);
        if (status === 200) {
            navigation.goBack()
            return
        }
        setErrorMessage(`Ocorreu um erro ao tentar gravar os dados. - Erro - ${status}`)
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

    const renderError = () => <Text style={{ color: colors.RED, fontSize: 18, fontWeight: 'bold', marginTop: 8 }}>{errorMessage}</Text>


    return (
        <KeyboardAvoidingView style={{ flex: 1, alignItems: 'center', paddingVertical: 20 }}>
            <AutocompleteInput data={patients} inputText={patientName} onSelect={handleSelection} label='Pacientes' disabled={isEditing} />
            <View style={{ height: 16 }} />
            <AutocompleteInput data={physicians} inputText={physicianName} onSelect={handleSelection} label='Médicos' disabled={isEditing} />
            <View style={{ height: 16 }} />
            <Input label='Descrição' onChangeText={(text) => setDescription(text)} value={description} multiline bigTextBox />
            {errorMessage != '' ? renderError() : null}
            <Button label='Salvar' onPress={submitData} />
            <Button label='Cancelar' onPress={() => navigation.goBack()} />

        </KeyboardAvoidingView >
    )
}

export default AddEditPrescriptionScreen
