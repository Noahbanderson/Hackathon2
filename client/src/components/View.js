import React, { useState, useEffect } from 'react';
import { Header, Card, } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from "react-router-dom";

const View = () => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    axios.get("/api/tenIndex")
      .then(res => {
        setVideos(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <Header as="h3" textAlign="center">View of individual video</Header>

      {videos.map(vid =>
        <Card as={Link} key={vid.id} to={`/view/${vid.id}`} >
          <iframe src={`${vid.trailer}`} />
          <Card.Content>
            {vid.title}
          </Card.Content>
        </Card>
      )}

    </div>
  )
}

export default View;
