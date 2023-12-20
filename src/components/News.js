import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from "prop-types";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ea77b81198974dca8ae97ac4faedc359&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      loading: false,
      articles: parseData.articles,
      totalResults: parseData.totalResults,
    });
  }

  handlePrevClick = async () => {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=ea77b81198974dca8ae97ac4faedc359&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log("prev", parseData);
    this.setState({
      loading: false,
      page: this.state.page - 1,
      articles: parseData.articles,
    });
  };
  handleNextClick = async () => {
    this.setState({ loading: true });
    console.log(this.state.page);
    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=ea77b81198974dca8ae97ac4faedc359&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedata = await data.json();
      console.log(parsedata);
      this.setState({
        loading: false,
        page: this.state.page + 1,
        articles: parsedata.articles,
      });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "35px 0" }}>
          NewsNest - Top Headlines
        </h1>
        {this.state.loading && <Loading />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles?.map((e) => {
              return (
                <div className="col-md-4" key={e.url}>
                  <NewsItem
                    title={e.title ? e.title : ""}
                    discription={e.description ? e.description : ""}
                    imgUrl={e.urlToImage}
                    newsUrl={e.url}
                    author={e.author}
                    date={e.publishedAt}
                    source={e.source.name}
                  />
                </div>
              );
            })}
          <div className="Container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              onClick={this.handlePrevClick}
              className="btn btn-lg btn-dark"
            >
              ❮Previous
            </button>
            <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              type="button"
              onClick={this.handleNextClick}
              className="btn btn-lg btn-dark"
            >
              Next❯
            </button>
          </div>
        </div>
      </div>
    );
  }
}
