import React from 'react'
import {Auth} from 'aws-amplify';
import { Router} from "@reach/router"

import { toast } from 'react-toastify';
import { PhotoPicker } from 'aws-amplify-react';
import { SiteContext, ContextProviderComponent } from "../context/mainContext"
import SignUp from '../components/formComponents/SignUp'
import ConfirmSignUp from '../components/formComponents/ConfirmSignUp'
import SignIn from '../components/formComponents/SignIn'
import CreateVendor from '../components/formComponents/CreateVendorDetails';
import Inventory from '../templates/Inventory'


class Vendor extends React.Component {
  state = { formState: 'signUp', isAdmin: false, currentUser: null, previewSrc: null }
  toggleFormState = (formState) => {
    this.setState(() => ({ formState }))
  }
  componentDidMount() {

      const {currentUser} = this.props.context;
      console.log({currentUser})
      if (currentUser) {
        const { 
          signInUserSession: { 
            accessToken: { 
              payload = {}
            } = {} 
          } = {}
        } = currentUser;
        
        if (payload["cognito:groups"] && payload["cognito:groups"].includes("admin")) {
          this.setState({currentUser})
          if (!this.props.location.pathname.includes('/vendor/create-vendor')) {
            this.props.navigate('/inventory')
          }
        } else {
          toast("This account is not an authroized vendor account", {
            position: toast.POSITION.TOP_LEFT
          })
          // this.props.navigate()
        }
          
      } else {
        // if (this.props.location.pathname.includes('/ven/inventory')) {
          this.props.navigate('/vendor/signin')
        // }
      }
  }
  signUp = async (form) => {
    const { username, email, password } = form
    // sign up
    this.setState({ formState: 'confirmSignUp' })
  }
  confirmSignUp = async (form) => {
    const { username, authcode } = form
    // confirm sign up
    this.setState({ formState: 'signIn' })
  }
  signIn = async (form) => {
    const { username, password } = form
    // signIn
    // this.setState({ formState: 'signedIn', isAdmin: true })
    try {
      const signedInUser = await Auth.signIn(username, password)
      if (signedInUser) {
        const currentUser = await Auth.currentAuthenticatedUser();
        if (currentUser) {
          this.props.context.updateCurrentUser(currentUser);
          const { 
            signInUserSession: { 
              accessToken: { 
                payload = {}
              } = {} 
            } = {}
          } = currentUser;
          if (payload["cognito:groups"] && payload["cognito:groups"].includes("admin") && !this.props.location.pathname.includes('/app/create-vendor')) {
            // this.setState({isAdmin: true, formState: 'signedIn'})
            this.props.navigate('/inventory')
          } else {
            toast("This account is not an authroized vendor account", {
              position: toast.POSITION.TOP_LEFT
            })
          }
        }
      }
    } catch (error) {
      console.log({error})
      if (error && error.message) { 
        toast(error.message, {
          position: toast.POSITION.TOP_LEFT
        })
      } else {
        toast("Error logging in!", {
          position: toast.POSITION.TOP_LEFT
        })
      }
      
    }
  }
  signOut = async() => {
       await Auth.signOut();
       this.props.navigate("/vendor/signin")
  }

  render() {
    
    
    return (
      <div className="flex flex-col">
        <div className="w-full flex flex-col items-center">
          <div className="pt-10">
            <h1 className="text-5xl font-light">Admin Panel</h1>
          </div>
          
          {this.props.location.pathname.includes('/vendor/signup') && <SignUp   {...{...this.state, ...this.props}} signUp={this.signUp} toggleFormState={this.toggleFormState} /> }
          {this.props.location.pathname.includes('/vendor/confirm-signup') && <ConfirmSignUp  {...{...this.state, ...this.props}} confirmSignup={this.confirmSignup}/> }
          {this.props.location.pathname.includes("/vendor/signin") && <SignIn    {...{...this.state, ...this.props}} signIn={this.signIn} toggleFormState={this.toggleFormState} />}
          {this.props.location.pathname.includes('/vendor/create-vendor') &&  <CreateVendor   {...{...this.state, ...this.props}} signIn={this.signIn} toggleFormState={this.toggleFormState} />}
            {/* <Inventory  path="inventory" {...{...this.state, ...this.props}} signOut={this.signOut} toggleFormState={this.toggleFormState} /> */}
            {/* <Inventory  path="/vendor/inventory/:action" {...{...this.state, ...this.props}} signOut={this.signOut} toggleFormState={this.toggleFormState} /> */}
          
        </div>
      </div>
    )
  }
}

function VendorWithContext(props) {
  return (
    // <ContextProviderComponent>
      <SiteContext.Consumer>
        {
          context => <Vendor {...props} context={context} />
        }
      </SiteContext.Consumer>
    // </ContextProviderComponent>
  )
}


export default VendorWithContext