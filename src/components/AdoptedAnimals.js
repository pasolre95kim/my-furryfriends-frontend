import React, { Component, Fragment } from 'react'
import AnimalCard from './AnimalCard'
import {Icon} from 'semantic-ui-react'
import {Redirect} from 'react-router-dom'

// user ?  : <Redirect to="/login" />
const AdoptedAnimals = (props) => {
  let {user} = props
    return user ? (
      <div>
        <br />
        <h2 style={{textAlign:"center"}}>
          <Icon name="paw" />
          Your Pending Adoptions </h2>
        <br></br>
        <div className="ui three column grid cards">

      {props.adoptedAnimals.map(animal => <AnimalCard
        key={animal.animal.id}
        animal = {animal.animal}
        addAnimal={props.addAnimal}
        user={props.user}
        adoptedAnimals={props.adoptedAnimals}
        adopted={true}
        deleteAnimal ={props.deleteAnimal}
         />
      )}
      </div>
      <br />
      <br />
    </div>
    )  : <Redirect to="/login" />
  }


export default AdoptedAnimals
