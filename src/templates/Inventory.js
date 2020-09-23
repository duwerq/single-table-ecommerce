import React from 'react'
import {API} from 'aws-amplify';
import { Router} from "@reach/router"
import * as queries from '../graphql/queries';
import AddInventory from '../components/formComponents/AddInventory'
import ViewInventory from './ViewInventory'
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
  toggleViewState(viewState) {
    this.props.navigate(`/vendor/${viewState}`);
  }

  fetchInventory = async() => {
    try {
      const { attributes } = this.props.context.currentUser;
      const {data: {listProducts}} = await API.graphql({
        query: queries.listProducts , 
        variables: {PK: `VENDOR#${attributes["custom:vendorID"]}` }
      })
      if (listProducts) {
        this.setState({inventory: listProducts.items})
      }
    } catch (error) {
       console.log({error})
    }
    // this.setState({ inventory })
  }
  
  render() {
    const { 
      context: {
        currentUser: {
          signInUserSession: { 
            accessToken: { 
              payload = {}
            } = {} 
          } = {}
        } = {},
        currentUser
      } = {},
      location: {
        pathname
      }
    } = this.props
    const {inventory} = this.state;
    let editInventory = null
    if (pathname.includes('/inventory/edit/')) {
      const productID = pathname.split('/inventory/edit/')[1];
      editInventory = inventory.find(item => {
        return slugify(item.SK) === productID
      });
    }
    console.log('inventory props', this.props)
     return (
       <div className="flex flex-col items-center flex-1" >
          <h3>Inventory</h3>
          <div className="flex">
            <p role="button" className="mr-4 cursor-pointer hover:text-secondary" onClick={() => this.toggleViewState('inventory')}>View</p>
            <p role="button" className="mr-4 cursor-pointer hover:text-secondary" onClick={() => this.toggleViewState('inventory/add')}>Add Product</p>
          {payload["cognito:groups"] && payload["cognito:groups"].includes("admin")  && <p role="button" className="cursor-pointer hover:text-secondary" onClick={() => this.toggleViewState('add')}>Add Category</p>}
          </div>
          {/* <Router > */}
           {pathname.includes("/add") && <AddInventory  {...this.props} editInventory={{}}/>}
           {pathname.includes("/edit") && <AddInventory  {...this.props} editInventory={editInventory}/>}
            {pathname === "inventory" && <ViewInventory  {...{...this.props, inventory}} /> }
           {/* <s/Router> */}
          {/* <AddInventory path='/vendor/edit/productID' {...this.props} editInventory={editInventory}/> */}
          {/* </Router> */}
          {/* {
            this.state.viewState === 'view' ? (
              <ViewInventory {...this.props} onEdit={(item) => this.setState({viewState: 'add', isEditing: item})} />
            ) : (<AddInventory {...this.props} isEditing={this.state.isEditing}/>
              )
          }
      */}
          <button onClick={this.props.signOut} className="bg-secondary hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
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