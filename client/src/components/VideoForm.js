import React, { useState, useEffect } from 'react'
import { Form, Header } from "semantic-ui-react"
import axios from 'axios'

const VideoForm = (props) => {

  const [title, setTitle] = useState("")
  const [duration, setDuration] = useState("")
  const [genre, setGenre] = useState("")
  const [descriptions, setDescriptions] = useState("")
  const [trailer, setTrailer] = useState("")

  const handleSubmit = () => {

    axios.post("/api/videos", { title, duration, genre, descriptions, trailer })
      .then(res => {
        props.history.push("/user")
      })
      .catch(err => {
        console.log(err)
      })


  }

  useEffect(() => {
    if (props.match.params.id) {

      axios.get(`/api/videos/${props.match.params.id}`)
        .then(res => {
          const r = res.data
          setTitle(r.title)
          setDuration(r.duration)
          setGenre(r.genre)
          setDescriptions(r.descriptions)
          setTrailer(r.trailer)
        })
    } else {

    };
  }, [])

  return (
    <div>
      <br />
      <br />
      <Header as="h1">{props.match.params.id ? "Edit Video":"UploadVideo" }</Header>
      <Form onSubmit={handleSubmit}>
        <br />
        <br />
        <Form.Group widths="equal">
          <Form.Input
            required
            name="title"
            value={title}
            placeholder="What would you like the title of your video to be?"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Form.Input
            required
            name="duration"
            value={duration}
            placeholder="How long is this video?"
            onChange={(e) => setDuration(e.target.value)}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            required
            name="genre"
            value={genre}
            placeholder="What is the genre of this video?"
            onChange={(e) => setGenre(e.target.value)}
          />
          <Form.Input
            required
            name="descriptions"
            value={descriptions}
            placeholder="Please provide a description of this video"
            onChange={(e) => setDescriptions(e.target.value)}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            required
            name="trailer"
            value={trailer}
            placeholder="What is the URL of the video?"
            onChange={(e) => setTrailer(e.target.value)}
          />
        </Form.Group>
        <Form.Button color="green">Submit</Form.Button>
      </Form>
    </div>

  )
}

export default VideoForm