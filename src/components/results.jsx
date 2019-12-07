import React from "react";

class Results extends React.Component {
  state = {
    cuisines: []
  };

  // getCuisinesInCity = () => {
  //   if (!this.props.cityId) {
  //     console.log("cityId is empty.");
  //     return;
  //   }
  //   fetch(
  //     `https://developers.zomato.com/api/v2.1/cuisines?city_id=${this.props.cityId}`,
  //     {
  //       headers: {
  //         "Content-Type": "text/json",
  //         "user-key": process.env.REACT_APP_ZOMATO_API_KEY
  //       }
  //     }
  //   )
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data);
  //       let cuisines = data.cuisines.map(d => {
  //         return d.cuisine.cuisine_name;
  //       });
  //       console.log(cuisines);
  //       this.setState({ cuisines });
  //       return;
  //     });
  // };

  render() {
    return (
      <div>
        <h1>Results</h1>
        <h2>Zipcode</h2>
        <p>{this.props.zipcode}</p>
        <h2>Geolocation</h2>
        <p>
          <span>Longitude: {this.props.coords.longitude}</span>
          <br />
          <span>Latitude: {this.props.coords.latitude}</span>
          <br />
          <span>
            Accurate by more or less {this.props.coords.accuracy} meters.
          </span>
          <br />
          <span>City id: {this.props.cityId}</span>
          <br />
        </p>
        <span>
          Cuisines nearby:{" "}
          <ul>
            {this.props.cuisines.map(c => (
              <li>{c}</li>
            ))}
          </ul>
        </span>
      </div>
    );
  }
}

export default Results;
