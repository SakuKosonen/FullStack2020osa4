const listHelper = require('../utils/list_helper')

describe('total likes', () => {
    const listWithBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a522aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger Jestkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 9,
        __v: 0
      }

      

    ]
  
    test('favorite blog is favorite', () => {
      const result = listHelper.favoriteBlog(listWithBlogs)
      const rightResult = {
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger Jestkstra',
          likes: 9
      }
      expect(result).toEqual(rightResult)
    })
  })