"use client";

import { useState, useEffect } from "react";

interface SuperHero {
  id: string;
  name: string;
  image: {
    url: string;
  };
  biography: {
    "full-name": string;
    "alter-egos": string;
    aliases: string[];
    "place-of-birth": string;
    "first-appearance": string;
    publisher: string;
    alignment: string;
  };
  powerstats: {
    intelligence: string;
    strength: string;
    speed: string;
    durability: string;
    power: string;
    combat: string;
  };
  appearance: {
    gender: string;
    race: string;
    height: string[];
    weight: string[];
    "eye-color": string;
    "hair-color": string;
  };
  work: {
    occupation: string;
    base: string;
  };
  connections: {
    "group-affiliation": string;
    relatives: string;
  };
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<SuperHero[]>([]);
  const [superHero, setSuperHero] = useState<SuperHero | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getSuperHero = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/superhero/search/${search}`);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();

      if (data.response === "success") {
        setResults(data.results);
      } else {
        setResults([]);
        setError("No results found.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      getSuperHero();
    }
  };

  const handleCardEnter = (superHero: SuperHero) => {
    setSuperHero(superHero);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSuperHero(null);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <h1 className="font-impact text-xl font-normal text-center mt-2 uppercase">
        SuperHero API Search Engine
      </h1>
      <div className="mx-auto px-4">
        <input
          className="rounded-sm border border-black mr-4 text-black sm:w-auto p-1 sm:mb-2"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for a Superhero"
        />
        <button
          className="rounded-full py-3 px-6 bg-black p-2 sm:mt-0 sm:ml-2 w-full sm:w-auto"
          onClick={getSuperHero}
          disabled={loading}
        >
          {loading ? "Loading..." : "Search"}
        </button>
        {error && <div className="text-red-500">{error}</div>}
        <div className="grid grid-cols-1 gap-1 m-5 justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 md:gap-4 mt-6">
          {results.map((result) => (
            <div
              key={result.id}
              className="bg-white shadow-md border-2 border-black rounded-lg overflow-hidden flex flex-col items-center w-60 h-80 cursor-pointer transform transition duration-200 hover:scale-105"
              onClick={() => handleCardEnter(result)}
            >
              <div className="text-center text-lg font-impact text-white bg-black w-full">
                {result.name}
              </div>
              {result.image.url ? (
                <img
                  className="rounded-sm w-48 h-48 border-black border-2 mt-2"
                  src={result.image.url}
                  alt={result.name}
                  draggable="false"
                />
              ) : (
                <div className="w-48 h-48 bg-gray-200 mt-2">
                  <p className="text-black">No Image Available</p>
                </div>
              )}

              <div className=" text-black w-full text-sm pt-1 pl-3 pr-3 pb-3">
                <p>
                  <strong>Full Name: </strong>
                  {result.biography["full-name"] || "No Known Name"}
                </p>
                <p>
                  <strong>Alignment: </strong>
                  {capitalizeFirstLetter(result.biography.alignment)}
                </p>
                <p>
                  <strong>Publisher: </strong>
                  {result.biography.publisher}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && superHero && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center "
          onClick={handleOverlayClick}
        >
          <div className="bg-white rounded-lg pb-10 pr-10 pl-10 h-[80%] overflow-y-auto overflow-x-hidden">
            <h2 className="text-center font-normal font-impact text-2xl text-black mt-2 mb-2 w-full">
              {superHero.name}
            </h2>
            {superHero.image.url ? (
              <img
                className="rounded-sm w-48 h-48 mx-auto mb-4 border-black border-2"
                src={superHero.image.url}
                alt={superHero.name}
                draggable="false"
              />
            ) : (
              <div className="w-48 h-48 mx-auto mb-4 bg-gray-200">
                <p className="text-black">No Image Available</p>
              </div>
            )}
            <div className="text-left text-black w-96">
              <div className="border-2 border-black p-1">
                <p className="text-cyan-500">
                  <strong>Intelligence: </strong>
                  {superHero.powerstats.intelligence}
                </p>
                <p className="text-green-500">
                  <strong>Strength: </strong>
                  {superHero.powerstats.strength}
                </p>
                <p className="text-yellow-500">
                  <strong>Speed: </strong>
                  {superHero.powerstats.speed}
                </p>
                <p className="text-orange-500">
                  <strong>Durability: </strong>
                  {superHero.powerstats.durability}
                </p>
                <p className="text-purple-500">
                  <strong>Power: </strong>
                  {superHero.powerstats.power}
                </p>
                <p className="text-red-500">
                  <strong>Combat: </strong>
                  {superHero.powerstats.combat}
                </p>
              </div>
              <p>
                <strong>Alter Egos: </strong>
                {superHero.biography["alter-egos"]}
              </p>
              <p>
                <strong>Place of Birth: </strong>
                {superHero.biography["place-of-birth"]}
              </p>
              <p>
                <strong>First Appearance: </strong>
                {superHero.biography["first-appearance"]}
              </p>
              <p>
                <strong>Gender: </strong>
                {superHero.appearance.gender}
              </p>
              <p>
                <strong>Race: </strong>
                {superHero.appearance.race}
              </p>
              <p>
                <strong>Height: </strong>
                {superHero.appearance.height.join(", ")}
              </p>
              <p>
                <strong>Weight: </strong>
                {superHero.appearance.weight.join(", ")}
              </p>
              <p>
                <strong>Eye Color: </strong>
                {superHero.appearance["eye-color"]}
              </p>
              <p>
                <strong>Hair Color: </strong>
                {superHero.appearance["hair-color"]}
              </p>
              <p>
                <strong>Occupation: </strong>
                {superHero.work.occupation}
              </p>
              <p>
                <strong>Base: </strong>
                {superHero.work.base}
              </p>
              <p>
                <strong>Group Affiliation: </strong>
                {superHero.connections["group-affiliation"]}
              </p>
              <p>
                <strong>Relatives: </strong>
                {superHero.connections.relatives}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
