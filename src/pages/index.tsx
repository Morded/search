import type { NextPage } from "next";
import axios from "axios";
import { useState, useRef } from "react";
import DefinitionCard from "../components/definitioncard";

const Home: NextPage = () => {
  const [results, setResults] = useState<any>([]);
  const searchRef = useRef<HTMLInputElement>(null);

  const fetchData = () => {
    let options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '27521e08ecmsh0900ed67d647ad5p1d09adjsn59e3351cf823',
        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
      },
      url: 'https://wordsapiv1.p.rapidapi.com/words/',
    };

    if (searchRef.current) {
      options.url += searchRef.current.value;
      setResults([]);

      axios.request(options)
        .then(function(response) {
          setResults(response.data);
          console.log(response.data);
        })
        .catch(function(error) {
          console.error(error);
        });
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetchData();
  };

  return (
    <>
      <div className="my-20">
        <h3 className="text-lg text-center">
          Search for a word
        </h3>
        <div className="m-2"></div>

        <form className="grid" onSubmit={handleSearch}>
          <input className="text-black px-2 py-1 rounded" autoFocus ref={searchRef} type="search" />
          <div className="m-1"></div>
          <button className="w-auto uppercase py-1 font-extrabold border-2 border-teal-500 text-teal-500 rounded duration-501 motion-safe:hover:scale-105">Search</button>
        </form>
      </div>

      {
        results.syllables &&
        <div className="text-2xl text-center font-extrabold text-[#52728a]">
          <p className="mb-2">
            Syllables: {results.syllables?.list.join(' - ')}
          </p>
          <p className="mb-4">
            Pronunciation: {results.pronunciation?.all}
          </p>
        </div>
      }

      <div className="">
        <div className="m-3"></div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {
            results?.results?.map((result: { index: number; definition: string; partOfSpeech: string; synonyms: []; examples: [] }) => (
              <>
                <DefinitionCard
                  key={result.index}
                  definition={result.definition}
                  partOfSpeech={result.partOfSpeech}
                  synonyms={result.synonyms}
                  examples={result.examples}
                />
              </>
            ))
          }</div>
        <div className="p-4"></div>
      </div>

    </>
  );
};


export default Home;


