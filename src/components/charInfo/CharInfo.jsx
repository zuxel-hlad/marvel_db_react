import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './charInfo.scss';
import useApi from '../../services/MarvelService';
import setContent from "../../utils/setContent";

const CharInfo = (props) => {
  const {charId} = props;
  const [char, setChar] = useState(null);
  const {getCharacter, clearError, process, setProcess} = useApi();

  useEffect(() => {
    updateChar()
    // eslint-disable-next-line
  }, [charId]);

  const onCharLoaded = (char) => {
    setChar({...char});
  };

  const updateChar = async () => {
    const {charId} = props;
    if (!charId) return;
    clearError();
    const char = await getCharacter(charId);
    onCharLoaded(char);
    setProcess('confirmed');
  };

  return (
    <div className="char__info">
      {setContent(process, View, char)}
    </div>
  );
};

const View = ({data}) => {
  const {name, description, thumbnail, homepage, wiki, comics} = data;
  const imgNotFound =
    thumbnail.indexOf('image_not_available') > 1
      ? 'char__basics_not-img'
      : null;

  const comicsList = !comics.length ? (
    <li className="char__comics-item">Comics is not received.</li>
  ) : (
    comics.map((com, idx) => {
      const {name, id} = com;
      return (
        <li key={idx} className="char__comics-item">
          <Link to={`/comics/${id}`}>{name}</Link>
        </li>
      );
    })
  );
  return (
    <>
      <div className={`char__basics ${imgNotFound}`}>
        <img src={thumbnail} alt={name}/>
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">{comicsList}</ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};

export default CharInfo;
