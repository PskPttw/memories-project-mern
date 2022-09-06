import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux" 
import { Container, Grow, Grid, Paper } from "@material-ui/core"

import Posts from "../Posts/Posts"
import Form from '../Form/Form'
import { getPosts } from "../../actions/posts"
import Pagination from "../Pagination"

import useStyles from "./styles"

const Home = () => 
{
  const classes = useStyles()
  const dispatch = useDispatch()

  const [currentId, setCurrentId] = useState(0)

  useEffect(() => 
  {
    dispatch(getPosts())
  }, [dispatch, currentId])

  return (
    <Grow in>
      <Container>
        <Grid className= { classes.mainContainer } container direction= "column-reverse" justifyContent= "space-between" alignItems= "stretch" spacing= { 3 }>
          <Grid item xs= { 12 } sm= { 7 }>
            <Posts setCurrentId= { setCurrentId } />
          </Grid>

          <Grid item xs= { 12 } sm= { 4 }>
            <Form currentId= { currentId } setCurrentId= { setCurrentId } />
          
            <Paper className= { classes.pagination } elevation= { 6 }>
              <Pagination />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home