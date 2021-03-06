import React from 'react'
import {API, Auth} from 'aws-amplify';
import { Router} from "@reach/router"
import * as queries from '../graphql/queries';
import AddInventory from '../components/formComponents/AddInventory'
import AddCategory from '../components/formComponents/AddCategory'
import ViewInventory from '../templates/ViewInventory';
import { slugify } from '../../utils/helpers'
import { SiteContext, ContextProviderComponent } from "../context/mainContext"

class Inventory extends React.Component {
  state = {
    viewState: 'view',
    isEditing: false,
    inventory: []
  }

  componentDidMount() {
   this.fetchInventory();
  }
  navigate(viewState) {
    this.props.navigate(`/${viewState}`);
  }

  fetchInventory = async() => {
    console.log('this pros', this.props)
    const  attributes = this.props?.context?.currentUser?.attributes;
    if (!attributes) {
      this.props.navigate("/vendor/signin")
    } else {
      try {
        const {data: {listProducts}} = await API.graphql({
          query: queries.listProducts , 
          variables: {PK: attributes["custom:vendorID"] }
        })
        if (listProducts) {
          this.setState({inventory: listProducts.items})
          
        }
      } catch (error) {
         console.log({error})
         
      }
    }
    
  }

  signOut = async() => {
    this.props.context.updateCurrentUser({});
    await  Auth.signOut();
    this.props.navigate("/vendor/signin")
}
  render() {
    const { 
      context,
      location: {
        pathname
      }
    } = this.props
    const payload = context?.signInUserSession?.accessToken?.payload
    const {inventory} = this.state;
    let editInventory = null
    if (pathname.includes('/inventory/edit/')) {
      const productID = pathname.split('/inventory/edit/')[1];
      editInventory = inventory.find(item => {
       
        return slugify(item.SK) === productID
      });
    }
    
     return (
       <div className="flex flex-col items-center flex-1" >
          <h3>Inventory</h3>
          
          
          
            <div className="flex">
            <p role="button" className="mr-4 cursor-pointer hover:text-secondary" onClick={() => this.props.navigate('/inventory')}>View</p>
            <p role="button" className="mr-4 cursor-pointer hover:text-secondary" onClick={() => this.props.navigate('/inventory/add')}>Add Product</p>
            <p role="button" className="cursor-pointer hover:text-secondary" onClick={() => this.props.navigate('/inventory/add-category')}>Add Category</p>
          </div>
          {/* {this.state.inventory.length > 0 && ( */}
              
              <>
              {pathname === "/inventory" && <ViewInventory {...{...this.props, inventory}} /> }
              {pathname === ('/inventory/add') &&  <AddInventory path='/inventory/add' {...this.props} editInventory={{}}/>}
              {pathname.includes('/inventory/edit') &&  <AddInventory {...this.props} editInventory={editInventory} fetchInventory={this.fetchInventory}/>}
              {pathname.includes('/inventory/add-category') &&  <AddCategory {...this.props} editInventory={editInventory} fetchInventory={this.fetchInventory}/>}
              </>
              
            {/* } */}
              
          <button onClick={this.signOut} className="bg-secondary hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Sign Out
          </button>
       </div>
     )
  }
}

function InventoryWithContext(props) {
  return (
    // <ContextProviderComponent>
      <SiteContext.Consumer>
        {
          context => <Inventory {...props} context={context} />
        }
      </SiteContext.Consumer>
    // </ContextProviderComponent>
  )
}


export default InventoryWithContext