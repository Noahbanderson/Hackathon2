import React, { useState, useEffect } from 'react';
import { Header, Card, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    axios.get("api/videos")
      .then(res => {setVideos(res.data)})
      .catch(err => {console.log(err)})
  }, [])

  const removeVideo = (id) => {
    const p = prompt("Are you sure you want to delete this video? (yes/no)").toLowerCase()
    if (p === "yes"){
      axios.delete(`api/videos/${id}`)
      .then(res => {
        setVideos(videos.filter(c => c.id !== id))
        alert(`${res.data.message}`)
      })
      .catch(err=>{console.log(err)})
    } else {

  
    }
  }

  const editVideo = () => {
    debugger // import new video componenet
  }



  return (
    <div>
      <br />
      <br />
      <Header as="h3" textAlign="center">Your Videos</Header>
      <div style={{ marginTop: "100px" }}>
        <Card.Group itemsPerRow={4}>
          {videos.map(vid =>
            <Card as={Link} key={vid.id} >
              <iframe src={`${vid.trailer}`} />
              <Card.Content>
                {vid.title}
              </Card.Content>
              <Card.Content extra>
                <Button onClick={editVideo} size="tiny" color="blue">Edit</Button>
                <Button onClick={() => removeVideo(vid.id)} size="tiny" color="red">Delete</Button>
                
              </Card.Content>
            </Card>
          )}
        </Card.Group>
      </div>

    </div>
  )
}

export default Home;
