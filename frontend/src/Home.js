import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { Link, useHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import './home.css'

//lHOttmnO1rgjIacydQG9uo1F

const Home = () => {

    const base_url = "http://localhost:8000"

    const history = useHistory()

    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', JSON.stringify(false))
        localStorage.setItem('token', '')
        window.location.reload();
    }

    const failed = () => {
        alert("Login failed!")
    }

    const responseGoogle = (response) => {
        if(response){

            //after successful login save the information in localstorage

            localStorage.setItem('isLoggedIn', JSON.stringify(true))
            localStorage.setItem('token', JSON.stringify(response.tokenObj.access_token))
            localStorage.setItem('user', JSON.stringify(response.profileObj.name))
            window.location.reload();
        }
    }

    return (
        <div>
        <MuiThemeProvider>
          <AppBar
             title="Welcome"
           />
           <div className='buttons'>
            
            {/* if user logeed is logged in(token stored in localstorage) then welcome the user otherwise
            ask to login or register */}

               {JSON.parse(localStorage.getItem('isLoggedIn')) === true ? 

               (<div className='main_container logout'>

                    <p>Welcome {localStorage.getItem('user')}</p>

                    <Link to='/'>
                        <RaisedButton label="Logout" primary={true} style={{margin: 10}} onClick={handleLogout}/>
                    </Link>

                </div>
                ) : (
                <div className='login_container'>

                    <Link to='/login'>
                       <RaisedButton label="Login" primary={true} style={{margin: 20}} className='container_button' />
                    </Link>

                    <Link to='/register'>
                       <RaisedButton label="Register" primary={true} style={{margin: 20}} className='container_button' />
                    </Link>

                    <div>
                        <GoogleLogin
                            clientId="262632317125-5lf82p4eg2fc6tbvcn3h2f48bquu2062.apps.googleusercontent.com"
                            buttonText="Or Sign in  with Google"
                            onSuccess={responseGoogle}
                            onFailure={failed}
                            cookiePolicy={'single_host_origin'}
                            theme={'dark'}
                        />
                    </div>
                </div>
               )}
           </div>
         </MuiThemeProvider>
      </div>
    )
}

export default Home
