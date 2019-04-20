/* eslint-disable no-undef */

import React from 'react'
import { Welcome } from './Welcome'
import renderer from 'react-test-renderer'

/*
	Straight from:
	https://jestjs.io/docs/en/tutorial-react
*/

it('gives an example of a Snapshot test', () => {
	const component = renderer.create(<Welcome />)

	let tree = component.toJSON()
	expect(tree).toMatchSnapshot()
})
