import { useParams } from "react-router-dom";
import { Component } from "react";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Details extends Component {
  state = { loading: true, showModal: false }; // due to installing @babel/plugin-proposal-class-properties

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    );

    const json = await res.json();

    this.setState(Object.assign({ loading: false }, json.pets[0]));
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    if (this.state.loading) {
      return <h2>Loading ... </h2>;
    }

    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;

    return (
      <div className="details">
        <Carousel images={images} />
        <h1>{name}</h1>
        <h2>
          {animal} - {breed} - {city}, {state}
        </h2>
        <ThemeContext.Consumer>
          {([theme]) => (
            <button
              style={{ backgroundColor: theme }}
              onClick={this.toggleModal}
            >
              Adopot {name}
            </button>
          )}
        </ThemeContext.Consumer>
        <p>{description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h2>Would you like to adopt {name} ? </h2>
              <div className="buttons">
                <a href="https://bit.ly/pet-adopt">Yes</a>
                <button onClick={this.toggleModal}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    );
  }
}

const WrapperDetails = () => {
  const params = useParams();
  return (
    <ErrorBoundary>
      <Details params={params} />{" "}
    </ErrorBoundary>
  );
};

export default WrapperDetails;
