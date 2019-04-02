import React, { Component } from "react";
import axios from "axios";

import "./App.css";

class App extends Component {
  state = {
    originalUrl: "",
    urlList: []
  };

  shortenUrl = async () => {
    let originalUrl = this.state.originalUrl;
    const response = await axios.post("http://localhost:3001/create", {
      url: originalUrl
    });
    this.setState({ originalUrl: "" });
    this.componentDidMount();
  };

  visitUrl = async url => {
    const response = await axios.post("http://localhost:3001/visit", {
      shortUrl: url.shortUrl
    });
  };

  componentDidMount = async () => {
    let urlList = [...this.state.urlList];
    const response = await axios.get("http://localhost:3001/urls");
    urlList = response.data;
    this.setState({ urlList: urlList });
  };

  handleChange = event => {
    this.setState({ originalUrl: event.target.value });
  };
  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>Simplify your links</h1>
          <div style={{ display: "flex" }}>
            <input
              value={this.state.originalUrl}
              onChange={event => this.handleChange(event)}
              placeholder="Your original URL here"
            />
            <button onClick={this.shortenUrl}>
              <p>SHORTEN URL</p>
            </button>
          </div>
        </div>
        <div className="body">
          <div className="flexList">
            <p style={{ flex: 3 }}>Original URL</p>
            <p style={{ flex: 3 }}>Short URL</p>
            <p style={{ flex: 1 }}>Visits</p>
          </div>
          {this.state.urlList.map(url => {
            return (
              <div key={url._id} className="urlRow">
                <p style={{ flex: 3 }}>
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href={url.originalUrl}
                  >
                    {url.originalUrl}
                  </a>
                </p>
                <p onClick={() => this.visitUrl(url)} style={{ flex: 3 }}>
                  <a href={"http://localhost:3000/"}>
                    {"https://short-url-JULIAN-MANTET.herokuapp.com/" +
                      url.shortUrl}
                  </a>
                </p>
                <p style={{ flex: 1 }}>{url.visits}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
