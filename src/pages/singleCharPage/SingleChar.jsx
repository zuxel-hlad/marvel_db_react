import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../../services/MarvelService';
import Spinner from '../../components/spinner/Spinner';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import { useHistory } from 'react-router-dom';
import comicsListDefaultImage from '../../resources/img/comics-list-default.jpg';
import AppBanner from '../../components/appBanner/AppBanner';
import ListImage from '../../components/listImage/ListImage';
import './singleChar.scss';

const SingleChar = () => {
  const [char, setChar] = useState({});
  const { loading, error, getCharacterByName, clearError } = useApi();
  const { name } = useParams();
  const { goBack } = useHistory();

  useEffect(() => updateComic(name), [name]);

  const onComicLoaded = (comicItem) => {
    setChar({ ...comicItem });
  };

  const updateComic = async (name) => {
    clearError();
    const comicObj = await getCharacterByName(name);
    onComicLoaded(comicObj);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <View char={char} goBack={goBack} />
  ) : null;
  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const View = ({ char, goBack }) => {
  const { name, thumbnail, description } = char;

  return (
    <>
      <AppBanner />
      <div className="single-comic">
        <ListImage
          src={thumbnail}
          image={comicsListDefaultImage}
          imageClassName="single-comic__img"
          alt={name}
        />
        <div className="single-comic__info">
          <h2 className="single-comic__name">{name}</h2>
          <p className="single-comic__descr">{description}</p>
        </div>
        <button onClick={goBack} className="single-comic__back">
          Go back
        </button>
      </div>
    </>
  );
};

export default SingleChar;
