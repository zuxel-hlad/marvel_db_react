import {useState, useEffect} from 'react';
import useApi from '../../services/MarvelService';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import ListImage from "../listImage/ListImage";
import randomCharImageDefault from '../../resources/img/char-list-default.png';
import setContent from "../../utils/setContent";

const RandomChar = (props) => {
  const [char, setChar] = useState({});
  const {getCharacter, clearError, process, setProcess} = useApi();
  useEffect(() => updateChar(), []);

  useEffect(() => {
    const interval = setInterval(() => {
      updateChar();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const onCharLoaded = (char) => {
    setChar({...char});
  };

  const updateChar = async () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    const char = await getCharacter(id);
    onCharLoaded(char);
    setProcess('confirmed');
  };

  return (
    <div className="randomchar">
      {setContent(process, View, char)}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br/>
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main" onClick={updateChar}>
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
      </div>
    </div>
  );
};

const View = ({data}) => {
  const {name, description, thumbnail, homepage, wiki} = data;

  return (
    <div className="randomchar__block">
      <ListImage
        src={thumbnail}
        image={randomCharImageDefault}
        imageClassName="randomchar__img"
        alt={name}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
