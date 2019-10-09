
import React, {Component, Fragment} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import background from '../imgs/backgroundpic.png'
import {Link} from 'react-router-dom'


//Check how to add backgroun image!
// <img src="https://www.pixelstalk.net/wp-content/uploads/2016/07/Cute-Baby-Animal-Background-Download-Free.jpg" />


// <img className="add" src="http://2.bp.blogspot.com/-EZPlNgf_oDM/Tp-31Pv8d8I/AAAAAAAAAhQ/N2FHNHIDj04/s1600/Cute-Dog-Wallpaper.jpg" />

const animalsURL = "http://localhost:3000/animals"

class AddAnimalForm extends Component {
  constructor(props){
    super(props)
    this.state={
      name:"",
      adoptionFee: "",
      image: "",
      health: "",
      breed: "",
      age: "",
      gender: "",
      preferredHome: "",
      species: ""
    }
  }

  handleChange = event => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {

    event.preventDefault()
    let data = {
      name: this.state.name,
      age: this.state.age,
      gender: this.state.gender,
      adoptionFee: this.state.adoptionFee,
      image: this.state.image,
      breed: this.state.breed,
      health: this.state.health,
      preferredHome: this.state.preferredHome,
      species: this.state.species
    }
    fetch(animalsURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts" : "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(data => {
      this.props.addNewAnimal(data)
      this.props.setCurrentAnimal(data)
      console.log(data)
    })
  }

  render() {
    return (
    <Fragment>
      <MDBContainer
        className="text-center"
        style={{width: "40%"}}
        >
        <img class="ui fluid image"
          src = {background}/>
        <MDBRow >
          <MDBCol>
            <form  onSubmit={this.handleSubmit}>
              <p className="h4 text-center mb-4">New Animal Form</p>

              <label name="name" className="grey-text">
                Name
              </label>
              <input
                type="text"
                id="defaultFormRegisterNameEx"
                className="form-control"
                name="name"
                onChange={this.handleChange}
                placeholder="Name..."
                required
              />

              <label className="grey-text" >
                Type
              </label>
              <input
                type="text"
                id="defaultFormRegisterPasswordEx"
                className="form-control"
                name="species"
                onChange={this.handleChange}
                placeholder="Type..."
                required
              />

              <label name="name" className="grey-text">
                  Adoption Fee
                </label>
              <input
                type="text"
                id="defaultFormRegisterNameEx"
                className="form-control"
                name="adoptionFee"
                onChange={this.handleChange}
                placeholder="Adoption Fee..."
                required
              />

                <label name="name" className="grey-text">
                  Picture
                </label>
                <input
                  type="text"
                  id="defaultFormRegisterNameEx"
                  className="form-control"
                  name="image"
                  onChange={this.handleChange}
                  placeholder="Picture..."
                  required
                />

              <label name="name" className="grey-text">
                  Health
                </label>
                <input
                  type="text"
                  id="defaultFormRegisterNameEx"
                  className="form-control"
                  name="health"
                  onChange={this.handleChange}
                  placeholder="Health..."
                  required
                />

              <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                Age
              </label>
              <input
                type="text"
                id="defaultFormRegisterEmailEx"
                className="form-control"
                name="age"
                onChange={this.handleChange}
                placeholder="Age..."
                required
              />

              <label className="grey-text">
              Breed
              </label>
              <input
                type="text"
                id="defaultFormRegisterConfirmEx"
                className="form-control"
                name="breed"
                onChange={this.handleChange}
                placeholder="Breed..."
                required
              />

              <label className="grey-text">
                Gender
              </label>
              <input
                type="text"
                id="defaultFormRegisterPasswordEx"
                className="form-control"
                name="gender"
                onChange={this.handleChange}
                placeholder="Gender..."
                required
              />

              <label className="grey-text">
              Preferred Home Environment
              </label>
              <input
                type="text"
                id="defaultFormRegisterConfirmEx"
                className="form-control"
                name="preferredHome"
                onChange={this.handleChange}
                placeholder="Good in home with..."
                required
              />

              <div className="text-center mt-4">
                <MDBBtn color="warning" outline
                  type="submit">
                  Register
                </MDBBtn>

              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <br />
      <br />
      </Fragment>

    );
  };
}

  export default AddAnimalForm;
