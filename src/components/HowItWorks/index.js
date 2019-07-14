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
        <div className="how-it-works-content">
          <h1 className="step-number">
            {this.padStepNumber(step.stepNumber, 2)}
          </h1>
          <h4 className="step-title">{step.title}</h4>
          <p className="step-body">{step.body}</p>
        </div>
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
