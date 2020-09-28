import React from "react"
import {Link} from 'gatsby';
import SEO from "../components/seo"
import { SiteContext, ContextProviderComponent } from '../context/mainContext'
import { Center, Footer, Tag, Showcase, DisplaySmall, DisplayMedium } from '../components'
import { titleIfy, slugify, getProductIDFromCategory } from '../../utils/helpers'



class  Home extends React.Component {
  
  render() {
    const {inventory, categories} = this.props;

  return (
    <>
      {/* <div className="flex flex-1 justify-end">
        <Link to="/admin">
          <p className="pt-4 text-xs">Vendor Sign In</p>
        </Link>
      </div> */}
      <SEO title="Home" />
      {inventory.length > 0 &&
          <>
          <div className="w-full">
            <div className="bg-green-200
            lg:h-hero
            p-6 pb-10 smpb-6
            flex lg:flex-row flex-col">
              <div className="pt-4 pl-2 sm:pt-12 sm:pl-12 flex flex-col">
                <Tag
                  year="2020"
                  category="SOFAS"
                />
                <Center
                  price="200"
                  title={inventory[0].name}
                  link={`product/${slugify(getProductIDFromCategory(inventory[0].SK))}`}
                />
                <Footer
                  designer="Jason Bourne"
                />
              </div>
              <div className="flex flex-1 justify-center items-center relative">
                  <Showcase
                    imageSrc={inventory[0].image}
                  />
                  <div className="absolute
                  w-48 h-48 sm:w-72 sm:h-72 xl:w-88 xl:h-88
                  bg-white z-0 rounded-full" />
              </div>
            </div>
          </div>
          <div className="my-4 lg:my-8 flex flex-col lg:flex-row justify-between">
            {categories[0] && <DisplayMedium imageSrc={categories[0].image} subtitle={`${categories[0].itemCount} items`} title={titleIfy(categories[0].name)} link={`category/${slugify(categories[0].name)}`} />}
           {categories[1] && <DisplayMedium imageSrc={categories[1].image} subtitle={`${categories[1].itemCount} items`} title={titleIfy(categories[1].name)} link={`category/${slugify(categories[1].name)}`} />}
          </div>
          <div className="pt-10 pb-6 flex flex-col items-center">
            <h2 className="text-4xl mb-3">Trending Now</h2>
            <p className="text-gray-600 text-sm">Find the perfect piece or accessory to finish off your favorite room in the house.</p>
          </div>
          <div className="my-8 flex flex-col lg:flex-row justify-between">

          
           {inventory[0] && <DisplaySmall imageSrc={inventory[0].image} title={inventory[0].name} subtitle={inventory[0].categories[0]} link={`product/${slugify(getProductIDFromCategory(inventory[0].SK))}`} />}

            {inventory[1] && <DisplaySmall imageSrc={inventory[1].image} title={inventory[1].name} subtitle={inventory[1].categories[0]} link={`product/${slugify(getProductIDFromCategory(inventory[1].SK))}`} />}

            {inventory[2] && <DisplaySmall imageSrc={inventory[2].image} title={inventory[2].name} subtitle={inventory[2].categories[0]} link={`product/${slugify(getProductIDFromCategory(inventory[2].SK))}`} />}

            {inventory[3] && <DisplaySmall imageSrc={inventory[3].image} title={inventory[3].name} subtitle={inventory[3].categories[0]} link={`product/${slugify(getProductIDFromCategory(inventory[3].SK))}`} />}
          </div>
        </>
      }
    </>
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
