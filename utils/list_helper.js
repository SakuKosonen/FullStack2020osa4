const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let total = 0
  blogs.forEach(function (item, index, array) {
    //console.log(item, index)
    total = total + item.likes
  })

  return total
}

const favoriteBlog = (blogs) => {
  let favorite = {
    title: "none",
    author: "none",
    likes: 0
  }
  


  blogs.forEach(function (item, index, array) {
    //console.log(item, index)
    
    if (item.likes >= favorite.likes) {
      let newFavorite = {
        title: item.title,
        author: item.author,
        likes: item.likes       
      }

      favorite = newFavorite

    }
  })
  console.log(favorite)
  return favorite

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}