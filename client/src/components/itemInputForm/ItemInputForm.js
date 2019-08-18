import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createItem } from '../../actions/item';

//Make ItemInputForm as a modal. Or maybe in the sideNav?

const ItemInputForm = ({ createItem }) => {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    expDate: '',
    expMonth: '',
    expYear: '',
    quantity: '',
    section: '',
    user: null,
    reduceto10: false,
    reduceToHalf: false
  });

  const { name, sku, expDate, quantity } = formData;

  const onChange = e => {
    return setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const dateData = formData.expDate.split('/');

    if (dateData.length === 2) {
      formData.expDate = `${dateData[1]}-${dateData[0]}`;
    } else if (dateData.length === 3) {
      formData.expDate = `${dateData[1]}-${dateData[0]}-${dateData[2]}`;
    }

    formData.expMonth = new Date(formData.expDate).getMonth();
    formData.expYear = new Date(formData.expDate).getFullYear();

    createItem(formData);
  };

  return (
    <div className="container">
      <form className="grid" onSubmit={e => handleSubmit(e)}>
        <div className="">
          <label htmlFor="sku">Sku</label>
          <input
            id="sku"
            className="form"
            type="text"
            placeholder="#000000"
            name="sku"
            value={sku}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="">
          <label htmlFor="product">Product</label>
          <input
            id="product"
            className="form"
            type="text"
            placeholder="Product Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="">
          <label htmlFor="expDate">Exp</label>
          <input
            id="expDate"
            className="form"
            type="text"
            placeholder="d/m/y"
            name="expDate"
            value={expDate}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="">
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            className="form"
            type="text"
            placeholder="quantity"
            name="quantity"
            value={quantity}
            onChange={e => onChange(e)}
          />
        </div>
        <input className="button" type="submit" value="Update" />
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    items: Object.values(state.items)
  };
};

export default connect(
  mapStateToProps,
  { createItem }
)(ItemInputForm);