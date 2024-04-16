import { Carousel, IconButton } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";

interface CarouselCuriosProps {
  usersCount: number;
  data: any;
}

export default function CarouselCurios({
  usersCount,
  data,
}: CarouselCuriosProps) {
  const [birthdayPeople, setBirthdayPeople] = useState(0);
  useEffect(() => {
    const getBirthdayPeople = async () => {
      try {
        const res = await api.get("/users/search");
        setBirthdayPeople(res.data.distance);
      } catch (error) {
        console.error("Error fetching the birthday people:", error);
      }
    };

    getBirthdayPeople();
  }, []);
  return (
    <Carousel
      className="rounded-xl col-span-2"
      autoplay={true}
      autoplayDelay={5000}
      loop={true}
      transition={{
        type: "spring",
        duration: 1,
        damping: 10,
        stiffness: 30,
        mass: 1,
      }}
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="filled"
          color="gray"
          size="lg"
          onClick={handlePrev}
          className="!absolute top-2/4 left-4 -translate-y-2/4 bg-transparent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="filled"
          color="black"
          size="lg"
          onClick={handleNext}
          className="!absolute top-2/4 !right-4 -translate-y-2/4 bg-transparent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </IconButton>
      )}
    >
      <div className="h-48 rounded-lg bg-opacity-80 bg-purple-600 p-5 justify-center items-center flex flex-col gap-7">
        <p className="text-primaryText text-2xl">
          Curiosidades sobre sua rede:
        </p>
      </div>

      <div className="h-48 rounded-lg bg-opacity-80 bg-purple-600 p-5 justify-center items-center flex flex-col gap-3">
        <p className="text-primaryText">
          Quatidade de pessoas usando o Fire Spread
        </p>
        <p className="text-5xl text-primaryText">{usersCount}</p>
        <p className="text-primaryText"> pessoas</p>
      </div>

      <div className="h-48 rounded-lg bg-opacity-80 bg-primaryButton p-5 justify-center items-center flex flex-col gap-3">
        <p className="text-primaryText ">Sua rede alcança:</p>
        <p className="text-5xl text-primaryText">{data.nodes.length - 1}</p>
        <p className="text-primaryText"> pessoas</p>
      </div>
      {birthdayPeople == 0 && (
        <div className="h-48 rounded-lg bg-opacity-80 bg-purple-600 p-5 justify-center items-center flex flex-col gap-3">
          <p className="text-primaryText">
            Há uma pessoa que faz aniversário no mesmo dia que você à:
          </p>
          <p className="text-5xl text-primaryText">{birthdayPeople}</p>
          <p className="text-primaryText"> conexôes de distância</p>
        </div>
      )}
    </Carousel>
  );
}
