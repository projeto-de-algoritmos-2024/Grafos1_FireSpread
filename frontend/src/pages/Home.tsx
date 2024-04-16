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
import { AlertDismissible } from "../components/shared/Alert";

interface INode {
  id: string;
  index: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
  name: string;
  image: HTMLImageElement;
}

interface IData {
  nodes: INode[];
  links: ILink[];
}

interface ILink {
  source: INode;
  target: INode;
}

function Home() {
  const { user, logout } = useAuth();
  const [data, setData] = useState<IData>({ nodes: [], links: [] });

  const [usersCount, setUsersCount] = useState(0);

  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(data.nodes.length === 0);
  const handleOpen = () => setOpen((prev) => !prev);
  const getTree = async () => {
    if (!user) return;

    try {
      const res = await api.get(`/users/generate-tree/${user.id}`, {
        withCredentials: true,
      });

      res.data.nodes[0].fx = 0;
      res.data.nodes[0].fy = 100;

      const img = new Image();
      img.src = "/fireNode.svg";

      res.data.nodes.forEach((node: INode) => {
        node.image = img;
      });

      setData(res.data);
    } catch (error) {
      console.error("Error fetching the tree:", error);
    }
  };

  useEffect(() => {
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
              Bem vindo, {user?.name}!
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
                  <AddFriendForm
                    className="flex gap-8"
                    onFriendAdded={getTree}
                  />
                </div>
                <div className="rounded-lg bg-opacity-80 bg-purple-600 p-5 justify-center items-center flex flex-col gap-7">
                  <p className="text-primaryText">Seu código de amizade é:</p>
                  <p className="text-5xl text-primaryText">{user?.inviteId}</p>
                </div>
                <button
                  className="rounded-lg bg-opacity-80 bg-primaryButton p-5 justify-center items-center flex flex-row gap-2"
                  onClick={logout}
                >
                  <p className="text-2xl text-primaryText">Desconectar</p>
                  <i className="fas fa-sign-out-alt text-primaryText text-2xl"></i>
                </button>
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
            linkColor={(link: ILink) => {
              const opacity = 1.3 - Math.min(1, (100 - link.source.y) / 100);
              return `rgba(245, 189, 66, ${opacity})`;
            }}
            nodeColor={(a: INode) => {
              if (a.id === user?.id) {
                return "#f2ff05";
              }
              return "orange";
            }}
            nodeRelSize={8}
            backgroundColor="#03071E"
            linkDirectionalParticles={0.5}
            warmupTicks={1001}
            nodeCanvasObject={(
              node: INode,
              ctx: CanvasRenderingContext2D,
              globalScale: number
            ) => {
              let size = 40 / globalScale;

              if (node.id === user?.id) {
                size = 60 / globalScale;
              }

              ctx.globalAlpha = 1.3 - Math.min(1, (100 - node.y) / 100);
              ctx.drawImage(
                node.image,
                node.x - size / 2,
                node.y - size / 1.2,
                size,
                size
              );
              ctx.globalAlpha = 1;
            }}
          />
        )}
      </div>

      {true && (
        <AlertDismissible
          open={alertOpen}
          setOpen={setAlertOpen}
          message="Adicione amigos para visualizar sua conexão crescendo!"
          type="success"
        />
      )}
    </div>
  );
}

export default Home;
