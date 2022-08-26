import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../../services/MarvelService';
import Spinner from '../../components/spinner/Spinner';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import { useHistory } from 'react-router-dom';
import comicsListDefaultImage from '../../resources/img/comics-list-default.jpg';
import ListImage from '../../components/listImage/ListImage';
import './singleComic.scss';

const SingleComic = () => {
  const [comic, setComic] = useState({});
  const { loading, error, getComic, clearError } = useApi();
  const { comicId } = useParams();
  const { goBack } = useHistory();

  useEffect(() => updateComic(comicId), [comicId]);

  const onComicLoaded = (comicItem) => {
    setComic({ ...comicItem });
  };

  const updateComic = async (id) => {
    clearError();
    const comicObj = await getComic(id);
    onComicLoaded(comicObj);
  };

  useEffect(() => updateComic(comicId), [comicId]);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <View comic={comic} goBack={goBack} />
  ) : null;
  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const View = ({ comic, goBack }) => {
  const { title, thumbnail, price, pageCount, description, language } = comic;

  return (
    <div className="single-comic">
      <ListImage
        src={thumbnail}
        image={comicsListDefaultImage}
        imageClassName="single-comic__img"
        alt={title}
      />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount} pages</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <button onClick={goBack} className="single-comic__back">
        Go back
      </button>
    </div>
  );
};

export default SingleComic;
