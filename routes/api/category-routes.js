const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryValue = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryValue)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryValue = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!categoryValue) {
      res.status(404).json({ message: 'No specific category was found for this ID' });
      return;
    }
    res.status(200).json(categoryValue);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryValue = await Category.create(req.body);
    res.status(200).json(categoryValue);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    // Attempt to update the category using the Sequelize
    const [affectedRows] = await Category.update(req.body, {
      where: { id: req.params.id },
    });

    // Check if any rows were affected by the update
    if (affectedRows > 0) {
      // If at least one row was affected, fetch the categoryValue from the database
      const categoryValue = await Category.findByPk(req.params.id);
      // Respond with the categoryValue
      res.status(200).json(categoryValue);
    } else {
      // If no rows were affected, respond with a 404 Not Found status and a message
      res.status(404).json({ message: 'No specific category was found for this ID' });
    }
  } catch (err) {
    // Handle any errors that occur during the update process
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const categoryValue = await Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(categoryValue => res.status(200).json(categoryValue))
    .catch((err) => {
      res.status(500).json(err)
    })
});

module.exports = router;
