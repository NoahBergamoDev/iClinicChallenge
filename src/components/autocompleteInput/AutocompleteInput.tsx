import React, { FC } from 'react'
import { ScrollView } from 'react-native'
import { Patient, Physician } from '../../utils/types/Types'
import Input from '../input/Input'
import {
    Container,
    DropdownContainer,
    DropdownItemContainer,
    DropdownItemName,
    DropdownItemNameContainer,
} from './styles'
import useAutoCompleteInput, { AutoCompleteProps } from './useAutoCompleteInput'

const AutocompleteInput: FC<AutoCompleteProps> = props => {
    const {
        data,
        label,
        disabled,
        text,
        expanded,
        filteredData,
        inputHandler,
        handleSelection,
    } = useAutoCompleteInput(props) // importing state and props from an custom hooks, to separate logic from UI components.

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
