import React from 'react'
import { FC } from 'react'
import { Text } from 'react-native'
import { TitleText } from './style'

interface Props {
    text: string
    left?: boolean
}

const Title: FC<Props> = props => {
    const { left, text } = props
    return <TitleText left={left}>{text}</TitleText>
}

export default Title
