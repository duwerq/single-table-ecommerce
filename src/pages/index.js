import React from "react"
import {Link} from 'gatsby';
import SEO from "../components/seo"
import { SiteContext, ContextProviderComponent } from '../context/mainContext'
import { Center, Footer, Tag, Showcase, DisplaySmall, DisplayMedium } from '../components'

import HomeView from '../templates/HomeView';

class  Home extends React.Component {
  state = {
    categories: [],
    inventory: []
  }

  render() {
    const {inventory, categories} = this.props.context;

  return (
    
      
        <HomeView  {...{inventory,categories}}/>
        
  )
}
}


function HomeWithContext(props) {
  return (
    // <ContextProviderComponent>
      <SiteContext.Consumer>
        {
          context =>  <Home {...props} context={context} />
        }
      </SiteContext.Consumer>
    // </ContextProviderComponent>
  )
}
export default HomeWithContext
