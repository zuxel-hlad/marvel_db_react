import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import CharListItem from '../charListItem/CharListItem';
import './charList.scss';
import useApi from '../../services/MarvelService';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const CharList = (props) => {
  const [characters, setCharacters] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [charOffset, setCharOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);
  const { loading, error, getAllCharacters } = useApi();

  useEffect(() => updateCharList(charOffset, true), []);

  const onCharListLoaded = (allCharacters) => {
    let endedCharsFromApi = false;
    if (allCharacters.length < 9) endedCharsFromApi = true;
    setCharacters((characters) => [...characters, ...allCharacters]);
    setCharOffset((charOffset) => charOffset + 9);
    setLoadingMore(false);
    setCharEnded(endedCharsFromApi);
  };

  const updateCharList = async (offset, initial) => {
    initial ? setLoadingMore(false) : setLoadingMore(true);
    const charList = await getAllCharacters(offset);
    onCharListLoaded(charList);
  };

  const setSelected = (id) => {
    const { setSelectedChar } = props;

    const charlistWithSelectedChar = characters.map((char) => {
      if (char.id === id) {
        return { ...char, selected: !char.selected };
      }

      return char;
    });

    setSelectedChar(id);
    setCharacters(charlistWithSelectedChar);
  };

  const renderedItems = (arr) => {
    const charCards = arr.map((char, index) => {
      return (
        <CSSTransition key={char.id} classNames="char__item" timeout={300}>
          <CharListItem {...char} index={index} setSelected={setSelected} />
        </CSSTransition>
      );
    });

    return (
      <TransitionGroup component={'ul'} className="char__grid">
        {charCards}
      </TransitionGroup>
    );
  };

  const hideBtn = charEnded ? 'button__hide' : '';
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !loadingMore ? <Spinner /> : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {renderedItems(characters)}
      <button
        className={`button button__main button__long ${hideBtn}`}
        disabled={loadingMore}
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
