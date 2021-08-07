import React, { FC } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { colors } from '../../../utils/'
import { Prescription } from '../../../utils/types/Types'

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
        <TouchableOpacity
            style={{
                flex: 1,
                backgroundColor: 'white',
                marginVertical: 8,
                padding: 20,
                borderRadius: 8,
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    fontSize: 20,
                    color: colors.BLACK,
                    fontWeight: 'bold',
                    marginBottom: 8,
                }}
            >
                {patient.name}
            </Text>
            <Text
                style={{
                    fontSize: 16,
                    color: colors.MEDIUM_GRAY,
                    marginBottom: 4,
                }}
            >
                {physician.name}
            </Text>
            <Text
                style={{
                    fontSize: 16,
                    color: colors.MEDIUM_GRAY,
                }}
            >
                <Text style={{ fontWeight: 'bold' }}>CRM: </Text>
                {physician?.crm?.split('-', 2)[1]}
            </Text>
        </TouchableOpacity>
    )
}

export default PrescriptionListItem
