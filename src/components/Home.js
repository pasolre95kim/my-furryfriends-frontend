import React, { Component, Fragment } from 'react'
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer} from "mdbreact";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import {Redirect, Link} from 'react-router-dom'
import {Header, Container, Icon, Button } from 'semantic-ui-react'


const Home = (props) => {

  return (
    <div>
      <br />
      <br />
      <br />
    <MDBContainer>
       <MDBCarousel
         activeItem={1}
         length={4}
         showControls={true}
         showIndicators={true}
         className="z-depth-1">

         <MDBCarouselInner>
           <MDBCarouselItem itemId="1">
             <MDBView>
               <img
                 className="d-block w-100"
                 src="https://i.ytimg.com/vi/bfN60awmfYk/maxresdefault.jpg"
                 alt="First slide" />
             </MDBView>
           </MDBCarouselItem>

           <MDBCarouselItem itemId="2">
             <MDBView>
               <img
                 className="d-block w-100"
                 src="https://d17fnq9dkz9hgj.cloudfront.net/uploads/2018/03/Russian-Blue_01.jpg"
                 alt="Second slide" />
             </MDBView>
           </MDBCarouselItem>
           <MDBCarouselItem itemId="3">
             <MDBView>
               <img
                 className="d-block w-100"
                 src="https://i2-prod.mirror.co.uk/incoming/article2106793.ece/ALTERNATES/s1200/Fluffy-White-dog.jpg"
                 alt="Third slide"
               />
           </MDBView>
         </MDBCarouselItem>

             <MDBCarouselItem itemId="4">
               <MDBView>
                 <img
                   style={{height:"30%"}}
                   className="d-block w-100"
                   src="https://www.pixelstalk.net/wp-content/uploads/2016/07/Cute-Baby-Animal-Background-Free-Download.jpg"
                   alt="Fourth slide"/>
               </MDBView>
             </MDBCarouselItem>

         </MDBCarouselInner>
       </MDBCarousel>
     </MDBContainer>
    <br />
    <h2 />
    <br />

  <Container text>
    <div className="ui huge  header">
      Welcome to My Furry Friends!
    </div>
    <br />
    <br />

  <Container text>
    <h3>
      <Icon name="paw" />
      Our Goals
    </h3>
    <br />
    <p style={{textAlign:"left"}}>Shelters don’t have the money or room to care for them.
      They already have 5 million strays and abused animals to take in each year.
      And so, millions are euthanized.</p>
    <p style={{textAlign:"left"}}>
      We are determined that things don’t have to be this way. Not in our 21st century, web-connected world.
      So we created Get Your Pet, an online community where people who can’t keep their pets connect directly with people who want to adopt a pet.
    </p>
    <p style={{textAlign:"left"}}>Together, we’ll keep dogs and cats from ever seeing the inside of a shelter, so they can love and be loved in new homes.
      Saving lives. Unburdening shelters. Creating community to make a difference.
      That’s our mission. That’s what we want you to know about us.</p>
    <br />
  </Container >

    <br />
    <br />

  <h3>
    <Icon name="paw" />
    Adopt the love of your life
  </h3>
  <p></p>

  <p textalign="left">
   Ready to add a new love to your family?
   There are so many wonderful pets in your community waiting for loving homes.
   Put your love into action by adopting today - and spread the word that adoption is the way to go.
  </p>

  <br />
  <Button basic color="brown"
    as={Link} to="/adopt">
    Adopt at My Furry Friends
  </Button>
  </Container>

  <br />
  <br />

  <Container text>
    <h3>
      <Icon name="paw" />
      View Our Resources
    </h3>
    <br />
    <p>Don't Miss Out On Our Great Resources</p>
    <br />
    <Button basic color="brown"
      as={Link} to="/allArticles">
      View Our Articles For More Information
    </Button>
    <br />
    <br />
  </Container>

  <br />
</div>


  )
}
export default Home
