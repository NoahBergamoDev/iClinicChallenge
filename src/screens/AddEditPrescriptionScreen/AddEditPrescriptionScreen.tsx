import React, { FC, useEffect, useState } from 'react'
import { NavigationProp, RouteProp } from '@react-navigation/native'

import { Patient, Physician } from '../../utils/types/Types'
import { Button, Input, AutocompleteInput } from '../../components/'
import { getPatients, getPhysicians, submitPrescription } from './services'
import { AutoCompletesContainer, ButtonContainer, Container } from './styles'
import Toast from 'react-native-toast-message'
import { Alert } from 'react-native'
import useAddEditPrescriptionScreen, {
    AddEditPrescriptionScreenProps,
} from './useAddEditPrescriptionScreen'

const AddEditPrescriptionScreen: FC<AddEditPrescriptionScreenProps> = props => {
    const {
        description,
        setDescription,
        patientName,
        patients,
        physicians,
        physicianName,
        isEditing,
        submitData,
        handleSelection,
        onBack,
        loading,
        dataHasChanged,
    } = useAddEditPrescriptionScreen(props)
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
