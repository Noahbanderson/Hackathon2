import React, { useEffect, useState } from 'react';
import { Card, Header} from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const [videos, setVideos] = useState([])

  useEffect(() => {

    axios.get("/api/thirtyIndex")
      .then(res => {
        setVideos(res.data)
      })
      .catch(err => {
        console.log(err)
      })

  }, [])

  // card, on click, goes to view page. use the id. 

  return (
    <div >
      <div style={{display: "flex", alignItems: "center"}}> 
        <Header as="h1">Welcome to Utoob</Header>
      </div>
      <div style={{marginTop: "100px"}}>
        <Card.Group itemsPerRow={4}>
          {videos.map(vid =>
            <Card as={Link} key={vid.id} >
              <iframe src={`${vid.trailer}`} />
              <Card.Content>
                {vid.title}
              </Card.Content>
            </Card>
          )}
        </Card.Group>
      </div>
    </div>
  )

}



export default Home;
