const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // Returns the table rows from Tag as an array of objects while including the Product table
  Tag.findAll(
    {
      include: {
        model: Product
      }
    }
  )
    .then(tagData => res.json(tagData)) // Sends a JSON response of productData
    .catch(err => {
      // Logs the error if it occurs
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // Returns a single table row from Tag's id row, also includes Product table
  Tag.findOne({
    where: {
      // Requesting the id parameter from the requested URL
      id: req.params.id
    },
    include: {
      model: Product
    }
  })
    .then(tagData => res.json(tagData)) // Sends a JSON response of productData
    .catch(err => {
      // Logs the error if it occurs
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // Creates a new tag
  Tag.create({
    // Requesting the tag_name property from the requested JSON Object or String
    tag_name: req.body.tag_name
  })
    .then(tagData => res.json(tagData)) // Sends a JSON response of tagData
    .catch(err => {
      // Logs the error if it occurs
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // Updates a tag's name by its id value
  Tag.update(
    {
      // Requesting the tag_name property from the requested JSON Object or String
      tag_name: req.body.tag_name
    },
    {
      where: {
        // Requesting the id parameter from the requested URL
        id: req.params.id
      }
    })
    .then(tagData => {
      // If the Tag id doesnt exist then it will log an error
      if (!tagData) {
        res.status(404).json({ message: 'No Tag with this ID exits' });
        return;
      }
      // Sends a JSON response of tagData
      res.json(tagData);
    })
    .catch(err => {
      // Logs the error if it occurs
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // Deletes a tag by its id value
  Tag.destroy({
    where: {
      // Requesting the id parameter from the requested URL
      id: req.params.id
    }
  })
    .then(tagData => {
      // If the Tag id doesnt exist then it will log an error
      if (!tagData) {
        res.status(404).json({ message: 'No Tag found by that ID.' });
        return;
      }
      // Sends a JSON response of tagData
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      // Logs the error if it occurs
      res.status(500).json(err);
    });
});

// Exports as a module to be used in other files
module.exports = router;
