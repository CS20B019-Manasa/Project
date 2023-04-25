import bcrypt from 'bcryptjs';
// data of users and products
const data = {
    users: [
        {
          name: 'admin',
          email: 'admin@example.com',
          password: bcrypt.hashSync('123456'),
          isAdmin: true,
        },
        {
          name: 'user',
          email: 'user@example.com',
          password: bcrypt.hashSync('123456'),
          isAdmin: false,
        },
      ],
    products: [
        {
            name: 'Roukma Shirt',
            slug: 'roukma-shirt',
            category: 'Shirts',
            image: '/images/s1.jpg',
            price: 400,
            countInStock: 20,
            brand: 'Roukma',
            rating: 4,
            no_of_reviews: 25,
            description: 'Quality is good',
        },
        {
            name: 'Biba Palazoo pant',
            slug: 'biba-palazoo-pant',
            category: 'Pants',
            image: '/images/s2.jpg',
            price: 450,
            countInStock: 15,
            brand: 'Biba',
            rating: 4.5,
            no_of_reviews: 35,
            description: 'Quality is good and very comfort',
        },
        {
            name: 'Nike Tshirt',
            slug: 'nike-tshirt',
            category: 'TShirts',
            image: '/images/s3.jpg',
            price: 300,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.2,
            no_of_reviews: 15,
            description: 'Cloth is so smooth',
        },
        {
            name: 'Nike Hoodie',
            slug: 'nike-hoodie',
            category: 'Hoodies',
            image: '/images/s4.jpg',
            price: 800,
            countInStock: 6,
            brand: 'Nike',
            rating: 4.6,
            no_of_reviews: 45,
            description: 'Quality is good',
        },
    ],
};
export default data;