import React, { Component } from "react";
import axios from 'axios';
import CardBookApp from "../cards/cardBookApp.jsx";
import SearchSelection from "./searchSelection.jsx";

class SearchApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      search: "",
      activeTab: "all",
      recommendCards: [],
    };
    this.onSearchTitleHandler = this.onSearchTitleHandler.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try {
      const response = await axios.get("https://tsukirama.pythonanywhere.com/api/posts/");
      this.setState({
        cards: response.data,
        recommendCards: response.data,
      });
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  }

  onSearchTitleHandler(title) {
    this.setState({
      search: title,
    });
  }

  handleTabChange(tabId) {
    this.setState({
      activeTab: tabId,
    });
  }

  render() {
    const { cards, search, activeTab } = this.state;

    const filteredCards = cards.filter((card) =>
      card.title.toLowerCase().includes(search.toLowerCase())
    );

    const displayedCards =
      activeTab === "all"
        ? filteredCards
        : filteredCards.filter(
            (card) => card.category_name.toLowerCase() === activeTab.toLowerCase()
          );

    return (
      <div className="container d-flex flex-column gap-4">
        <div className="container d-flex flex-column gap-4">
          <h2 className="fs-4 fw-bold">Cari Novel yang Ingin Kamu Baca</h2>
          <SearchSelection onSearch={this.onSearchTitleHandler} />
          <CardBookApp
            cards={displayedCards}
            recommendCards={this.state.recommendCards}
            handleTabChange={this.handleTabChange}
            activeTab={activeTab}
          />
        </div>
      </div>
    );
  }
}

export default SearchApp;
