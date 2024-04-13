import { useEffect, useState } from "react";
import { ForceGraph2D } from "react-force-graph";
import { api } from "../lib/api";
import { useAuth } from "../hooks/useAuth";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";

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
              <div className="w-full 2xl:justify-start gap-8 flex-row flex justify-evenly">
                <div className="w-60 rounded-lg bg-purple-600 p-5 justify-center items-center flex flex-col gap-7">
                  <p className="text-primaryText">
                    Quatidade de pessoas usando o Fire Spread
                  </p>
                  <p className="text-5xl text-primaryText">{usersCount}</p>
                </div>

                <div className="w-60 rounded-lg bg-primaryButton p-5 justify-center items-center flex flex-col gap-7">
                  <p className="text-primaryText ">Sua rede alcança:</p>
                  <p className="text-5xl text-primaryText">
                    {data.nodes.length - 1}
                  </p>
                </div>
              </div>
            </div>
          </AccordionBody>
        </Accordion>
      </div>

      <div className="w-screen">
        <ForceGraph2D
          graphData={data}
          linkCurvature={0.2}
          linkColor={() => "yellow"}
          nodeColor={() => "orange"}
          backgroundColor="#03071E"
          linkDirectionalParticles={0.5}
          width={window.innerWidth}
        />
      </div>
    </div>
  );
}

export default Home;
