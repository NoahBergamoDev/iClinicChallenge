import React from 'react'
import { FC } from 'react'
import { View, Text, TextInput, KeyboardType } from 'react-native'
import { colors } from '../../utils/colors'

interface Props {
    value: string;
    onChangeText: (text: any) => void;
    onBlur?: () => void;
    label: string;
    placeholder?: string;
    secureTextEntry?: boolean;
    keyboardType?: KeyboardType;
}

const Input: FC<Props> = ({ label, placeholder, value, onChangeText, onBlur, secureTextEntry = false, keyboardType = 'default' }) => {

    return (
        <View style={{ width: '90%', marginVertical: 8, justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{label}</Text>
            <View style={{ height: 8 }} />
            <TextInput style={{ borderWidth: 1, borderRadius: 8, borderColor: colors.LIGHT_GRAY, fontSize: 16 }} placeholder={placeholder} value={value} onChangeText={onChangeText} onBlur={onBlur} secureTextEntry={secureTextEntry} autoCapitalize='none' keyboardType={keyboardType} />

        </View>
    )
}

export default Input
