import * as React from 'react'
import { CardActionArea, Card, CardContent, CardMedia, Typography } from '@mui/material'
import { useHistory } from 'react-router-dom'

export default function ClassroomCard({ classroom }) {
  const history = useHistory()
  const { name } = classroom

  const handleClick = () => {
    history.push(`/classrooms/${classroom.id}`)
  }

  return (
    <Card
      sx={{ minWidth: 345, maxWidth: 345, display: 'inline-block', m: 2 }}
      onClick={handleClick}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://image.freepik.com/free-photo/hand-painted-watercolor-background-with-sky-clouds-shape_24972-1095.jpg"
          alt="bg"
        />
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
