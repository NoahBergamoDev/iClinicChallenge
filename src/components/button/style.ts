import styled from 'styled-components/native'
import { colors } from '../../utils/'

interface ButtonProps {
    loading?: boolean
}
export const ButtonContainer = styled.TouchableOpacity<ButtonProps>`
    width: 90%;
    height: 50px;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    padding: 8px;
    margin: 16px 0px;
    background-color: ${props =>
        props.disabled && !props.loading
            ? colors.LIGHT_GRAY
            : colors.PRIMARY_BLUE};
`

export const ButtonText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${colors.WHITE};
`
