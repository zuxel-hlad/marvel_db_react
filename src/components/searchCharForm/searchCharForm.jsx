import { useEffect, useState } from 'react';
import useApi from '../../services/MarvelService';
import { Link } from 'react-router-dom';
import './serachCharForm.scss';

const SearchCharForm = () => {
  const [char, setChar] = useState('');
  const [searchedChar, setSearchedChar] = useState(null);
  const [startSearch, setStartSearch] = useState(false);
  const { getCharacterByName, error, loading, clearError } = useApi();

  const getCharFromApi = async (e) => {
    e.preventDefault();
    if (!char) return false;
    setSearchedChar(null);
    clearError();
    setStartSearch(true);
    const responsChar = await getCharacterByName(char);
    setSearchedChar(responsChar);
    setStartSearch(false);
    console.log('works');
  };

  useEffect(() => {
    console.log(error);
  }, [error]);

  let results = null;
  if (searchedChar && !startSearch) {
    results = (
      <div className="search-form__group search-form__group_footer">
        <span className="search-form__text search-form__text_success">
          {`There is! Visit ${searchedChar.name} page?`}
        </span>
        <Link
          className="button button__secondary"
          to={`/characters/${searchedChar.name}`}
        >
          <div className="inner">TO PAGE</div>
        </Link>
      </div>
    );
  } else if (!searchedChar && startSearch && !loading) {
    results = (
      <div className="search-form__group search-form__group_footer">
        <span className="search-form__text search-form__text_error">
          The character was not found. Check the name and try again!
        </span>
      </div>
    );
  } else {
    results = null;
  }

  return (
    <form className="search-form" onSubmit={getCharFromApi}>
      <div className="search-form__group search-form__group_main">
        <label className="search-form__label">
          <span className="search-form__text">
            Or find a character by name:
          </span>
          <input
            className="search-form__input"
            type="text"
            onChange={(e) => setChar(e.target.value)}
            value={char}
            placeholder="Enter character name"
          />
        </label>
        <button
          className="button button__main"
          type="submit"
          disabled={startSearch && loading}
        >
          <div className="inner">FIND</div>
        </button>
      </div>
      {results}
    </form>
  );
};

export default SearchCharForm;
