import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import {
  Card,
  Box,
  Typography,
  CardContent,
  List,
  ListItem,
  IconButton,
  Button,
} from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import Layout from 'src/Layout/Layout'
import GradeCard from './GradeCard'
import { nanoid } from '@reduxjs/toolkit'
import styled from '@emotion/styled'
import axiosClient from 'src/axiosClient'
import { useParams } from 'react-router-dom'

const CustomCard = styled(Card)`
  &.sticky {
    position: sticky;
    top: 10px;
    z-index: 2;
  }
`

const GradeAssignment = () => {
  const [assignments, setAssignments] = useState([])
  const { id } = useParams()

  const handleOnDragEnd = (result) => {
    if (!result.destination) return
    const item = Array.from(assignments)
    const [reorderedItem] = item.splice(result.source.index, 1)
    item.splice(result.destination.index, 0, reorderedItem)
    setAssignments(item)
  }

  const addNewAssignment = () => {
    const newAssignment = {
      id: nanoid(),
      name: '',
      point: '',
      isNew: true,
    }

    setAssignments((prevState) => [...prevState, newAssignment])
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosClient.get(`/api/classrooms/${id}/grades`)
      setAssignments(response.data)
    }

    fetchData()
  }, [])

  const updateAssignment = (id, newAssignment) => {
    setAssignments((prevState) => {
      const newAssignments = [...prevState]
      let index = newAssignments.findIndex((assignment) => assignment.id === id)
      newAssignments[index] = newAssignment
      return newAssignments
    })
  }

  const deleteAssignment = (id) => {
    setAssignments((prevState) =>
      prevState.filter((assignment) => assignment.id !== id)
    )
  }

  return (
    <Layout>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CustomCard sx={{ minWidth: 650 }} className={`sticky`}>
          <CardContent>
            <Typography variant="h3">Grade Structure</Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Edit your grade Structure
            </Typography>
            <Button onClick={addNewAssignment}>
              <AddIcon /> Add New Assignment
            </Button>
          </CardContent>
        </CustomCard>
        <div>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="GradeCard">
              {(provided) => (
                <List
                  className="GradeCard"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {assignments.map((assignment, index) => (
                    <Draggable
                      key={assignment.id}
                      draggableId={assignment.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <ListItem
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <GradeCard
                            grade={assignment}
                            updateAssignment={updateAssignment}
                            deleteAssignment={deleteAssignment}
                          />
                        </ListItem>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </List>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </Box>
    </Layout>
  )
}
export default GradeAssignment
