import React from 'react'
import renderer from 'react-test-renderer'
import { Button } from '../src/components'

const props = {
    label: 'Button Text',
    onPress: () => {},
}
test('renders correctly', () => {
    const tree = renderer
        .create(<Button label={props.label} onPress={props.onPress} />)
        .toJSON()
    expect(tree).toMatchSnapshot()
})
