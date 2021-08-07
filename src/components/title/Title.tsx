import React from 'react'
import { FC } from 'react'
import { Text } from 'react-native'
import { TitleText } from './style'

interface Props {
    text: string
    left?: boolean
}

const Title: FC<Props> = props => {
    const { left } = props
    return <TitleText left={left}>{props.text}</TitleText>
}

export default Title
