import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResult: null,
      author: "",
      text: "",
      isLoaded: false,
      bgColor: "#f99192",
      clickCount: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.generateQuote();
    this.changeColor();
  }

  componentDidMount() {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
      {
        headers: {
          Accept: "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          apiResult: responseData.quotes,
          isLoaded: true,
          author: responseData.quotes[0].author,
          text: responseData.quotes[0].quote,
          quotesArrayLength: responseData.quotes.length
        });
      })
      .catch(error => this.setState({ error }));
  }

  generateQuote = () => {
    const chosenQuote = [];
    const quotes = this.state.apiResult;
    let randomNumber = Math.floor(Math.random() * this.state.apiResult.length);

    quotes.forEach(function(element, index) {
      if (index === randomNumber) {
        chosenQuote.push(element);
      }
    });
    this.setState({
      text: chosenQuote[0].quote,
      author: chosenQuote[0].author
    });
  };

  changeColor = () => {
    const color = ["#a0855b", "#00bdaa", "#2a6171", "#ff00c8", "#76a21e"];
    let i = this.state.clickCount;

    this.setState({
      clickCount: this.state.clickCount + 1
    });

    if (i < 4) {
      this.setState({
        bgColor: color[i]
      });
    } else if (i >= 4) {
      this.setState({
        bgColor: color[i],
        clickCount: 0
      });
    } else if (i === 0) {
      this.setState({
        clickCount: this.state.clickCount + 1,
        bgColor: color[i]
      });
    }
  };

  render() {
    return (
      <div id="main">
        <style>
          {`
          :root {
            --main-bg-color: ${this.state.bgColor};
            --main-txt-color: ${this.state.bgColor};
            }
          `}
        </style>
        <h1 id="title">Random Quote Machine</h1>
        <div id="quote-box">
          <p id="text">{this.state.text}</p>
          <p id="author"> - {this.state.author}</p>
          <a href="https://twitter.com/intent/tweet" id="tweet-quote">
            Twitt
          </a>
          <button id="new-quote" onClick={this.handleClick}>
            New Quote
          </button>
        </div>
        <H1>See Code on Github</H1>
      </div>
    );
  }
}

export default App;
