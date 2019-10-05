import React, { useState, useEffect } from 'react';
import { Header, Card, Container, Form, } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from "react-router-dom";

const View = (props) => {
  const [videos, setVideos] = useState([])
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("")

  useEffect(() => {
    axios.get("/api/find_user")
      .then(res => {
        debugger
        setComments(res.data)
      })
    axios.get("/api/tenIndex")
      .then(res => setVideos(res.data))

  }, [])




  // create a new comment via axios to db
  // update state to include this most recent comment


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/comments", { body: comment, video_id: props.match.params.id })
      .then(res => {
        setComments([res.data, ...comments])
        setComment("")
      })
      .catch(err => {
        console.log(err)
      })
  }


  const foo = (c) => {
    axios.get("/api/find_user", { params: { user_id: c } })
      .then(res => {
        return (
          <div>
            res.data.name
      </div>
        )
      })
      .catch(err => console.log(err))



  }

  return (
    <>
      <div className="embed-responsive embed-responsive-16by9" style={{ width: '100vw', height: '100vh' }}>
        <iframe title="Embeds Page" className="embed-responsive-item" src="https://www.youtube.com/embed/3x2ABSAMVno" allowfullscreen width="100%" height="100%"></iframe>
      </div>
      <Container>
        <Card style={{ padding: "50px", width: '100vw', height: '8vw' }}>
          <Header as="h4">Video Title</Header>
        </Card>
        <Card style={{ padding: "50px", width: '100vw', height: '8vw' }}>
          {/* <Image></Image> */}
          <div>Author</div>
        </Card>
        <Card style={{ padding: "50px", width: '55vw' }}>
          <div>Comments</div>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              placeholder="Add comment here..."
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Form.Button primary>Submit</Form.Button>
          </Form >
        </Card>


        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{float: "left"}}>

            {comments.map(c => {
              return (
                <div key={c.id}>
                  <Card>
                    <Card.Header>
                      {c.name}
                    </Card.Header>
                    <Card.Meta>
                      {c.body}
                    </Card.Meta>
                  </Card>
                </div>
              )
            })}
          </div>

          <div style={{ float: "right"}}>
            <Header as="h3" textAlign="center">Recomended Videos</Header>

            {videos.map(vid =>
              <Card as={Link} key={vid.id} to={`/view/${vid.id}`} >
                <iframe src={`${vid.trailer}`} />
                <Card.Content>
                  {vid.title}
                </Card.Content>
              </Card>
            )}

          </div>
        </div>
      </Container>
    </>
  )
}

export default View;
