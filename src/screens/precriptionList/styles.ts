import styled from 'styled-components/native'
import { colors } from '../../utils'

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    padding: 16px;
`

export const SearchContainer = styled.View`
    width: 100%;
    align-items: center;
`

export const FooterContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding-vertical: 4px;
    height: 40px;
`

export const FooterText = styled.Text`
    color: ${colors.MEDIUM_GRAY};
`
