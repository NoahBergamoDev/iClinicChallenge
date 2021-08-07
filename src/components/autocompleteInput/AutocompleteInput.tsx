import React, { useEffect } from 'react'
import { useState } from 'react'
import { FC } from 'react'
import {  ScrollView } from 'react-native'
import {
    Patient,
    Physician,
} from '../../screens/precriptionList/types/PrescriptionTypes'
import Input from '../input/Input'
import {
    Container,
    DropdownContainer,
    DropdownItemContainer,
    DropdownItemName,
    DropdownItemNameContainer,
} from './styles'

interface Props {
    label: string
    inputText: string
    data: (Patient | Physician)[]
    onSelect: (item: Patient | Physician) => void
    disabled?: boolean
}

const AutocompleteInput: FC<Props> = props => {
    const [text, setText] = useState<string>('')
    const [expanded, setExpanded] = useState<boolean>(false)
    const [filteredData, setFilteredData] = useState<(Patient | Physician)[]>(
        []
    )

    const { data, label, onSelect, disabled, inputText } = props

    useEffect(() => {
        if (filteredData && filteredData.length > 0) {
            setExpanded(true)
        } else {
            setExpanded(false)
        }
    }, [text])

    useEffect(() => {
        setText(inputText)
    }, [inputText])

    const inputHandler = (_text: string) => {
        if (text.length > _text.length && _text.length > 0) {
            setExpanded(true)
        }
        setText(_text)
        filterData(_text)
    }

    const filterData = (text: string) => {
        const _filteredData: (Patient | Physician)[] = (
            data as Array<Patient | Physician>
        ).filter((obj: Patient | Physician) => {
            const patient = obj as Patient
            if (patient.id != undefined) {
                return patient.name.toLowerCase().includes(text.toLowerCase())
            } else {
                const physician = obj as Physician
                return physician.name.toLowerCase().includes(text.toLowerCase())
            }
        })
        setFilteredData(_filteredData)
    }

    const handleSelection = (item: Patient | Physician) => {
        setText(item.name)
        setFilteredData([])
        setExpanded(false)
        onSelect(item)
    }

    return (
        <Container>
            <Input
                label={label}
                onChangeText={inputHandler}
                value={text}
                flatBottom={expanded}
                disabled={data.length === 0 || disabled}
            />
            {expanded && (
                <DropdownContainer size={filteredData.length}>
                    <ScrollView>
                        {filteredData?.map((item, index) => (
                            <DropdownItemContainer
                                key={`${item.id}${item.name}${index}`}
                                onPress={() => handleSelection(item)}
                            >
                                <DropdownItemNameContainer>
                                    <DropdownItemName>
                                        {item.name}
                                    </DropdownItemName>
                                </DropdownItemNameContainer>
                            </DropdownItemContainer>
                        ))}
                    </ScrollView>
                </DropdownContainer>
            )}
        </Container>
    )
}

export default AutocompleteInput
