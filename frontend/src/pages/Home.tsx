import { useEffect, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { api } from '../lib/api';
import { useAuth } from '../hooks/useAuth';

function Home() {
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
    <div className="flex-col gap-10 h-screen w-screen bg-background items-center flex justify-start">
      <div className=" top-10 left-5 absolute w-full z-50 flex">
      <div className="w-full gap-2 flex justify-start items-start flex-col">
      <h1 className="text-primaryText mb-8">
        Welcome, {user?.name}!
      </h1>
      <div className="w-full 2xl:justify-start gap-8 flex-row flex justify-evenly">
      <div className = "w-60 rounded-lg bg-purple-600 p-5 justify-center items-center flex flex-col gap-7">
      <p className="text-primaryText">
      Quatidade de pessoas usando o Fire Spread
      </p>
      <p className="text-5xl text-primaryText"> 
        347
      </p>
      </div>

      <div className = "w-60 rounded-lg bg-primaryButton p-5 justify-center items-center flex flex-col gap-7">
      <p className="text-primaryText ">
      Você possui uma chama de x pessoas!
      </p>
      <p className="text-5xl text-primaryText">
        347
      </p>
      </div>
     
      </div>
      
      </div>
      

      </div>
      
      <ForceGraph2D
        graphData={data}
        linkCurvature={0.2}
        linkColor={() => 'yellow'}
        nodeColor={() => 'orange'}
        backgroundColor='#03071E'
        linkDirectionalParticles={0.5}
      />
    </div>
  );
}

export default Home;
