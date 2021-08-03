import React from 'react'
import { View, Text } from 'react-native'

interface Props {
    text: string
}

const Title = (props: Props) => {
    return (
        <Text style={{ fontSize: 26, fontWeight: 'bold', alignSelf: 'center', marginVertical: 24 }}>{props.text}</Text>
    )
}

export default Title
