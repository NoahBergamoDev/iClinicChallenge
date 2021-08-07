import styled from 'styled-components/native'
import { colors } from '../../utils/'

export const Container = styled.View`
    width: 90%;
    justify-content: center;
    margin-top: 16px;
`
export const LabelText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${colors.DARK_GRAY};
    margin-bottom: 8px;
`

interface InputStyleProps {
    bigTextBox: boolean
    disabled: boolean
    flatBottom: boolean
}

export const InputStyle = styled.TextInput<InputStyleProps>`
    border-radius: 8px;
    min-height: ${({ bigTextBox }) => (bigTextBox ? '200px' : '40px')};
    text-align-vertical: ${({ bigTextBox }) => (bigTextBox ? 'top' : 'center')};
    border-width: 1px;
    border-color: ${colors.LIGHT_GRAY};
    background-color: ${({ disabled }) =>
        disabled ? colors.LIGHT_GRAY : colors.WHITE};
    font-size: 16px;
    border-bottom-left-radius: ${({ flatBottom }) => (flatBottom ? 0 : '8px')};
    border-bottom-right-radius: ${({ flatBottom }) => (flatBottom ? 0 : '8px')};
`
