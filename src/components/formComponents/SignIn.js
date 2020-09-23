import React from 'react'
import {Link} from '@reach/router';
import { colors } from '../../theme'

class SignIn extends React.Component {
  state = {
    username: '', password: ''
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }
  render() {
    return (
      <>
      <div className="w-3/4 max-w-lg flex flex-col items-center">
        <h3>Sign In</h3>
        <div className="flex w-full">
          <div className="w-full">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  onChange={this.onChange} name="username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={this.onChange} name="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
              </div>
              <div className="flex items-center justify-between">
                <button onClick={() => this.props.signIn(this.state)} className="bg-secondary hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  Sign In
                </button>
                <a className="inline-block align-baseline font-bold text-sm" href="#">
                  Forgot Password?
                </a>
               
              </div>
              <div className="flex items-center justify-end">
                
                <Link to="/vendor/signup">
                <p className="inline-block align-baseline font-bold text-sm" >
                  Create Vendor Account
                </p>
                </Link>
              </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
              &copy;2020 JAMstack ECommerce. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      </>
    )
  }
}

export default SignIn
