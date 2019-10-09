import React, { Component, Fragment } from 'react'
import AdoptionForm from './AdoptionForm'
import { Card, Button, Icon, Image, Segment, Header, Container } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const AnimalDetails = (props) => {

  return props.animal || props.user ? (
    <div>
    <br />

    <h2>
    <Icon name="paw" />
    {props.animal.name}
    </h2>


    <img class="ui centered circular medium image"src={props.animal.image} />

      <br />
    <Container text>
      <h4>Breed: {props.animal.breed}</h4>
      <p>Age: {props.animal.age}</p>

      <p>Gender: {props.animal.gender}</p>

      <p>Health: {props.animal.health}</p>

      <p>Preferred Home: {props.animal.preferredHome}</p>

      {props.animal.about ?
      <p>About: {props.animal.about}</p> : null }
      <p>Adoption Fee: {props.animal.adoptionFee}</p>
      <br />
    </Container>
    
      <AdoptionForm
        animal={props.animal}
        user={props.user}
        addAnimal={props.addAnimal}
      />
    <br />
    <br />
    </div>
  ) : null
}

export default AnimalDetails
