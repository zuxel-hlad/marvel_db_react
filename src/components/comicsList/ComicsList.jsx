import './comicsList.scss';
import {useState, useEffect} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useApi from '../../services/MarvelService';
import ListImage from '../listImage/ListImage';
import {Link} from 'react-router-dom';
import comicsListDefaultImage from '../../resources/img/comics-list-default.jpg';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const setContent = (process, Component, newItemLoading) => {
  switch (process) {
    case 'waiting':
      return <Spinner/>;
      break;
    case 'loading':
      return newItemLoading ? <Component/> : <Spinner/>;
      break;
    case 'confirmed':
      return <Component/>;
      break;
    case 'error':
      return <ErrorMessage/>
      break;
    default:
      throw new Error('Unexpected process state');
  }
}

const ComicsList = () => {
  const [comicsOffset, setComicsOffset] = useState(0);
  const [comicsList, setComicsList] = useState([]);
  const [comicsEnded, setComicsEnded] = useState(false);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const {loading, error, getComics, process, setProcess} = useApi();

  useEffect(() => updateComicsList(comicsOffset, true), []);

  const onComicsListLoaded = (comics) => {
    let comicsEndedFromApi = false;
    if (comics.length < 8) {
      comicsEndedFromApi = true;
    }
    setComicsList(() => [...comicsList, ...comics]);
    setComicsOffset((comicsOffset) => comicsOffset + 8);
    setNewItemLoading(false);
    setComicsEnded(comicsEndedFromApi);
  };
  const updateComicsList = async (offset, initialValue) => {
    initialValue ? setNewItemLoading(false) : setNewItemLoading(true);
    const response = await getComics(offset);
    onComicsListLoaded(response);
    setProcess('confirmed');
  };

  const renederedComics = (list) => {
    const comics = list.map((item, idx) => {
      const {title, price, thumbnail, id} = item;

      return (
        <CSSTransition key={idx} classNames="comics__item" timeout={300}>
          <li className="comics__item">
            <Link to={`comics/${id}`}>
              <ListImage
                src={thumbnail}
                image={comicsListDefaultImage}
                imageClassName="comics__item-img"
                alt={title}
              />
              <div className="comics__item-name">{title}</div>
              <div className="comics__item-price">{price}</div>
            </Link>
          </li>
        </CSSTransition>
      );
    });
    return (
      <TransitionGroup className="comics__grid" component={'ul'}>
        {comics}
      </TransitionGroup>
    );
  };

  const hideBtn = comicsEnded ? 'button__hide' : '';

  return (
    <div className="comics__list">
      {setContent(process, () => renederedComics(comicsList), newItemLoading)}
      <button
        onClick={() => updateComicsList(comicsOffset, false)}
        disabled={newItemLoading}
        className={`button button__main button__long ${hideBtn}`}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
