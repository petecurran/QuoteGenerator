const root = ReactDOM.createRoot(document.getElementById('root'));

function Share(props) {
  const quoteString = "https://twitter.com/intent/tweet?text=" +
  props.quote + " - " + props.author;

  return /*#__PURE__*/(
    React.createElement("div", { id: "share-box" }, /*#__PURE__*/
    React.createElement("a", { href: quoteString, id: "tweet-quote", target: "_blank", rel: "noreferrer noopener" }, /*#__PURE__*/React.createElement("i", { className: "fa-brands fa-square-twitter fa-2xl" }))));


}

function Quote(props) {
  return /*#__PURE__*/(
    React.createElement("div", { id: "quote-text" }, /*#__PURE__*/
    React.createElement("h3", { id: "text", className: "h3 mb-4" }, props.quote), /*#__PURE__*/
    React.createElement("h5", { id: "author", className: "blockquote-footer" }, props.author)));


}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: null,
      author: null,
      possibleColors: ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900'],
      currentColor: null };

    this.handleClick = this.handleClick.bind(this);
    //Run a simulated click once to choose a colour and quote.
    this.handleClick();

  }

  chooseColor() {
    //Chooses a new background color, which must be different from the current one.
    let choice = this.state.currentColor;
    do {
      choice = this.state.possibleColors[Math.floor(Math.random() * this.state.possibleColors.length)];
    } while (choice == this.state.currentColor);
    this.setState({ currentColor: choice });
    return choice;
  }

  handleClick() {
    //Fetch the new quote and author from the API
    fetch('https://api.quotable.io/random').
    then(response => response.json()).
    then(data => this.setState({ quote: data.content, author: data.author }));
    document.body.style.backgroundColor = this.chooseColor();

  }

  render() {

    return /*#__PURE__*/(
      React.createElement("div", { id: "wrapper" }, /*#__PURE__*/
      React.createElement("div", { id: "quote-box" }, /*#__PURE__*/
      React.createElement(Quote, { quote: this.state.quote, author: this.state.author }), /*#__PURE__*/
      React.createElement(Share, { author: this.state.author, quote: this.state.quote }), /*#__PURE__*/
      React.createElement("button", { id: "new-quote", className: "btn btn-secondary", onClick: this.handleClick }, "Generate a new quote"))));



  }}


const app = /*#__PURE__*/React.createElement(App, null);
root.render(app);