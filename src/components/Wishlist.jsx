import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// deconstruct props
export default function Wishlist({ wishlist, removeFromWishlist, clearWishlist }) {
  // as constant variant 2
  const itemsMapped = wishlist.map((item, index) => (
    <WishlistItem
      deleteItem={removeFromWishlist}
      item={item}
      key={index}
    />
  ));

  const empty = (
    <tr>
      <td colSpan="4">
        {" "}
        <p className="alert alert-info">Cart is empty</p>
      </td>
    </tr>
  );

  return (
    <div className="container">
      <React.Fragment>
        <div className="row">
          <div className="col-sm-12">
            <div className="card table-responsive">
              <table className="table table-hover shopping-cart-wrap">
                <thead className="text-muted">
                  <tr>
                    <th scope="col">Trip</th>
                    <th scope="col" width="200">
                      Quantity
                    </th>
                    <th scope="col" width="120">
                      Price
                    </th>
                    <th scope="col" width="200" className="text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>{itemsMapped.length > 0 ? itemsMapped : empty}</tbody>
                <tfoot>
                  <tr>
                    <th align="right" scope="col">
                      <p className="alert alert-success">
                        Add USD 5.00 of eligible items to your order to qualify
                        for FREE Shipping.{" "}
                      </p>
                    </th>
                    <th scope="col">
                      <dl className="dlist-align">
                        <dt>Total price: </dt>
                        <dt>USD </dt>
                      </dl>
                    </th>
                    <th scope="col" />
                    <th scope="col">
                      <button
                        //onClick={heartItem}
                        className="btn btn-outline-success fa fa-heart fa-xs"
                      />
                      <button
                        className="btn btn-outline-danger"
                        onClick={clearWishlist}
                        disabled={itemsMapped.length === 0}
                      >
                        empty wishlist
                      </button>
                    </th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
}

function WishlistItem(props) {
  // deconstruct props
  const { updateQuantity, deleteItem } = props;
  // props
  let { id, title, description, startdate, enddate } = props.item;

  return (
    <tr key={id}>
      <td>
        <figure className="media">
          <div className="img-wrap">
            <img
              className="img-thumbnail img-xs"
              src={"images/items/" + id + ".jpg"}
              alt="img"
            />
          </div>
          <figcaption className="media-body">
            <h6 className="h6">{title}</h6>
            <dl className="dlist-inline small">
              <dt>Size: </dt>
              <dd>XXL</dd>
            </dl>
            <dl className="dlist-inline small">
              <dt>Color: </dt>
              <dd>Orange color</dd>
            </dl>
          </figcaption>
        </figure>
      </td>
      <td className="price-wrap price"></td>
      <td className="text-right">
        <button className="btn btn-outline-success fa fa-heart fa-xs" />
        <i className="fa-regular fa-heart"></i>
        <button
          className="btn btn-outline-danger"
          onClick={() => deleteItem(props.item)} // App deleteItem
        >
          delete Item
        </button>
      </td>
    </tr>
  );
}
