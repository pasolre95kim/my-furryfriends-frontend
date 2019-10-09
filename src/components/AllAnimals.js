import React from 'react'
import AnimalCard from './AnimalCard'
import {Icon} from 'semantic-ui-react'
import {Redirect} from 'react-router-dom'

const AllAnimals = (props) => {
  let {user} = props
  let filteredAnimals = props.allAnimals.filter((animal) => animal.breed.includes(props.filterTerm)
  || animal.name.includes(props.filterTerm)
  || animal.age.includes(props.filterTerm)
  || animal.gender.includes(props.filterTerm)
  || animal.species.includes(props.filterTerm))

  return user ? (
    <div>
    <br></br>
    <h2 style={{textAlign:"center"}}>
    <Icon name="paw" />
      Our Furry Friends
    </h2>
    <br></br>
      <div className = "ui four column grid cards">

        {filteredAnimals.map(animal=> <AnimalCard
          key={animal.id}
          animal={animal}
          user={props.user}
          adoptAnimal={props.adoptAnimal}
          setCurrentAnimal={props.setCurrentAnimal}
          currentAnimal={props.currentAnimal}
          addAnimal={props.addAnimal}
          adopted={false}
          admin={props.admin}
          allAnimals={props.allAnimals}
          deleteFromAll={props.deleteFromAll}
          addNewAnimal={props.addNewAnimal}
        />
      )}
      </div>
      <br />
      <br />
      <br />
    </div>
  ) : <Redirect to="/login" />
}
export default AllAnimals
