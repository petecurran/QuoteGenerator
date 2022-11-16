const root = ReactDOM.createRoot(document.getElementById('root'));

function Share(props){
  const quoteString = "https://twitter.com/intent/tweet?text=" 
  + props.quote + " - " + props.author;
  
  return (
    <div id="share-box">
    <a href={quoteString} id="tweet-quote" target="_blank" rel="noreferrer noopener"><i className="fa-brands fa-square-twitter fa-2xl"></i></a>
    </div>
    );
}

function Quote(props){
  return (
    <div id="quote-text">
          <h3 id="text" className="h3 mb-4">{props.quote}</h3>
          <h5 id="author" className="blockquote-footer">{props.author}</h5>
     </div>
      );
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      quote:null,
      author:null,
      possibleColors:['#69D2E7','#A7DBD8','#E0E4CC','#F38630','#FA6900'],
      currentColor:null
    };
    this.handleClick = this.handleClick.bind(this);
    //Run a simulated click once to choose a colour and quote.
    this.handleClick();
    
  }
  
  chooseColor(){
    //Chooses a new background color, which must be different from the current one.
    let choice = this.state.currentColor;
    do{
      choice = this.state.possibleColors[Math.floor(Math.random() * this.state.possibleColors.length)];
    } while (choice == this.state.currentColor);
    this.setState({currentColor:choice});
    return choice;
  }
  
  handleClick(){
    //Fetch the new quote and author from the API
    fetch('https://api.quotable.io/random')
    .then((response) => response.json())
    .then((data) => this.setState({quote:data.content,author:data.author}))  
    document.body.style.backgroundColor = this.chooseColor();

  }

  render() {

    return (
      <div id="wrapper">
        <div id="quote-box">
          <Quote quote={this.state.quote} author={this.state.author}/>
          <Share author={this.state.author} quote={this.state.quote}/>  
          <button id="new-quote" className="btn btn-secondary" onClick={this.handleClick}>Generate a new quote</button>   
        </div>
      </div>
    );
  }
}

const app = <App />;
root.render(app)
      