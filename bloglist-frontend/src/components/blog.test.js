import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'



describe('<Blog />', () => {
    let component


    const user = {
        username: 'fäsä',
        name: 'fäsä',
        password: 'fäsä'
    }

    const blog = {
        title: 'testi title',
        author: 'testi author',
        url: 'testi.url',
        user: {
            username: 'fäsä',
            name: 'fäsä',
            password: 'fäsä'
        },
        likes: 1337

    }

    beforeEach(() => {
        component = render(
            <Blog key={blog.id} blog={blog} user={user} />
        )
    })


    test('renders content, but doesnt display url or likes', () => {



        expect(component.container).toHaveTextContent('testi title')
        expect(component.container).toHaveTextContent('testi author')

        const div = component.container.querySelector('.togglableContent')

        expect(div).toHaveStyle('display: none')
    })

    test('displays url and likes when view button is pressed', () => {

        

        const button = component.container.querySelector('button')
        fireEvent.click(button)

        const div = component.container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')


    })

    test('like button if pressed twice calls likeHandler twice', () => {



        const mockHandler = jest.fn()

        const component = render(
            <Blog blog={blog} user={user} likeHandler={mockHandler} />
        )

        const button = component.container.querySelector('.saku')
        fireEvent.click(button)
        fireEvent.click(button)


      //  const likeButton = component.container.getByText('like')

       /* const likeButton = component.container.querySelector(
            'button:nth-child(3)'
          )

        fireEvent.click(likeButton)
        
        fireEvent.click(likeButton) */

        expect(mockHandler.mock.calls.length).toBe(2)



    })

})