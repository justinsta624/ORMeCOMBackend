const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag, through: ProductTag }],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag, through: ProductTag }],
    });
    if (!productData) {
      res.status(404).json({ message: 'No specific product was found for this ID' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
    const { product_name, price, stock, tagIds } = req.body;
    /* req.body should look like this...
      {
        product_name: "Basketball",
        price: 200.00,
        stock: 3,
        tagIds: [1, 2, 3, 4]
      }
    */
    const productData = await Product.create({ product_name, price, stock, tagIds })

    // if there's product tags, we need to create pairings to bulk create in the ProductTag model
    if (tagIds && tagIds.length) {
      const productTagIdArr = tagIds.map((tag_id) => ({
        product_id: productData.id,
        tag_id,
      }));
      await ProductTag.bulkCreate(productTagIdArr);
    }

    // if no product tags, just respond
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// UPDATE product
router.put('/:id', async (req, res) => {
  try {
    // Attempt to update the product using the Sequelize
    const [affectedRows] = await Product.update(req.body, {
      where: { id: req.params.id },
    });

    // Check if any rows were affected by the update
    if (affectedRows > 0) {
      // Check if there are tagIds in the request body, and if so, handle product tags
      if (req.body.tagIds && req.body.tagIds.length) {
        // Fetch existing product tags from the database
        const productTags = await ProductTag.findAll({
          where: { product_id: req.params.id },
        });

        const productTagIds = productTags.map(({ tag_id }) => tag_id);
        const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => ({ product_id: req.params.id, tag_id }));

        // Bulk create new product tags
        await ProductTag.bulkCreate(newProductTags);

        // Identify tags to be removed
        const tagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);

        // Remove tags from the database
        await ProductTag.destroy({ where: { id: tagsToRemove } });
      }

      // Fetch the productData from the database with associated category and tags
      const productData = await Product.findByPk(req.params.id, {
        include: [{ model: Category }, { model: Tag, through: ProductTag }],
      });

      // Respond with the productData
      res.status(200).json(productData);
    } else {
      // If no rows were affected, respond with a 404 Not Found status and a message
      res.status(404).json({ message: 'No specific product was found for this ID' });
    }
  } catch (err) {
    // Handle any errors that occur during the update process
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!productData) {
      res.status(404).json({ message: 'No specific product was found for this ID' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
