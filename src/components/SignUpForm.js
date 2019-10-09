import React, {Component} from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody,  MDBModalFooter, MDBIcon, MDBCardHeader, MDBBtn } from "mdbreact";
import {Link} from 'react-router-dom'
import "font-awesome/css/font-awesome.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import background from '../imgs/backgroundpic.png'


const usersURL = "http://localhost:3000/users"

class SignUpForm extends Component {

  state={
    password:"",
    confirm_password: "",
    username: ""
  }

  postUser = (data) => {
    fetch(usersURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body:JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data)

      this.props.updateCurrentUser(data.user, data.user.adoptions)
      localStorage.setItem("token", data.jwt)
      localStorage.setItem("user", JSON.stringify(data.user))
  })
}

  handleSubmit =(event) => {
    event.preventDefault()
    if( this.state.password === this.state.confirm_password) {
      let data = {user:{
        username: this.state.username,
        password: this.state.password,
        admin: false
        }
      }
      this.postUser(data)
    } else {
      alert("Your passwords do not match")
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  render() {
  return (
<div>
  <form onSubmit={this.handleSubmit}>
    <br />
    <br />
    <MDBContainer className="text-center"
      style={{width: "40%"}}>
        <MDBCol>
        <MDBCard>
          <MDBCardBody>
            <MDBCardHeader className="form-header warm-flame-gradient rounded">
              <h3 className="my-3">
                <MDBIcon icon="lock" />
                Sign Up
              </h3>
            </MDBCardHeader>
              <label
                htmlFor="defaultFormEmailEx"
                className="grey-text font-weight-light"
              >
                Username
              </label>
              <input onChange={this.handleChange}
                type="text"
                id="defaultFormEmailEx"
                className="form-control"
                name="username"
                required
              />

              <label
                htmlFor="defaultFormPasswordEx"
                className="grey-text font-weight-light"
              >
                Your password
              </label>
              <input onChange={this.handleChange}
                type="password"
                id="defaultFormPasswordEx"
                className="form-control"
                name="password"
                required

              />

              <label
                htmlFor="defaultFormPasswordEx"
                className="grey-text font-weight-light"
              >
                Confirm Password
              </label>
              <input onChange={this.handleChange}
                type="password"
                id="defaultFormEmail"
                className="form-control"
                name="confirm_password"
                required
              />

              <div className="text-center mt-4">
                <MDBBtn onClick={this.handleSubmit}
                  color="warning" outline type="submit" >
                  Make Account
                </MDBBtn>
              </div>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>
    </MDBContainer>
  </form>
  <br />
  <div>
    <img class="ui fluid image" src = {background}/>
  </div>
  </div>
    );
  };
}

export default SignUpForm;
