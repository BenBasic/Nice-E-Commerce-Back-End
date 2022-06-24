// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Makes the Product table belong to the Category table based on their category_id
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

// Category table will have one or multiple Product tables based on their category_id
Category.hasMany(Product, {
  foreignKey: 'category_id',
});

// Creates a relationship between Product and Tag tables while using ProductTag as a join table based on product_id
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id'
});

// Creates a relationship between Tag and Product tables while using ProductTag as a join table based on tag_id
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id'
});

// Exports the Product, Category, Tag, and ProductTag modules to use in other files
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
