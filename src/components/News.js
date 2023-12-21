import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

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

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsNest`;
  }

  async updateNews() {
    this.props.setProgress(0);
    console.log("update");
    this.setState({ loading: true });
    this.props.setProgress(25);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(50);
    let parseData = await data.json();
    this.props.setProgress(75);
    console.log(parseData);
    this.setState({
      loading: false,
      // articles: parseData.articles,
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    console.log("first-mounting");
    this.updateNews();
  }

  handlePrevClick = async () => {
    console.log("prev");
    this.setState({ page: this.state.page - 1 }, () => {
      this.updateNews();
    });
  };
  handleNextClick = async () => {
    console.log("next");
    this.setState({ page: this.state.page + 1 }, () => {
      this.updateNews();
    });
  };

  fetchData = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.updateNews();
      }
    );
  };
  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px 0" }}>
          {this.capitalizeFirstLetter(this.props.category)} - Top Headlines
        </h1>
        {/* {this.state.loading && <Loading />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length} //This is important field to render the next data
          next={this.fetchData}
          hasMore={this.state.totalResults >= this.state.articles.length}
          loader={this.state.articles && <Loading />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((e, index) => {
                return (
                  <div className="col-md-4" key={index}>
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
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}
