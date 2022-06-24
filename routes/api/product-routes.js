const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // Returns the table rows from Product as an array of objects while including category_name from the Category table and tag_name from the Tag table
  Product.findAll(
    {
      include: [
        {
          model: Category,
          attributes: ['category_name']
        },
        {
          model: Tag,
          attributes: ['tag_name']
        }
      ]
    }
  )
    .then(productData => res.json(productData)) // Sends a JSON response of productData
    .catch(err => {
      // Logs the error if it occurs
      console.log(err);
      res.status(500).json(err);
    });
});

// get one product
router.get('/:id', (req, res) => {
  // Returns a single table row from Product's id row, also includes category_name from the Category Table and tag_name from the Tag table
  Product.findOne({
    where: {
      // Requesting the id parameter from the requested URL
      id: req.params.id
    },
    include: [{
      model: Category,
      attributes: ['category_name']
    },
    {
      model: Tag,
      attributes: ['tag_name']
    }
    ]
  })
    .then(productData => res.json(productData)) // Sends a JSON response of productData
    .catch(err => {
      // Logs the error if it occurs
      console.log(err);
      res.status(500).json(err);
    });
});


// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // Deletes a product by its id value
  Product.destroy({
    where: {
      // Requesting the id parameter from the requested URL
      id: req.params.id
    }
  })
    .then(productData => {
      // If the product id doesnt exist then it will log an error
      if (!productData) {
        res.status(404).json({ message: 'No product with this ID exits' });
        return;
      }
      // Sends a JSON response of categoryData
      res.json(productData);
    })
    .catch(err => {
      // If there is an error, it will log an error
      console.log(err);
      res.status(500).json(err);
    });
});

// Exports as a module to be used in other files
module.exports = router;
