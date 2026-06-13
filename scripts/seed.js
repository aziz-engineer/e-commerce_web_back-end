const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Product = require('../models/product');
const Category = require('../models/category');
const connect = require('../config/connect');

async function seed(){
  try{
    // ensure connection
    await mongoose.connection;

    // create category
    let category = await Category.findOne({ name: 'General' });
    if(!category){
      category = await Category.create({ name: 'General', description: 'Default category' });
      console.log('Created category', category._id);
    }

    const products = [
      {
    title: "T-shirt Basique",
    description: "T-shirt simple و مريح للاستعمال اليومي",
    price: 19.99,
    stock: 80,
    category: category._id
  },
  {
    title: "Sneakers Sport",
    description: "Chaussures sport خفاف و مريحين للركض",
    price: 49.99,
    stock: 40,
    category: category._id
  },
  {
    title: "Sac à Dos Lycée",
    description: "Sac à dos spacieux",
    price: 39.99,
    stock: 60,
    category: category._id
  },
  {
    title: "Montre Classique",
    description: "Montre élégant",
    price: 59.99,
    stock: 25,
    category: category._id
  }
      ];

    for(const p of products){
      const exists = await Product.findOne({ title: p.title });
      if(!exists){
        await Product.create(p);
        console.log('Created product', p.title);
      }
    }

    console.log('Seeding complete');
    process.exit(0);
  }catch(err){
    console.error(err);
    process.exit(1);
  }
}

seed();
