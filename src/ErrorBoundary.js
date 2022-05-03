import { Component } from "react";
import { Link, Navigate } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false, timeLeft: 5 };
  timer;

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => {
        this.setState({ redirect: true });
      }, 5000);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to="/" />;
    } else if (this.state.hasError) {
      return (
        <p>
          Something went wrong. <Link to="/">Click to return</Link> or you will
          be redirecred in {this.state.timeLeft} sec.
        </p>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
