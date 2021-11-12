import * as React from 'react'
import {
  CardActionArea,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'

export default function ClassroomCard({ classroom }) {
  console.log(classroom)
  const { name } = classroom

  return (
    <Card sx={{ minWidth: 345, maxWidth: 345, display: 'inline-block', m: 2 }}>
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
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
