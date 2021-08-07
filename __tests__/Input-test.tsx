import React from 'react'
import renderer from 'react-test-renderer'
import { Input } from '../src/components'

const props = {
    label: 'Input Text',
    value: 'This is some value',
}

test('renders correctly', () => {
    const tree = renderer
        .create(
            <Input
                label={props.label}
                onChangeText={() => {}}
                value={props.value}
            />
        )
        .toJSON()
    expect(tree).toMatchSnapshot()
})
