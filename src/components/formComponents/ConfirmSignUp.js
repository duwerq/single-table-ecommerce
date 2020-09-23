import React from 'react'

class ConfirmSignUp extends React.Component {
  state = {
    username: '', authcode: ''
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }
  render() {
    return (
      <>
        <h3>Sign Up</h3>
        <div className="flex w-full">
          <div className="w-full">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Email
                </label>
                <input
                onChange={this.onChange} name="username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="authcode">
                  Authentication Code
                </label>
                <input
                onChange={this.onChange} name="authcode"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="authcode" type="authcode" />
              </div>
              <div className="flex items-center justify-between">
                <button onClick={() => this.props.confirmSignUp(this.state)} className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  Confirm Sign Up
                </button>
                <a className="inline-block align-baseline font-bold text-sm" href="#">
                  Forgot Password?
                </a>
              </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
              &copy;2020 JAMstack ECommerce. All rights reserved.
            </p>
          </div>
        </div>
      </>
    )
  }
}

export default ConfirmSignUp