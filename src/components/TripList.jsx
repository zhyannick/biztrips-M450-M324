import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {testTrips} from "./api";
import PropTypes from 'prop-types';


// functional component ProductList, deconstruct props!
function TripList({ addToWishlist }) {
  const [month, setMonth] = useState("");
  const [trips] = useState(testTrips);
  const months = ["Idle", "Jan", "Feb", "March", "April", "Mai", "June"];

  const filteredTrips = month
    ? trips.filter((t) => Array.isArray(t.startTrip) && t.startTrip[1] === parseInt(month))
    : trips;

  const empty = (
    <section>
      <p className="alert alert-info">Productlist is empty</p>
    </section>
  );

  return (
    <div className="container">
      <section>
        <h2 className="h4">Triplist-Catalog</h2>
        <section id="filters">
          <label htmlFor="month">Filter by Month:</label>
          <select
            id="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="">All Months</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">Mai</option>
            <option value="6">June</option>
          </select>
          {month && (
            <h2>
              Found {filteredTrips.length}{" "}
              {filteredTrips.length === 1 ? "trip" : "trips"} for the month of{" "}
              {months[parseInt(month)]}
            </h2>
          )}
        </section>
        <div className="row">
          {filteredTrips.length > 0 
            ? filteredTrips.map((trip) => (
                <Trip addToWishlist={addToWishlist} trip={trip} key={trip.id} />
              ))
            : empty}
        </div>
      </section>
    </div>
  );
}

function Trip({ addToWishlist, trip }) {
  const { id, title, description } = trip;

  return (
    <div className="col-sm-6 col-md-4 col-lg-3">
      <figure className="card card-product">
        <div className="img-wrap">
          <img 
            src={"images/items/" + id + ".jpg"} 
            alt={`Image of ${title}`} 
            onError={(e) => { e.target.src = 'images/default.jpg'; }} 
          />
        </div>
        <figcaption className="info-wrap">
          <h6 className="title">{title}</h6>
          <p className="card-text">{description}</p>
          <button
            type="button"
            className="btn btn-link btn-outline"
            onClick={() => addToWishlist(trip)}
          >
            <i className="fa fa-shopping-cart" /> Add to Wishlist
          </button>
        </figcaption>
      </figure>
    </div>
  );
}

TripList.propTypes = {
  addToWishlist: PropTypes.func.isRequired,
};

Trip.propTypes = {
  addToWishlist: PropTypes.func.isRequired,
  trip: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    startTrip: PropTypes.arrayOf(PropTypes.number).isRequired,
    endTrip: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
};

export default TripList;