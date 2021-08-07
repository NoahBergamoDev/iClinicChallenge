import React from 'react'
import { FC } from 'react'
import { KeyboardType } from 'react-native'
import { Container, InputStyle, LabelText } from './styles'

interface Props {
    value: string
    onChangeText?: (text: any) => void
    onBlur?: () => void
    label: string
    placeholder?: string
    secureTextEntry?: boolean
    keyboardType?: KeyboardType
    disabled?: boolean
    multiline?: boolean
    bigTextBox?: boolean
    flatBottom?: boolean
}

const flatBottomBorder = {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
}

const Input: FC<Props> = ({
    label,
    placeholder,
    value,
    onChangeText,
    onBlur,
    secureTextEntry = false,
    keyboardType = 'default',
    disabled = false,
    multiline = false,
    bigTextBox = false,
    flatBottom = false,
}) => {
    return (
        <Container>
            <LabelText>{label}</LabelText>
            <InputStyle
                pointerEvents='box-only'
                multiline={multiline}
                flatBottom={flatBottom}
                disabled={disabled}
                bigTextBox={bigTextBox}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                onBlur={onBlur}
                secureTextEntry={secureTextEntry}
                autoCapitalize='none'
                keyboardType={keyboardType}
                editable={!disabled}
            />
        </Container>
    )
}

export default Input
