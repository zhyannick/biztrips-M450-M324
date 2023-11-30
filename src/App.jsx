import React, {useEffect, useState} from "react";
import "./App.css";

import Footer from "./Footer";
import Header from "./Header";
import TripList from "./components/TripList";
import Wishlist from "./components/Wishlist";


export default function App() {

  const [month, setMonth] = useState("");
  const [trips, setTrips] = useState([]);
  const months = ["Idle", "Jan", "Feb", "March", "April", "Mai", "June"];
  const [wishlist, setWishlist] = useState([]); // [1,2,3,4,5

    // fetch trips from server
  useEffect(() => {
    // get the trips from the server
    //getTrips().then((data) => setTrips(data));
    // get the trips from the server with fetch
    fetch("http://localhost:3001/trips")
        .then((response) => response.json())
        .then((data) => setTrips(data))
        .catch((err) => console.error(err));

  }, []);


  // wishlist functions
    function addToWishlist(id,title,description,startTrip,endTrip) {
        setWishlist( (trip) => {
          const tripInWishlist = trip.find((t) => t.id === id);
          if (tripInWishlist) {
            return trip;
          } else {
            return [...trip, { id, title, description, startTrip, endTrip }];
          }
        } );
    }

    function removeFromWishlist(id) {
        setWishlist((trip) => trip.filter((t) => t.id !== id));
    }

    function clearWishlist() {
        setWishlist([]);
    }


  function renderTrip(t) {
    return (
      <div className="product" key={t.id}>
        <figure>
          <div>
            <img src={"images/items/" + t.id + ".jpg"} alt="name " />
          </div>
          <figcaption>
            <a href="#. . . ">{t.title}</a>
            <div>
              <span>
                {t.startTrip[2] + "-" + t.startTrip[1] + "-" + t.startTrip[0]}
              </span>
            </div>
            <p>{t.description}</p>
            <div>
              <button type="button" >
                Add to Wishlist
              </button>
            </div>
          </figcaption>
        </figure>
      </div>
    );
  }
  // if month selected then filter the trips from month === month
  const filteredTrips = month
    ? trips.filter((t) => t.startTrip[1] === parseInt(month))
    : trips;

  // if error then throw the errror

  // shorthand for react fragment
  return (
    <>
      <div>
        <Header />
        <main>
          <h1>Welcome to biztrips 2023</h1>



         {/*<Wishlist wishlist={wishlist} removeFromWishlist={removeFromWishlist()} clearWishlist={clearWishlist()}/>*/}
          <section id="filters">
            <label htmlFor="month">Filter by Month:</label>
            <select
              id="month"
              value={month} // controlled component
              onChange={(e) => {
                //debugger;
                setMonth(e.target.value);
              }}
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
                Found {filteredTrips.length}
                {filteredTrips.length > 1 ? " trips" : " trip"} for the month of
                {" " + months[month]}
              </h2>
            )}
          </section>
          {/*<TripList trips={filteredTrips} addToWishlist={addToWishlist} />*/}
          <section id="products">{filteredTrips.map(renderTrip)}</section>
        </main>
      </div>
      <Footer />
    </>
  );
}
