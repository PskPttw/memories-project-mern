import * as api from "../api"
import { AUTH } from "../constants/actionType"

export const signin = (formData, history) => async(dispatch) =>
{
  try
  {
    history.push("/")
  } 
  catch(error)
  {
    console.log(error)
  }
}

export const signup = () => async(dispatch) =>
{
  try
  {
    history.push("/")
  }
  catch(error)
  {
    console.log(error)
  }
}