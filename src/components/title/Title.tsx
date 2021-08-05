import React from 'react'
import { FC } from 'react';
import { View, Text } from 'react-native'

interface Props {
    text: string;
    left?: boolean
}

const Title: FC<Props> = (props) => {
    const { left } = props;
    return (
        <Text style={{
            fontSize: 26, fontWeight: 'bold', marginVertical: 24, alignSelf: left ? 'flex-start' : 'center'
        }}>{props.text}</Text>
    )
}

export default Title
