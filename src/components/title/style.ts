import styled from 'styled-components/native'

interface TitleTextProps {
    left?: boolean
}
export const TitleText = styled.Text<TitleTextProps>`
    font-size: 26px;
    font-weight: bold;
    margin-vertical: 24px;
    align-self: ${({ left }) => (left ? 'flex-start' : 'center')};
`
