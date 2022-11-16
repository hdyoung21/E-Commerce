const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const test = await Tag.findAll({
      include: [{model: Product }]
    })
    res.status(200).json(categories);
  }
  catch (err) {
    res.status(404).json(err);
  }
  
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const data = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    res.status(200).json(categories);
  }
  catch (err) {
    res.status(404).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((newTag) => 
    res.json(newTag))

.catch((err) => {
  res.json(err)
})
});


router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      id: req.body.id,
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.body.id,
      }
    }
  )
  .then((updatedTag) => {
    res.json(updatedTag);
  })
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id:req.params.id
    }
  })
  .then((deletedTag) => {
    res.json(deletedTag);
  })
});

module.exports = router;
