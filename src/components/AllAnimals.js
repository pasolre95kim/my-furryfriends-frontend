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







// class ModalExampleDimmer extends Component {
//   state = { open: false }
//
//   show = dimmer => () => this.setState({ dimmer, open: true })
//   close = () => this.setState({ open: false })
//
//   render() {
//     const { open, dimmer } = this.state
//
//     return (
//       <div>
//         <Button onClick={this.show(true)}>Default</Button>
//         <Button onClick={this.show('inverted')}>Inverted</Button>
//         <Button onClick={this.show('blurring')}>Blurring</Button>
//
//         <Modal dimmer={dimmer} open={open} onClose={this.close}>
//           <Modal.Header>Select a Photo</Modal.Header>
//           <Modal.Content image>
//             <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
//             <Modal.Description>
//               <Header>Default Profile Image</Header>
//               <p>We've found the following gravatar image associated with your e-mail address.</p>
//               <p>Is it okay to use this photo?</p>
//             </Modal.Description>
//           </Modal.Content>
//           <Modal.Actions>
//             <Button color='black' onClick={this.close}>
//               Nope
//             </Button>
//             <Button
//               positive
//               icon='checkmark'
//               labelPosition='right'
//               content="Yep, that's me"
//               onClick={this.close}
//             />
//           </Modal.Actions>
//         </Modal>
//       </div>
//     )
//   }
// }
//
// export default ModalExampleDimmer
