import React, { Component, Fragment } from 'react'
import { Card, Button, Menu, Icon, Modal, Image, Form, Input, Dropdown } from 'semantic-ui-react'


const adoptionsURL = "http://localhost:3000/adoptions"
const animalsURL = "http://localhost:3000/animals"

class AdoptionForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      currentUser: props.user,
      form: false,
      stableIncome: "",
      petFriendly:" ",
      Vet: " ",
      options: [{ key: 1, text: 'Yes', value: 'yes' },
      { key: 2, text: 'No', value: 'no' }]
    }
  }

  handleChange = event => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleDropDown = (event, data)=> {
    event.preventDefault()
    this.setState({
      [data.name]: data.value
    })
  }

  handleClick = event => {
      this.setState({form: !this.state.form})
    }


  adoptAnimal = (event) => {
    event.preventDefault()
   let userId = this.props.user.id
   let animalId = this.props.animal.id

      let data={
        user_id: userId,
        animal_id: animalId,
        name: this.props.animal.name,
        age: this.props.animal.age,
        breed: this.props.animal.breed,
        gender: this.props.animal.gender,
        about: this.props.animal.about,
        image: this.props.animal.image,
        adoptionFee: this.props.animal.adoptionFee,
        preferredHome: this.props.animal.preferredHome,
        health: this.props.animal.health
      }
      console.log(data)
      fetch(adoptionsURL, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
          "Accept" : "application/json"
        },
        body: JSON.stringify(data)
        })
        .then(resp =>resp.json())
        .then(data => {
          this.handleClick()
          this.props.addAnimal(data)
      })
    }

render() {
  return(

    <Modal
      style= {{background: "none"}}
      open={this.state.form}
      trigger={

      <Button basic color="brown"
          onClick={()=> this.handleClick() }>
        <Icon name="paw" />
          Adopt Me
      </Button>}
        centered={false}
      > : null}

      <Modal.Header>
        Adoption Form For: {this.props.animal.name}
      </Modal.Header>

    <Modal.Content>
      {this.state.stableIncome === 'no' || this.state.petFriendly === 'no' ?
        <div className="ui error message">
        <div className="header">Action Forbidden</div>
        <p>You must live in a pet friendly environment and have stable income in order to adopt</p>
        </div> : null}

    <Modal.Description>
      <label>Do You Have A Stable Income?</label>
      <br></br>

        <Dropdown clearable
          options={this.state.options}
          name="stableIncome"
          selection
          onChange={this.handleDropDown}/>

        <br></br><br></br>

      <label>Do You Live In A Pet Friendly Environment?</label>
        <br></br>
        <Dropdown clearable
          name="petFriendly"
          options={this.state.options}
          selection
          onChange={this.handleDropDown}/>
        <br></br><br></br>

        <label>Have You Owned A Pet Before</label>
        <br></br>
        <Dropdown clearable
          options={this.state.options}
          name="previousRecord"
          selection
          onChange={this.handleDropDown}/>

        <Form onSubmit={this.adoptAnimal} >
        <Form.Group widths='equal'>
          <Form.Input onChange={this.handleChange}
            fluid
            name='Vet'
            label='Veterinary Hospital'
            placeholder='Veterinary Hospital...'
            required />

          <div className="ui left pointing red basic label">
          This Field Is Mandatory
        </div>
      </Form.Group>
    </Form>
    </Modal.Description>
    </Modal.Content>


    <Modal.Actions>
      {this.state.stableIncome === 'no' ||
        this.state.petFriendly === 'no' ||
        this.state.Vet === " "
         ?
      <div>
        <Button className="ui disabled button">
            <Icon name='checkmark' />
            Submit
        </Button>
      <Button color="red"
        onClick={this.handleClick}>
        <Icon name="remove" />
        Close
      </Button>
    </div>
       :
       <div>
        <Button color='green' inverted
          onClick={this.adoptAnimal}
          type="submit">
          <Icon name='checkmark' />
          Submit
        </Button>

        <Button color="red"
          onClick={this.handleClick}>
          <Icon name="remove" />
        Close
        </Button>

      </div>}
    </Modal.Actions>
    </Modal>
   )
  }
}
export default AdoptionForm
