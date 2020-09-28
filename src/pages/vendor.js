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
  state = { formState: 'signUp', isAdmin: false, currentUser: null, previewSrc: null, authLoading: false }
  toggleFormState = (formState) => {
    this.setState(() => ({ formState }))
  }
  componentDidMount() {

      const {currentUser} = this.props.context;
      console.log({currentUser})
      if (currentUser) {
        const payload = currentUser?.signInUserSession?.accessToken?.payload
        if (payload && payload["cognito:groups"].includes("admin")) {
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
        this.props.navigate("/vendor/signin")
      }
  }

  signUp = async (form) => {
    console.log({form})
    const { email, password } = form
    this.setState({password})
    console.log({email, password})
    // sign up
    try {
      const signUpUser = await Auth.signUp({
        username: email,
        password,
        attributes: {
            email          
        }
    });
      if (signUpUser) {
        // const currentUser = await Auth.currentAuthenticatedUser();
        // if (currentUser) {
          this.props.navigate('/vendor/confirm-signup')
        // }
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
  confirmSignUp = async (form) => {
    const { username, authcode } = form
    const {password} = this.state;
    
    // confirm sign up
    try {
      const confirmSignUp  = await Auth.confirmSignUp(username, authcode);
      const signedInUser = await Auth.signIn(username, password)
      if (confirmSignUp && signedInUser)  {
        const currentUser = await Auth.currentAuthenticatedUser();
        if (currentUser) {
          this.props.context.updateCurrentUser(currentUser);
          this.props.navigate('/vendor/create-vendor')
          this.setState({authLoading: false})
        }
      }
    } catch (error) {
      toast(JSON.stringify(error), {
        position: toast.POSITION.TOP_LEFT
      })
      this.setState({authLoading: false})
        console.log('error confirming sign up', error);
    }
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
       
          const payload = this.props.context?.curentUser?.signInUserSession?.accessToken?.payload;
          if (payload && payload["cognito:groups"].includes("admin") && !this.props.location.pathname.includes('/vendor/create-vendor')) {
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
      this.props.context.updateCurrentUser({});
      await  Auth.signOut();
      this.props.navigate("/vendor/signin")
  }

  render() {
    const {authLoading} = this.state;
    
    return (
      <div className="flex flex-col">
        <div className="w-full flex flex-col items-center">
          <div className="pt-10">
            <h1 className="text-5xl font-light">Admin Panel</h1>
          </div>
          {authLoading  ?
          <div>...LOADING</div>
          :
            (
              <>
          {this.props.location.pathname === ('/vendor/signup') && <SignUp   {...{...this.state, ...this.props}} signUp={this.signUp} toggleFormState={this.toggleFormState} /> }
          {this.props.location.pathname === ('/vendor/confirm-signup') && <ConfirmSignUp  {...{...this.state, ...this.props}} confirmSignUp={this.confirmSignUp}/> }
          {this.props.location.pathname.includes("/vendor/signin") && <SignIn    {...{...this.state, ...this.props}} signIn={this.signIn} toggleFormState={this.toggleFormState} />}
          {this.props.location.pathname.includes('/vendor/create-vendor') &&  <CreateVendor   {...{...this.state, ...this.props}}  toggleFormState={this.toggleFormState} />}
            {/* <Inventory  path="inventory" {...{...this.state, ...this.props}} signOut={this.signOut} toggleFormState={this.toggleFormState} /> */}
            {/* <Inventory  path="/vendor/inventory/:action" {...{...this.state, ...this.props}} signOut={this.signOut} toggleFormState={this.toggleFormState} /> */}
            </>)
        }
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