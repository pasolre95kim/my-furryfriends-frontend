import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {Icon} from 'semantic-ui-react'
import Article from './Article'


const AllArticles = (props) => {

  return props.user? (
    <div>
      <br />
    <h2 style={{textAlign:"center"}}>
    <Icon name="paw" />
    Available Resources
    </h2>
      <br />
      <div style={{textAlign: "left"}}>
      {props.allArticles.map(article => <Article
        article={article}
        user={props.user}
        key= {article.id}/> )}
      </div>
      <br />
      <br />
      </div>
  ) : <Redirect to="/login" />
}

export default AllArticles
