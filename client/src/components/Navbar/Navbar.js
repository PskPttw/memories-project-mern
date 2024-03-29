import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Typography, AppBar, Toolbar, Avatar, Button } from "@material-ui/core"
import { useDispatch } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
import decode from "jwt-decode"

import memoriesLogo from "../../images/memories-Logo.png"
import memoriesText from "../../images/memories-Text.png"

import useStyles from "./styles"

const Navbar = () => 
{
  const classes = useStyles()

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  const logout = () =>
  {
    dispatch({ type: "LOGOUT" })

    history.push("/")

    setUser(null)
  }

  useEffect(() =>
  {
    if(user?.token)
    {
      const decodedToken = decode(user?.token)

      if(decodedToken.exp * 1000 < new Date().getTime())
      {
        logout()
      }
    }
    
    setUser(JSON.parse(localStorage.getItem("profile")))
  }, [location])

  return (
    <AppBar className= { classes.appBar } position= "static" color= "inherit">
      <div className= { classes.brandContainer }>
        <Link to= "/" className= { classes.brandContainer }>
          <img src= { memoriesText } alt= "icon" height= "45px"/>
      
          <img className= { classes.image } src= { memoriesLogo } alt= "memories" height= "40px"/>
        </Link>
      </div>

      <Toolbar className= { classes.toolbar }>
        {
          user ? (
            <div className= { classes.profile }>
              <Avatar className= { classes.purple } alt= { user.result.name } src= { user.result.image }>{ user.result.name.charAt(0) }</Avatar>
              <Typography className= { classes.userName } variant= "h6">{ user.result.name }</Typography>
              <Button variant= "contained" className= { classes.logout } color= "secondary" onClick= { logout }>Logout</Button>
            </div>
          ) : (
            <Button component= { Link } to= "/auth" variant= "contained" color= "primary">Sign in</Button>
          )
        }
      </Toolbar>
    </AppBar> 
  )
}

export default Navbar