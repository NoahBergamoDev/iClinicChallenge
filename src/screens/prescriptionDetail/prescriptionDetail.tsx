import React from 'react'
import { FC } from 'react'
import { View, Text } from 'react-native'

interface Props {

}

const PrescriptionDetail: FC<Props> = (props) => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>PrescriptionDetail! Iha!!!</Text>
        </View>
    )
}

export default PrescriptionDetail
