import React, { useState } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import './login.css'

const Login = () => {

    const base_url = "http://localhost:8000"

    const history = useHistory()

    const[email, setEmail] = useState()
    const[password, setPassword] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()

        //post request login the user with data as username and password

        axios.post(base_url + '/token-auth/',{"username": email, "password": password}, {
          headers: {
            'content-type': 'application/json'}
          })
        .then(res => {
          //after successful login save information in localstorage
            console.log(res.data.token)
            localStorage.setItem('isLoggedIn', true)
            localStorage.setItem('token', JSON.stringify(res.data.token))
            localStorage.setItem('user', JSON.stringify(res.data.user.username))
            history.push('/')

        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
        <MuiThemeProvider>
          <AppBar
             title="Login"
           />
           <div className='login'>
             <div>
              <TextField
                hintText="Enter your Email"
                floatingLabelText="Email"
                onChange = {(event) => setEmail(event.target.value)}
                />
              <br/>
                <TextField
                  type="password"
                  hintText="Enter your Password"
                  floatingLabelText="Password"
                  onChange = {(event) => setPassword(event.target.value)}
                  />
              </div>
             <br/>
             <div>
                <RaisedButton label="Submit" primary={true} style={{margin: 10}} onClick={handleSubmit}/>
                <Link to='/register'>
                <RaisedButton label="Register" primary={true} />
                </Link>
             </div>
             </div>
         </MuiThemeProvider>
      </div>
    )
}

export default Login
