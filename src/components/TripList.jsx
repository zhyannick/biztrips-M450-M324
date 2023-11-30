import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getProducts } from "../services/cartService.js";

// functional component ProductList, deconstruct props!
function TripList({ trips, addToWishlist }) {




  const tripsMapped = trips.map((trip, index) => (
    <Trip addToWishlist={addToWishlist} trip={trip} key={trip.id} />
  ));

  const empty = (
    <section>
      <p className="alert alert-info">Productlist is empty</p>
    </section>
  );

  return (
    <div className="container">
      <section>
        <h4 className="h4">Trip List</h4>
        <div className="row">
          {tripsMapped.length > 0 ? tripsMapped : empty}
        </div>
      </section>
    </div>
  );
}
// deconstruct ...props
function Trip({ addToWishlist, ...props }) {
  // Props
  let { id, title, description, startdate, enddate } = props;

  return (
    <div className="col-sm-6 col-md-4 col-lg-3">
      <figure className="card card-product">
        <div className="img-wrap">
          <img src={"images/items/" + id + ".jpg"} alt="name " />
        </div>
        <figcaption className="info-wrap">
          <a href="#. . . " className="title">
            {title}
          </a>

          <p className="card-text">{description}</p>
          <div className="info-wrap row">
            <button
              type="button"
              className="btn btn-link btn-outline"
              onClick={() => addToWishlist(props.trip)}
            >
              <i className="fa fa-shopping-cart" /> Add to Cart
            </button>
          </div>
        </figcaption>
      </figure>
    </div>
  );
}

export default TripList;
