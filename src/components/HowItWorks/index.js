import React from "react";

import fetchSortAndFilterHowItWorksResponse from "../../services/how-it-works.service";
import "./index.css";

export default class HowItWorks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  async componentDidMount() {
    const howItWorksResponse = await fetchSortAndFilterHowItWorksResponse();
    this.setState({ data: howItWorksResponse });
  }

  padStepNumber(number, padLength) {
    if (number.length < padLength) {
      return number.padStart(padLength, "0");
    }
    return number;
  }

  render() {
    const data = this.state.data;
    const items = data.map(step => (
      <div key={step.id} className="how-it-works-item">
        <h1>{this.padStepNumber(step.stepNumber, 2)}</h1>
        <hr />
        <h4>{step.title}</h4>
        <p>{step.body}</p>
      </div>
    ));
    return (
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="how-it-works-container">{items}</div>
      </section>
    );
  }
}
