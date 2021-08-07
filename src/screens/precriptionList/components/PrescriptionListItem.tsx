import React, { FC } from 'react'
import { Prescription } from '../../../utils/types/Types'
import {
    BoldText,
    Container,
    CRMText,
    PatientNameText,
    PhysicianNameText,
} from './styles'

interface Props {
    prescription: Prescription
    onPress: () => void
}

const PrescriptionListItem: FC<Props> = props => {
    const {
        onPress,
        prescription: { patient, physician },
    } = props
    return (
        <Container onPress={onPress}>
            <PatientNameText>{patient.name}</PatientNameText>
            <PhysicianNameText>{physician.name}</PhysicianNameText>
            <CRMText>
                <BoldText>CRM: </BoldText>
                {`${physician?.crm?.split('-', 2)[1].substring(0, 40)}...`}
            </CRMText>
        </Container>
    )
}

export default PrescriptionListItem
