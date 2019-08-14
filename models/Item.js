const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  sku: {
    type: Number,
    required: true,
    unique: true
  },
  expDate: {
    type: Date,
    required: true
  },
  expMonth: {
    type: String
  },
  quantity: {
    type: Number,
    required: true
  },
  section: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  reducedToHalf: {
    type: Boolean
  },
  reducedTo10: {
    type: Boolean
  }
});

module.exports = Item = mongoose.model('item', ItemSchema);
