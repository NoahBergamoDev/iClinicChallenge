import React from 'react'
import { FC } from 'react'
import { StyleProp } from 'react-native'
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
    flatBottom?: boolean;
}

const flatBottomBorder = { borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }

const Input: FC<Props> = ({ label, placeholder, value, onChangeText, onBlur, secureTextEntry = false, keyboardType = 'default', disabled = false, multiline = false, bigTextBox = false, flatBottom = false }) => {

    return (
        <View style={{ width: '90%', justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{label}</Text>
            < View style={{ height: 8 }} />
            < TextInput pointerEvents='box-only' multiline={multiline} style={[{ borderRadius: 8, minHeight: bigTextBox ? 330 : 40, textAlignVertical: bigTextBox ? 'top' : 'center', borderWidth: 1, borderColor: colors.LIGHT_GRAY, backgroundColor: disabled ? colors.LIGHT_GRAY : colors.WHITE, fontSize: 16 }, flatBottom ? flatBottomBorder : null]} placeholder={placeholder} value={value} onChangeText={onChangeText} onBlur={onBlur} secureTextEntry={secureTextEntry} autoCapitalize='none' keyboardType={keyboardType} editable={!disabled} />
        </View >
    )
}

export default Input
