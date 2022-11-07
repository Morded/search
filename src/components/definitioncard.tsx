import { FiVolume2, FiList } from "react-icons/fi";

type DefinitionCardProps = {
  definition: string;
  partOfSpeech: string;
  synonyms: [];
  examples: [];
};

const DefinitionCard = ({
  definition,
  partOfSpeech,
  synonyms,
  examples
}: DefinitionCardProps) => {
  return (
    <section className="flex flex-col bg-white bg-opacity-5 rounded-md p-6 shadow-md transition-all duration-400 delay-200">

      <p className="text-md px-2 mb-2 bg-gray-600 w-fit rounded-2xl">{partOfSpeech}</p>
      <p className="text-sm first-letter:capitalize">{definition}.</p>

      <ArrayGroup
        title='Synonyms'
        list={synonyms}
        color='teal-500'
      />
      <ArrayGroup
        title='Examples'
        list={examples}
        color='yellow-600'
      />

    </section >
  );
};

export default DefinitionCard;

type GroupProps = {
  title: string;
  list: [];
  color: string;
};

const ArrayGroup = ({
  title,
  list,
  color
}: GroupProps) => {
  return (
    <>
      {list &&
        <>
          <div className="m-2"></div>
          <h2 className={`text-sm font-bold mb-2 ${color}`}>{title}</h2>
          <ul>
            {list.map((item: string) => (
              <>
                <li className="border-l-2 border-gray-600 mb-1 px-2 text-sm first-letter:capitalize" key={item}>
                  {item}.
                </li>
              </>
            ))}
          </ul>
        </>
      }
    </>
  );
};
