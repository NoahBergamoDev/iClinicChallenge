import styled from 'styled-components/native'
import { colors } from '../../utils/'

export const Container = styled.View`
    flex: 1;
    margin: 0px 16px;
    align-items: center;
    justify-content: center;
`
export const ErrorText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: ${colors.RED};
    margin-top: 16px;
`
