import { useEffect, useState } from "react";
import { ForceGraph2D } from "react-force-graph";
import { api } from "../lib/api";
import { useAuth } from "../hooks/useAuth";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { AddFriendForm } from "../components/shared/AddFriendForm";
import CarouselCurios from "../components/shared/CarouselCurios";

interface INode {
  id: string;
  index: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
}

function Home() {
  const { user } = useAuth();
  const [data, setData] = useState({ nodes: [], links: [] });

  const [usersCount, setUsersCount] = useState(0);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((prev) => !prev);

  useEffect(() => {
    const getTree = async () => {
      if (!user) return;

      try {
        const res = await api.get(`/users/generate-tree/${user.id}`, {
          withCredentials: true,
        });

        res.data.nodes[0].fx = 0;
        res.data.nodes[0].fy = 100;

        setData(res.data);
      } catch (error) {
        console.error("Error fetching the tree:", error);
      }
    };

    const getUsersCount = async () => {
      try {
        const res = await api.get("/users/count");
        setUsersCount(res.data.totalUsers);
      } catch (error) {
        console.error("Error fetching the users count:", error);
      }
    };

    if (user) {
      getTree();
    }

    getUsersCount();
  }, [user]);

  const AccordionIcon = () => {
    return (
      <i
        className={`fas fa-chevron-${open ? "up" : "down"} text-primaryText`}
      ></i>
    );
  };

  return (
    <div className="flex-col gap-10 w-screen bg-background items-center flex justify-start">
      <div className=" top-10 left-5 absolute w-[90vw] z-50 flex">
        <Accordion open={open} icon={<AccordionIcon />}>
          <AccordionHeader className="bg-transparent" onClick={handleOpen}>
            <h1 className="text-primaryText mb-8 text-4xl">
              Welcome, {user?.name}!
            </h1>
          </AccordionHeader>
          <AccordionBody>
            <div className="w-full gap-2 flex justify-start items-start flex-col">
              <div className="grid grid-cols-2 gap-8 w-full md:w-[960px] md:grid-cols-4">
                <CarouselCurios data={data} usersCount={usersCount} />
                <div className="col-span-2 rounded-lg bg-opacity-80 bg-purple-600 p-5 justify-center items-center flex flex-col gap-7">
                  <p className="text-primaryText">
                    Digite o código de amizade de alguém para se conectar:
                  </p>
                  <AddFriendForm className="flex gap-8" />
                </div>
                <div className="rounded-lg bg-opacity-80 bg-purple-600 p-5 justify-center items-center flex flex-col gap-7">
                  <p className="text-primaryText">Seu código de amizade é:</p>
                  <p className="text-5xl text-primaryText">{user?.inviteId}</p>
                </div>
              </div>
            </div>
          </AccordionBody>
        </Accordion>
      </div>

      <div className="w-screen">
        {data.nodes.length > 0 && (
          <ForceGraph2D
            graphData={data}
            linkCurvature={0.2}
            linkColor={() => "yellow"}
            nodeColor={(a: INode) => {
              if (a.id === user?.id) {
                return "green";
              }
              return "orange";
            }}
            backgroundColor="#03071E"
            linkDirectionalParticles={0.5}
            warmupTicks={1000}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
