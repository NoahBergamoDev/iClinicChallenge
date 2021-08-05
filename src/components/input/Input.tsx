import React from 'react'
import { FC } from 'react'
import { View, Text, TextInput, KeyboardType } from 'react-native'
import { colors } from '../../utils/colors'

interface Props {
    value: string;
    onChangeText?: (text: any) => void;
    onBlur?: () => void;
    label: string;
    placeholder?: string;
    secureTextEntry?: boolean;
    keyboardType?: KeyboardType;
    disabled?: boolean;
    multiline?: boolean;
    bigTextBox?: boolean;
}

const Input: FC<Props> = ({ label, placeholder, value, onChangeText, onBlur, secureTextEntry = false, keyboardType = 'default', disabled = false, multiline = false, bigTextBox = false }) => {

    return (
        <View style={{ width: '90%', marginVertical: 8, justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{label}</Text>
            <View style={{ height: 8 }} />
            <TextInput multiline={multiline} style={{ minHeight: bigTextBox ? 350 : 40, textAlignVertical: bigTextBox ? 'top' : 'center', borderWidth: 1, borderRadius: 8, borderColor: colors.LIGHT_GRAY, backgroundColor: disabled ? colors.LIGHT_GRAY : colors.WHITE, fontSize: 16 }} placeholder={placeholder} value={value} onChangeText={onChangeText} onBlur={onBlur} secureTextEntry={secureTextEntry} autoCapitalize='none' keyboardType={keyboardType} editable={!disabled} />
        </View>
    )
}

export default Input
