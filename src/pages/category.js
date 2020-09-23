import React, { useState, useEffect } from 'react';
import {Link} from 'gatsby';
import ListItem from '../components/ListItem'
import { Center, Footer, Tag, Showcase, DisplaySmall, DisplayMedium } from '../components/'
import { titleIfy, slugify, getProductIDFromCategory } from '../../utils/helpers'
import { SiteContext, ContextProviderComponent } from '../context/mainContext'
// import CartLink from '../components/CartLink'
import Image from '../components/Image'
import * as queries from '../graphql/queries';
import {Connect} from 'aws-amplify-react'



const CategoryView = (props) => {
  const { categories } = props

  if (categories.length < 1) return null;
  
  const {
    PK,
    SK,
    name,
    image: categoryImage,
    products: {
      items: inventory =  []
    } = {},
    
  } = categories.find(category => slugify(category.name) === props.params['*']) || {}
  
  console.log({categories, props})
  return (
    <>
      {/* <CartLink /> */}
      {/* <div className="flex flex-1 justify-end">
        <Link to="/admin">
          <p className="pt-4 text-xs">Vendor Sign In</p>
        </Link>
      </div> */}
      <div className="flex flex-col items-center">
        <div className="max-w-fw w-full flex flex-col">
          <div className="pt-10 pb-8">
            <h1 className="text-5xl font-light">{titleIfy(name)}</h1>
          </div>
          <div className="w-full">
        <div className="bg-green-200 lg:h-hero p-2  flex lg:flex-row flex-col">
          
          <Image src={ categoryImage } className="w-full h-fulls" alt="Showcase item" style={{objectFit: "cover", marginBottom: 0}}/>
        </div>
      </div>
          <div>
            <div className="flex flex-1 flex-wrap flex-row">
              {
                inventory.map((item, index) => {
                  
                  return (
                    <ListItem
                      key={index}
                      link={`product/${slugify(getProductIDFromCategory(item.SK))}`}
                      title={item.name}
                      price={item.price}
                      imageSrc={item.image}
                    />
                  )
                })
              }
              
            </div>
          </div>
          </div>
        
      </div>
    </>
  )
}


function CategoryViewWithContext(props) {
  return (
    // <ContextProviderComponent>
      <SiteContext.Consumer>
        {
          ({categories}) =>  <CategoryView {...props} categories={categories} />
        }
      </SiteContext.Consumer>
    // </ContextProviderComponent>
  )
}
export default CategoryViewWithContext
