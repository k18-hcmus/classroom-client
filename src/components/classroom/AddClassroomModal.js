import React, { useState } from 'react'
import { Button, Typography, Modal, Grid, TextField } from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
}

export default function AddClassroomModal({ open, toggle, addClassroom }) {
  const [name, setName] = useState('')
  const [section, setSection] = useState('')
  const [subject, setSubject] = useState('')
  const [disabled, setDisabled] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setDisabled(true)
    try {
      await addClassroom({ name, section, subject })
    } catch (err) {
      alert(err)
    }

    setDisabled(false)
    toggle()
  }

  const handleChangeName = (e) => {
    setName(e.target.value)
    console.log(name)
  }
  const handleChangeSection = (e) => {
    setSection(e.target.value)
    console.log(section)
  }
  const handleChangeSubject = (e) => {
    setSubject(e.target.value)
    console.log(subject)
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={toggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid
          sx={style}
          container
          onSubmit={handleSubmit}
          component="form"
          justifyContent="right"
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mr: 'auto', mb: 1 }}
          >
            Create new Classroom
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            value={name}
            onChange={handleChangeName}
            label="Class name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={section}
            onChange={handleChangeSection}
            label="Section"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={subject}
            onChange={handleChangeSubject}
            label="Subject"
            autoFocus
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={disabled}
          >
            Create
          </Button>
        </Grid>
      </Modal>
    </div>
  )
}
