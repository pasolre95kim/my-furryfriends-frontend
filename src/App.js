import React, { Component, Fragment } from "react";
import { Header, Icon, Menu } from "semantic-ui-react";
import { Route, Link, Switch, Redirect, withRouter } from "react-router-dom";
import AllAnimals from "./components/AllAnimals";
import "./App.css";
import Home from "./components/Home";
import LogInForm from "./components/LogInForm";
import SignUpForm from "./components/SignUpForm";
import AdoptedAnimals from "./components/AdoptedAnimals";
import AnimalDetails from "./components/AnimalDetails";
import AddAnimalForm from "./components/AddAnimalForm";
import ArticleDetails from "./components/ArticleDetails";
import AllArticles from "./components/AllArticles";
import Article from "./components/Article";

const articlesURL = "http://localhost:3000/articles";
const animalsURL = "http://localhost:3000/animals";
const adoptionsURL = "http://localhost:3000/adoptions";
const usersURL = "http://localhost:3000/users";
const profileURL = "http://localhost:3000/profile";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
      allAnimals: [],
      adoptedAnimals: [],
      allArticles: [],
      searchTerm: "",
      currentAnimal: "",
      admin: false
    };
  }

  /*
componentDidMount()
Fetch all animals & articles from when DOM loads. Stores animals in State
   */
  componentDidMount() {
    this.checkForToken();

    fetch(animalsURL)
      .then(resp => resp.json())
      .then(animals =>
        this.setState({
          allAnimals: animals
        })
      );
    this.fetchArticles();
  }

  // fetch articles from API and store JSON object in state
  fetchArticles = () => {
    fetch(articlesURL)
      .then(resp => resp.json())
      .then(articles => {
        this.setState({
          allArticles: articles
        });
      });
  };

  /* function checkForToken()  Retrieves current User & validates User's token from localStorage.
   If token validated, sets token and authorizes current User.
returns [Boolean]
 */
  checkForToken = () => {
    let token = localStorage.getItem("token");
    if (token) {
      fetch(profileURL, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.json())
        .then(data => {
          if (!data.error) {
            localStorage.setItem("user", JSON.stringify(data.user));
            this.setState({
              currentUser: data.user,
              adoptedAnimals: data.user.adoptions
            });
            if (data.user.admin === true) {
              this.setState({
                admin: true
              });
            }
          }
        });
    }
  };

  /*
   *  adding animal to [adoptedAnimals] array
   */
  addAnimal = animal => {
    this.setState({
      adoptedAnimals: [...this.state.adoptedAnimals, animal]
    });
  };

  /*
   *  Adding new animal from `New Animal` form
   */
  addNewAnimal = animal => {
    this.setState({
      allAnimals: [...this.state.allAnimals, animal]
    });
  };

  /*
Deleting animal from [adoptedAnimals] array
`newArray` updated list adopted animals
   */
  deleteAnimal = newArray => {
    this.setState({
      adoptedAnimals: newArray
    });
  };

  /*
 Deleting animal from [allAnimals] array
`newArray` updated list all animals
   */
  deleteFromAll = newArray => {
    this.setState({
      allAnimals: newArray
    });
  };

  // Sets the current animal
  setCurrentAnimal = animal => {
    this.setState({
      currentAnimal: animal
    });
  };

  // updates current user's adoption details
  updateCurrentUser = (user, adoptions) => {
    if (user.admin === true) {
      this.setState({
        admin: true,
        currentUser: user,
        adoptedAnimals: adoptions
      });
    } else {
      this.setState({
        admin: false,
        currentUser: user,
        adoptedAnimals: adoptions
      });
    }
  };

  // log out current user
  logOut = event => {
    alert("You have been signed out");
    localStorage.removeItem(`token`);
    this.setState({ currentUser: null });
  };

  // event handler for search bar
  onSearchHandler = event => {
    event.preventDefault();
    this.setState({ searchTerm: event.target.value });
  };

  //Finding article Id for Article Details Page
  //Route for Article Details on line 222
  findArticle = id => {
    let article = this.state.allArticles.find(a => a.id === parseInt(id));
    return article;
  };

  render() {
    return (
      <div className="App">
        <Header
          as="h1"
          icon
          textAlign="center"
          as={Link}
          to="/"
          style={{ fontSize: "170%" }}
        >
          <img
            src="https://i.etsystatic.com/14984992/r/il/2120fc/1560256262/il_570xN.1560256262_eaom.jpg"
            className="ui circular image"
          />
          My Furry Friends
          <Header.Subheader>Your Life long friends</Header.Subheader>
        </Header>
        <div
          className="ui secondary menu"
          style={{ fontSize: "130%" }}
          color="brown"
        >
          <Link to="/" className="item">
            Home
          </Link>
          <Link to="/adopt" className="item">
            Adopt
          </Link>
          <Link to="/myadoption" className="item">
            My Adoptions
          </Link>
          <Link to="/allArticles" className="item">
            Resources
          </Link>
          {this.state.admin ? (
            <Link to="/newAnimalForm" className="item">
              New Animal Form
            </Link>
          ) : null}

          <div className="right menu">
            <div className="item">
              <div className="ui icon input">
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={this.onSearchHandler}
                />

                <i aria-hidden="true" className="search icon" />
              </div>
            </div>

            {this.state.currentUser ? (
              <Fragment>
                <Menu.Item
                  onClick={this.logOut}
                  className="item"
                  name="Sign Out"
                />
              </Fragment>
            ) : (
              <Menu.Item as={Link} to="/login" name="Login" />
            )}
          </div>
        </div>

        <div className="ui yellow segments" />

        <Switch>
          <Route
            path="/signup"
            render={() =>
              this.state.currentUser ? (
                <Redirect to="/adopt" />
              ) : (
                <SignUpForm updateCurrentUser={this.updateCurrentUser} />
              )
            }
          />

          <Route
            path="/login"
            render={() =>
              this.state.currentUser ? (
                <Redirect to="/adopt" />
              ) : (
                <LogInForm
                  checkForToken={this.checkForToken}
                  updateCurrentUser={this.updateCurrentUser}
                />
              )
            }
          />

          <Route
            path="/myadoption"
            render={() => {
              return (
                <AdoptedAnimals
                  adoptedAnimals={this.state.adoptedAnimals}
                  deleteAnimal={this.deleteAnimal}
                  user={this.state.currentUser}
                />
              );
            }}
          />

          <Route
            path="/adopt/:id"
            render={props => {
              let animalId = props.match.params.id;
              let findAnimal = this.state.allAnimals.find(
                a => a.id === parseInt(animalId)
              );
              if (this.state.currentUser) {
                return (
                  <AnimalDetails
                    animal={findAnimal}
                    user={this.state.currentUser}
                    addAnimal={this.addAnimal}
                  />
                );
              } else {
                return <Redirect to="/login" />;
              }
            }}
          />

          <Route
            path="/adopt"
            render={() => {
              return (
                <AllAnimals
                  allAnimals={this.state.allAnimals}
                  user={this.state.currentUser}
                  adoptAnimal={this.adoptAnimal}
                  currentAnimal={this.state.currentAnimal}
                  addAnimal={this.addAnimal}
                  admin={this.state.admin}
                  deleteFromAll={this.deleteFromAll}
                  filterTerm={this.state.searchTerm}
                  onSearchHandler={this.onSearchHandler}
                />
              );
            }}
          />

          <Route
            path="/newAnimalForm"
            render={() =>
              this.state.currentAnimal ? (
                <Redirect to="/adopt" />
              ) : (
                <AddAnimalForm
                  user={this.state.currentUser}
                  addNewAnimal={this.addNewAnimal}
                  setCurrentAnimal={this.setCurrentAnimal}
                />
              )
            }
          />

          <Route
            path="/articles/:id"
            render={props => {
              let articleId = props.match.params.id;
              let findArticle = this.findArticle(articleId);
              if (this.state.currentUser) {
                return (
                  <ArticleDetails
                    article={findArticle}
                    user={this.state.currentUser}
                  />
                );
              } else {
                return <Redirect to="/login" />;
              }
            }}
          />

          <Route
            path="/articles"
            render={() => {
              return <Article allArticles={this.state.allArticles} />;
            }}
          />

          <Route
            path="/allArticles"
            render={() => {
              return (
                <AllArticles
                  allArticles={this.state.allArticles}
                  user={this.state.currentUser}
                />
              );
            }}
          />

          <Route
            path="/"
            render={() => {
              return <Home user={this.state.currentUser} />;
            }}
          />
        </Switch>

        <div className="ui yellow segments" />
        <br />
        <div>
          Signing in at My Furry Friends means you acknowledge to our Terms and
          Conditions of Use and Privacy Policy.
        </div>
        <br />
        <p>© 2019</p>
        <br />
      </div>
    );
  }
}

export default App;
// <Nav logged_in={!!this.state.currentUser} logout={this.logout}/>
// {this.checkForToken ?: localStorage.setItem("token", "")}

//if currentUser's admin is true, let the addNewAnimal form visible
// {this.state.currentUser.admin ? : null}
