import { useEffect } from 'react'
import { ForceGraph2D } from 'react-force-graph'
import { api } from './lib/api'
import { useNavigate } from 'react-router-dom'

function App() {

  const navigation = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/users/check-auth', {withCredentials: true});

        if (response.status !== 200) {
          navigation('/login')
        }

      }
      catch (error) {
        navigation('/login')
      }
    }

    checkAuth()
  })


  const data = {
    "nodes": [
      {
        "id": "a95828fc-dca9-419b-af5c-393ccc1b3327"
      },
      {
        "id": "e1af9169-1b3e-471a-8165-09d0429402fe"
      },
      {
        "id": "c531c4cd-ca23-4344-a21a-f0cbc7f4223c"
      },
      {
        "id": "06506103-f0f4-474c-8eea-c90ed26113ff"
      },
      {
        "id": "0e5ee8f6-46d7-4cf3-ae55-d0c9141b5333"
      }
    ],
    "links": [
      {
        "source": "a95828fc-dca9-419b-af5c-393ccc1b3327",
        "target": "e1af9169-1b3e-471a-8165-09d0429402fe"
      },
      {
        "source": "e1af9169-1b3e-471a-8165-09d0429402fe",
        "target": "c531c4cd-ca23-4344-a21a-f0cbc7f4223c"
      },
      {
        "source": "e1af9169-1b3e-471a-8165-09d0429402fe",
        "target": "06506103-f0f4-474c-8eea-c90ed26113ff"
      },
      {
        "source": "e1af9169-1b3e-471a-8165-09d0429402fe",
        "target": "0e5ee8f6-46d7-4cf3-ae55-d0c9141b5333"
      }
    ]
  }

  return (
    <>
     <ForceGraph2D
      graphData={data}
      linkCurvature={0.2}
      linkColor={() => 'yellow'}
      nodeColor={() => 'orange'}
      backgroundColor='#020720'
      linkDirectionalParticles={0.5}
    />

    </>
  )
}

export default App
