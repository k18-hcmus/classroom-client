import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Layout from '../Layout'
import { Link } from 'react-router-dom'

const DetailClassroom = () => {
  const { id: classroomId } = useParams()

  const classroom = useSelector((state) =>
    state.classrooms.classrooms.find((e) => e.id === Number(classroomId))
  )

  return (
    <div>
      <Layout>
        <h1>{classroom.name}</h1>
      </Layout>
    </div>
  )
}

export default DetailClassroom
