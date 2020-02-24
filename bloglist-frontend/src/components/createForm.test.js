import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateForm from './CreateForm'

test('<CreateForm /> updates parent state and calls onSubmit', () => {
  const createForm = jest.fn()

  const component = render(
    <CreateForm createForm={createForm} />
  )

  const input = component.container.querySelector('input')
  const form = component.container.querySelector('form')


  
  fireEvent.change(input, { 
    target: { value: 'testing of forms could be easier' } 
  })
  fireEvent.submit(form)

  expect(createNote.mock.calls.length).toBe(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing of forms could be easier' )
})