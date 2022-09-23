import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import CharListItem from '../charListItem/CharListItem';
import './charList.scss';
import useApi from '../../services/MarvelService';
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";


const setContent = (process, Component, newItemLoading) => {
  switch (process) {
    case 'waiting':
      return <Spinner/>;
    case 'loading':
      return newItemLoading ? <Component/> : <Spinner/>;
    case 'confirmed':
      return <Component/>;
    case 'error':
      return <ErrorMessage/>
    default:
      throw new Error('Unexpected process state');
  }
}

const CharList = (props) => {
  const [characters, setCharacters] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [charOffset, setCharOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);
  const {getAllCharacters, process, setProcess} = useApi();

  useEffect(() => {
    updateCharList(charOffset, true)
    // eslint-disable-next-line
  }, []);

  const onCharListLoaded = (allCharacters) => {
    let endedCharsFromApi = false;
    if (allCharacters.length < 9) endedCharsFromApi = true;
    setCharacters((characters) => [...characters, ...allCharacters]);
    setCharOffset((charOffset) => charOffset + 9);
    setNewItemLoading(false);
    setCharEnded(endedCharsFromApi);
  };

  const updateCharList = async (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    const charList = await getAllCharacters(offset);
    onCharListLoaded(charList);
    setProcess('confirmed');
  };

  const setSelected = (id) => {
    const {setSelectedChar} = props;

    const charListWithSelectedChar = characters.map((char) => {
      if (char.id === id) {
        return {...char, selected: !char.selected};
      }

      return char;
    });

    setSelectedChar(id);
    setCharacters(charListWithSelectedChar);
  };

  const renderedItems = (arr) => {
    const charCards = arr.map((char, index) => {
      return <CharListItem {...char} index={index} setSelected={setSelected} key={char.id}/>
    });

    return (
      <ul className="char__grid">
        {charCards}
      </ul>
    );
  };

  const hideBtn = charEnded ? 'button__hide' : '';

  return (
    <div className="char__list">
      {setContent(process, () => renderedItems(characters), newItemLoading)}
      <button
        className={`button button__main button__long ${hideBtn}`}
        disabled={newItemLoading}
        onClick={() => updateCharList(charOffset, false)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  setSelectedChar: PropTypes.func.isRequired,
};

export default CharList;
