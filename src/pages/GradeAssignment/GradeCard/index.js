import React, { useState, useRef, useEffect } from 'react'
import { Button, Card, CardContent, Grid, TextField } from '@mui/material'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material'
import { styled } from '@mui/styles'
import axiosClient from 'src/axiosClient'
import { useParams } from 'react-router-dom'
import { showErrMsg } from 'src/utils/Notifications'

const FormButtonEdit = styled(Button)({
  padding: '30px 5px',
  borderRadius: '0px 4px 0px 0px',
})

const FormButtonRemove = styled(Button)({
  padding: '30px 3px',
  borderRadius: '0px 0px 4px 0px',
})

export default function GradeCard({
  grade,
  updateAssignment,
  deleteAssignment: propsDeleteAssignment,
}) {
  const [disabled, setDisabled] = useState(true)
  const mainRef = useRef(null)
  const { id: classroomId } = useParams()

  const [name, setName] = useState(grade.name)
  const [point, setPoint] = useState(grade.point)
  const [error, setError] = useState()

  const toggleEdit = async () => {
    if (!name || !point) {
      setError('name and point is required!')
    } else {
      if (!disabled) {
        await saveAssignment()
      }
      setDisabled((prevState) => !prevState)
    }
  }

  const deleteAssignment = async () => {
    if (!grade.isNew) {
      await axiosClient.delete(
        `/api/classrooms/${classroomId}/grades/${grade.id}`
      )
    }

    propsDeleteAssignment(grade.id)
  }

  const saveAssignment = async () => {
    if (grade.isNew) {
      try {
        const response = await axiosClient.post(
          `/api/classrooms/${classroomId}/grades`,
          {
            name,
            point,
            index: grade.index,
          }
        )
        updateAssignment(grade.id, response.data)
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        await axiosClient.put(
          `/api/classrooms/${classroomId}/grades/${grade.id}`,
          {
            name,
            point,
          }
        )
        updateAssignment(grade.id, { ...grade, name: 'test update', point: 1 })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleChangeName = (e) => {
    if (e.target.value.length < 255) {
      setName(e.target.value)
    }
    setError('')
  }

  const handleChangePoint = (e) => {
    if (e.target.value.length < 255) {
      setPoint(e.target.value)
      setError('')
    }
  }

  useEffect(() => {
    if (grade.isNew) {
      mainRef.current.focus()
      setDisabled(false)
    }
  }, [mainRef, grade.isNew])

  return (
    <Card
      sx={{ minWidth: 650, maxWidth: 650, m: 1 }}
      ref={mainRef}
      tabIndex="0"
    >
      {error && showErrMsg(error)}
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
        spacing={4}
      >
        <Grid item xs={10}>
          <CardContent>
            <TextField
              fullWidth
              variant="outlined"
              disabled={disabled}
              label="Grade Title"
              value={name}
              onChange={handleChangeName}
              required={true}
            ></TextField>
          </CardContent>
          <CardContent sx={{ marginTop: -2 }}>
            <TextField
              fullWidth
              variant="outlined"
              disabled={disabled}
              label="Grade Detail"
              value={point}
              onChange={handleChangePoint}
              type="number"
              required={true}
            ></TextField>
          </CardContent>
        </Grid>
        <Grid item xs={1.5}>
          <FormButtonEdit
            variant="contained"
            onClick={toggleEdit}
            color={disabled ? 'primary' : 'success'}
          >
            {disabled ? <EditIcon /> : <SaveIcon />}
          </FormButtonEdit>
          <FormButtonRemove
            color="error"
            fullWidth
            variant="contained"
            onClick={deleteAssignment}
          >
            <DeleteIcon />
          </FormButtonRemove>
        </Grid>
      </Grid>
    </Card>
  )
}
