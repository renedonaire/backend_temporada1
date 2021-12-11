const faker = require('faker')
faker.locale = 'es'


const product = faker.commerce.product()
const price = faker.commerce.price()
const image = faker.image.unsplash.image(640, 640, product)
