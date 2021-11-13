import React, { useState, useEffect } from 'react'
import { Button, Grid } from '@mui/material'
import axiosClient from '../../axiosClient'
import ClassroomCard from '../classroom/ClassroomCard'
import AddClassroomModal from '../classroom/AddClassroomModal'
import Layout from '../Layout'
import { useDispatch, useSelector } from 'react-redux'
import { fetchClassrooms, createClassroom } from '../classroom/classroomsSlice'

const Home = () => {
  // const [classrooms, setClassrooms] = useState([])
  const [open, setOpen] = useState(false)
  const classrooms = useSelector((state) => state.classrooms.classrooms)
  const dispatch = useDispatch()
  const toggleModal = () => {
    setOpen((prevState) => !prevState)
  }

  const addClassroom = async ({ name }) => {
    dispatch(createClassroom({ name: name }))
    // setClassrooms((prevState) => prevState.concat(response.data))
  }

  useEffect(() => {
    async function fetchAPI() {
      dispatch(fetchClassrooms())
    }

    fetchAPI()
  }, [dispatch])

  return (
    <div>
      <Layout>
        <Button
          variant="contained"
          onClick={toggleModal}
          sx={{ display: 'block', m: 2 }}
        >
          Add New Class
        </Button>
        <Grid container sx={{ alignItems: 'center' }}>
          {classrooms.map((classroom) => (
            <ClassroomCard key={classroom.id} classroom={classroom} />
          ))}
        </Grid>
        <AddClassroomModal
          open={open}
          toggle={toggleModal}
          addClassroom={addClassroom}
        />
      </Layout>
    </div>
  )
}

export default Home
