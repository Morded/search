import type { NextPage } from "next";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import DefinitionCard from "../components/definitioncard";
import { FiSearch, FiType } from "react-icons/fi";

const Home: NextPage = () => {
  const [results, setResults] = useState<any>([]);
  const [noResult, setNoResult] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  async function fetchData() {
    const options = {
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

      await axios.request(options)
        .then(function(response) {
          setResults(response.data);
          setNoResult(false);
          console.log(response.data);
        })
        .catch(function(error) {
          console.error(error);
          setNoResult(true);
        });

    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetchData();
  };

  return (
    <>
      <div className="my-20 flex flex-col gap-2 items-center text-white">
        <FiType className="text-3xl font-bold" />
        <h3 className="text-lg text-center ">
          Search for a word
        </h3>

        <form className="flex flex-row shadow-md" onSubmit={handleSearch}>
          <input className="px-4 py-1 rounded-l-3xl bg-slate-700" autoFocus ref={searchRef} type="search" />
          <button className="w-auto uppercase py-3 px-6 font-extrabold bg-slate-700 rounded-r-3xl hover:bg-slate-600 transition-all duration-300 ease-in-out">
            <FiSearch />
          </button>
        </form>
      </div>

      {
        noResult &&
        <div className="text-2xl"><span className="font-bold text-[#52728a]">No results</span> 😿</div>
      }

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

      {!noResult &&
        <>
          <div className="m-3"></div>
          <div className="text-2xl p-2 font-extrabold text-center text-[#52728a]">Definition cards</div>
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
        </>
      }

    </>
  );
};


export default Home;


