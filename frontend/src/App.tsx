import { useEffect, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { api } from './lib/api';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user } = useAuth(); 
  const [data, setData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    const getTree = async () => {

      if(!user) return;

      try {
        const res = await api.get(`/users/generate-tree/${user.id}`, { withCredentials: true });
        setData(res.data);
      } catch (error) {
        console.error("Error fetching the tree:", error);
      }
    };

    if (user) {
      getTree();
    }
  }, [user]);

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
  );
}

export default App;
