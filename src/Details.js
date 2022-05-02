// import { useParams } from "react-router-dom";
import { Component } from "react";

class Details extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
  }

  render() {
    if (this.state.loading) {
      return <h2>Loading ... </h2>;
    }

    const { animal, breed, city, state, description, name } = this.state;

    return (
      <div className="details">
        <h1>{name}</h1>
        <h2>
          {animal} - {breed} - {city}, {state}
        </h2>
        <button>Adopot {name}</button>
        <p>{description}</p>
      </div>
    );
  }
}

export default Details;
