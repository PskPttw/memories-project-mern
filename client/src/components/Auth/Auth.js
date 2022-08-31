import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import { GoogleLogin, googleLogout } from "@react-oauth/google"

import { signin, signup } from "../../actions/auth"
import { AUTH } from "../../constants/actionType"
import Input from "./Input"

import useStyle from "./styles"

const Auth = () => 
{
  const history = useHistory()
  const classes = useStyle()
  
  const [isSignup, setIsSignup] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const handleShowPassword = () => setShowPassword((prev) => !prev)

  const handleSubmit = () =>
  {

  }

  const handleChange = () =>
  {

  }

  const googleSuccess = async(res) =>
  {
    const result = res?.profileObj
    const token = res?.tokenId

    try
    {
      dispatchEvent({ type: Auth, data: { result, token } })

      history.push("/")
    }
    catch(error)
    {
      console.log(error)
    }

  }

  const googleError = () => alert("Google Sign In was unsuccessful. Try again later.")


  const switchMode = () =>
  {
    setIsSignup((prev) => !prev)
    handleShowPassword(false)
  }

  return (
    <Container component= "main" maxWidth= "xs">
      <Paper className= { classes.paper } elevation= { 3 }>
        <Avatar className= { classes.avatar }>
          <LockOutlinedIcon />
        </Avatar>

        <Typography variant= "h5">{ isSignup ? "Sign up" : "Sign in" }</Typography>
        
        <form className= { classes.form } onSubmit= { handleSubmit }>
          <Grid container spacing= { 2 }>
            {
              isSignup && (
                <>
                  <Input name= "firstName" label= "First Name" handleChange= { handleChange } autoFocus half />

                  <Input name= "firstName" label= "First Name" handleChange= { handleChange } half />
                </>
              )
            }

            <Input name= "email" label= "Email Address" handleChange= { handleChange } type= "email" />
            
            <Input name= "password" label= "Password" handleChange= { handleChange } type= { showPassword ? "text" : "password" } handleShowPassword= { handleShowPassword } />

            {
              isSignup && <Input name= "confirmPassword" label= "Repeat Password" handleChange= { handleChange } type= "password" />
            }
          </Grid>
          
          <GoogleLogin 
            onSuccess= { googleSuccess }
            onError= { googleError }
          />

          <Button type= "submit" fullWidth variant= "contained" color= "primary" className= { classes.submit }>
            { isSignup ? "Sign Up" : "Sign in" }
          </Button>

          <Grid container justifyContent= "flex-end">
            <Grid item>
              <Button onClick= { switchMode }>
                {
                  isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"
                }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth