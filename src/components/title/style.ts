import styled from 'styled-components/native'

interface TitleTextProps {
    left?: boolean
}
export const TitleText = styled.Text<TitleTextProps>`
    font-size: 26px;
    font-weight: bold;
    margin: 24px 0 24px 0;
    align-self: ${({ left }) => (left ? 'flex-start' : 'center')};
`
