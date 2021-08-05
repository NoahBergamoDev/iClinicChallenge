import { NavigationProp, Route } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { FC } from 'react'
import { View, Text } from 'react-native'
import Button from '../../components/button/Button'
import Input from '../../components/input/Input'
import { editPrescription } from './services'
import { Patient, Physician, Prescription } from '../precriptionList/types/PrescriptionTypes'

interface Props {
    route: Route<any, any>;
    navigation: NavigationProp<any, any>
}

const AddEditPrescriptionScreen: FC<Props> = (props) => {
    const { navigation, route: { params } } = props
    const [description, setDescription] = useState<string>('')

    const [patientName, setPatientName] = useState<string>('')
    const [patient, setPatient] = useState<Patient>()

    const [physicianName, setPhysicianName] = useState<string>('')
    const [physician, setPhysician] = useState<Physician>()

    const isEditing = params?.editPrescription

    useEffect(() => {
        navigation.setOptions({
            headerTitle: isEditing ? 'Alterar Prescrição' : 'Adicionar Prescrição'
        })
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


    const submitData = async () => {
        if (isEditing) {
            editPrescription(patient?.id, physician?.id, description, params?.prescriptionId)
        }
        // createPrescription({ clinic_id: 0, patient_id: patient?.id, physician_id: physician?.id, text: description })
    }


    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Input label='Médico' onChangeText={(text) => setPhysicianName(text)} value={physicianName} disabled={isEditing} />
            <Input label='Paciente' onChangeText={(text) => setPatientName(text)} value={patientName} disabled={isEditing} />
            <Input label='Descrição' onChangeText={(text) => setDescription(text)} value={description} multiline bigTextBox />
            <Button label='Salvar' onPress={submitData} />
            <Button label='Cancelar' onPress={() => console.log('cancelar')} />
        </View>
    )
}

export default AddEditPrescriptionScreen
