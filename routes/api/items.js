const express = require('express');
const router = express.Router();
const Item = require('../../models/Item');

// @route     Get api/items
// @desc      Get all items
// @access    Public
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    //Todo: if(!items)
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     Get api/items/:month
// @desc      Get items by month
// @access    Public
router.get('/:month', async (req, res) => {
  try {
    const items = await Item.find({ expMonth: req.params.month });
    //Todo: if(!items)
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/items
// @desc      Create item
// @access    Public
router.post('/', async (req, res) => {
  const {
    name,
    sku,
    expDate,
    expMonth,
    quantity,
    section,
    user,
    reduceToHalf,
    reduceto10
  } = req.body;

  try {
    let item = await Item.findOne({ name });
    if (item) {
      return res.status(400).json({
        errors: [{ msg: 'Item already logged' }]
      });
    }

    item = new Item({
      name,
      sku,
      expDate,
      expMonth,
      quantity,
      section,
      user,
      reduceToHalf,
      reduceto10
    });

    await item.save();
    res.json(item);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route     DELETE api/items/:id
// @desc      Delete item
// @access    Public
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }
    await item.remove();
    res.json({ msg: 'Item removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Item not found' });
    }
  }
});

module.exports = router;
