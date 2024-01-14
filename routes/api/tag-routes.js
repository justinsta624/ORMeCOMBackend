const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagValue = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tagValue);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagValue = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });
    if (!tagValue) {
      res.status(404).json({ message: 'No specific tag was found for this ID' });
      return;
    }
    res.status(200).json(tagValue);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagValue = await Tag.create(req.body);
    res.status(200).json(tagValue);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    // Attempt to update the tag using the Sequelize
    const [affectedRows] = await Tag.update(req.body, {
      where: { id: req.params.id },
    });

    // Check if any rows were affected by the update
    if (affectedRows > 0) {
      // If at least one row was affected, fetch the tagValue from the database
      const tagValue = await Tag.findByPk(req.params.id);
      // Respond with the tagValue
      res.status(200).json(tagValue);
    } else {
      // If no rows were affected, respond with a 404 Not Found status and a message
      res.status(404).json({ message: 'No specific tag was found for this ID' });
    }
  } catch (err) {
    // If an error occurs during the update process, respond with a 500 Internal Server Error and the error details
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagValue = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!tagValue) {
      res.status(404).json({message: 'No specific tag was found for this ID'});
      return;
    }
    res.status(200).json(tagValue);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
