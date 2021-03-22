import React, { useState } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Alert } from 'react-alert'
import './register.css'

const Register = () => {

    const base_url = "http://localhost:8000"

    const[email, setEmail] = useState()
    const[password, setPassword] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()

        //send post request to backend with credentials

        axios.post(base_url + '/auth/user/create',{"user": {"username": email, "password": password}}, {
          headers: {
            'content-type': 'application/json'}
          })
        .then(res => {
            console.log(res.data.message)
        })
        .catch(err => {
            alert(err)
        })
    }

    return (
        <div>
        <MuiThemeProvider>
          <AppBar
             title="Register"
           />
           <div className='register'>
             <div>
              <TextField
                hintText="Enter Email"
                type="email"
                floatingLabelText="Email"
                onChange = {(event) => setEmail(event.target.value)}
                />
              <br/>
              <TextField
                type = "password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                onChange = {(event) => setPassword(event.target.value)}
                />
             </div>
           <br/>
           <div>
              <RaisedButton label="Submit" primary={true} style={style} onClick={handleSubmit}/>
              <Link to='login'>
              <RaisedButton label="Login" primary={true} style={{margin: 10}} />
              </Link>
           </div>
          </div>
         </MuiThemeProvider>
      </div>
    )
}

const style = {
    margin: 15,
  };  

export default Register
