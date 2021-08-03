import axios from 'axios'
import React, { useEffect } from 'react'
import { FC } from 'react'
import { View, Text } from 'react-native'

interface Props {

}
interface Prescription {
    id: string,
    client_id: string,
    patient_id: string,
    physician_id: string,
    text: string,
    patient_or_physician_name: string
}

const PrescriptionList: FC<Props> = (props) => {
    useEffect(() => {
        const prescriptions: Promise<Prescription[]> = getPrescriptions();
    }, [])

    const getPrescriptions: () => Promise<Prescription[]> = async function () {
        const arr: Prescription[] = [{ id: '1', client_id: '1', patient_id: '1', physician_id: '1', text: 'this is the prescription', patient_or_physician_name: '1' }];
        return arr
    }

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>PrescriptionList! Iha!!!</Text>
        </View>
    )
}

export default PrescriptionList
