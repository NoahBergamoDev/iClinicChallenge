import React, { FC } from 'react'
import { View, Text, requireNativeComponent } from 'react-native'

const AddPhysician = requireNativeComponent('ICAddPhysician')

interface Props {}

const AddPhysicianScreen: FC<Props> = (props) => {
    return (
        <View style={{ flex: 1 }}>
            <AddPhysician style={{ flex: 1 }} />
        </View>
    )
}

export default AddPhysicianScreen
