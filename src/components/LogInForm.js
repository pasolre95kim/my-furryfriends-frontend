import React, {Component} from 'react'
import SignUpForm from './SignUpForm'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import background from '../imgs/backgroundpic.png'


const logInURL="http://localhost:3000/login"

class LogInForm extends Component {

  state={
    username: "",
    password: ""
  }

onChange = (event) => {
  this.setState({
    [event.target.name] : event.target.value
  })
}

loginFetch = () => {

  fetch(logInURL, {
    method: "POST",
    headers: {"Content-Type": "application/json", "Accept": "application/json"},
    body: JSON.stringify({user: this.state})
  })
    .then(res => res.json())
    .then(data => {
      if(data.error){
        alert("Incorrect username or password")
      }else {
        localStorage.setItem("token", data.jwt)
        localStorage.setItem("user", JSON.stringify(data.user))
        this.props.updateCurrentUser(data.user, data.user.adoptions)
      }
    })
  }

handleSubmit = event => {
  this.loginFetch();
}

  render(){
    return(

<div>
  <div style={{textAlign: "center"}}>

  <h3>Please Log In/Sign Up To Proceed</h3>
  <Segment placeholder>
    <Grid columns={2} relaxed='very' stackable>
    <Grid.Column>
      <Form onSubmit={this.loginFetch} >
        <Form.Input icon='user' iconPosition='left' label='Username'  placeholder='Username' name="username" onChange={this.onChange} />
        <Form.Input icon='lock' iconPosition='left' label='Password' type='password' name="password" onChange={this.onChange} />

          <Button  basic color="brown"
            onClick={this.handleSubmit}>
            Log In
          </Button>
        </Form>
      </Grid.Column>

      <Grid.Column verticalAlign='middle'>
        <Button
          as={Link} to="/signup"
          size='big'
          basic color="brown">
        Sign Up
        </Button>
      </Grid.Column>
    </Grid>

    <Divider vertical>Or</Divider>
  </Segment>``
</div>
  <img className="ui fluid image"
    src = {background}
    style={{size: "70%"}}/>
</div>
    )
  }
}

//line 53 as={Link} to="/signup"
export default LogInForm
