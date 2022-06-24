const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // Returns the table rows from Category as an array of objects while including product_name from the Product table
  Category.findAll(
    {
      include: {
        model: Product,
        attributes: ['product_name']
      }
    }
  )
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      // Logs the error if it occurs
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // Returns a single table row from Category's id row, also includes category_id from the Product Table
  Category.findOne({
    where: {
      // Requesting the id parameter from the requested URL
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['category_id']
    }
  })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      // Logs the error if it occurs
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // Creates a new column in the Category table
  Category.create({
    // Requesting the category_name property from the requested JSON Object or String
    category_name: req.body.category_name
  })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  //Updates a category based on its id value
  Category.update(
    {
      // Requesting the category_name property from the requested JSON Object or String
      category_name: req.body.category_name
    },
    {
      where: {
        // Requesting the id parameter from the requested URL
        id: req.params.id
      }
    })
    .then(categoryData => {
      // If the category id doesnt exist then it will log an error
      if (!categoryData) {
        res.status(404).json({ message: 'No Category with this ID exits' });
        return;
      }
      // Sends a JSON response of categoryData
      res.json(categoryData);
    })
    .catch(err => {
      // If there is an error, it will log an error
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // Deletes a category by its id value
  Category.destroy({
    where: {
      // Requesting the id parameter from the requested URL
      id: req.params.id
    }
  })
    .then(categoryData => {
      // If the category id doesnt exist then it will log an error
      if (!categoryData) {
        res.status(404).json({ message: 'No Category with this ID exits' });
        return;
      }
      // Sends a JSON response of categoryData
      res.json(categoryData);
    })
    .catch(err => {
      // If there is an error, it will log an error
      console.log(err);
      res.status(500).json(err);
    });
});

// Exports as a module to be used in other files
module.exports = router;
