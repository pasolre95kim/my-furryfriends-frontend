import React, { Fragment } from 'react';
import { Header, Icon, Image, Container, Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const ArticleDetails = (props) => {
    
    return props.article || props.user ? (
      <div>
      <br />
      <Container text>

        <div class="ui huge header">
        {props.article.title}
        </div>

        <img class="ui centered medium image" src={props.article.image} />
        <br />
        <h4 style={{textAlign:"left"}}>
        {props.article.abstract}
        </h4>

      <br />

        <p style={{textAlign:"left"}}>
        {props.article.body}
        </p>

      </Container>
      <br />
      <br />

      <Button basic color="brown"
       as={Link} to="/allArticles">
       Back to Articles
       </Button>

       <br />
       <br />
      </div>

    ) : null
  }

export default ArticleDetails
