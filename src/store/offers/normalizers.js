export const normalizeCategories = (categories) => {
  return categories.map((category) => {
    return {
      id: category.Id,
      name: category.Name,
      sort: category.DisplayOrder,
      image: category.ImageUrl,
      sub: category.ChildCategories ? normalizeCategories(category.ChildCategories.Categories) : [],
    }
  })
}

const getRandomBetween = (min, max) => Math.floor((Math.random() * ((max - min) + 1)) + min)
export const normalizeOffers = (offers) => {
  return offers.map((offer) => {
    const categories = normalizeCategories(offer.Categories)
    return {
      id: offer.Id,
      sharePoints: getRandomBetween(1, 950), // from server
      buyPoints: getRandomBetween(2, 1240), // from server
      expirationDate: offer.EndDate,
      title: offer.Title,
      image: offer.ImageUrl,
      icon: offer.Advertiser && offer.Advertiser.ImageUrl,
      totalUsers: getRandomBetween(3, 324), // should be real number
      users: [ // should be array from the server
        { image: 'http://www.uncle-andrew.net/blog/pics/aaron_paul.jpg' },
        { image: 'https://i.pinimg.com/736x/de/1e/fe/de1efef55429481f3b9d8daf14686e82--beautiful-eyes-most-beautiful.jpg' },
        { image: 'https://s-media-cache-ak0.pinimg.com/736x/e9/70/67/e970671faa03af41e716cd7e63385034--unique-faces-face-reference.jpg' },
      ],
      description: offer.Description,
      typeImage: categories && categories[0].image,
      location: {
        lat: offer.Lat,
        lng: offer.Long,
      },
      categories,
    }
  })
}
