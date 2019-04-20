/* eslint-disable no-undef */

import React from 'react'
import { WelcomeSwitch } from './WelcomeSwitch'
import { render, fireEvent, cleanup } from 'react-testing-library'

/*
	Straight from:
	https://jestjs.io/docs/en/tutorial-react
*/

afterEach(cleanup)

it('gives an example of a DOM test', () => {
	const { queryByLabelText, getByLabelText } = render(<WelcomeSwitch />)

	expect(queryByLabelText(/off/i)).toBeTruthy()

	fireEvent.click(getByLabelText(/off/i))

	expect(queryByLabelText(/on/i)).toBeTruthy()
})
