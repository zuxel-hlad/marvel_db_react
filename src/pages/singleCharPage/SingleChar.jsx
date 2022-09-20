import {useHistory} from 'react-router-dom';
import {Helmet} from "react-helmet";
import comicsListDefaultImage from '../../resources/img/comics-list-default.jpg';
import ListImage from '../../components/listImage/ListImage';
import './singleChar.scss';

const SingleChar = ({data}) => {
  const {name, thumbnail, description} = data;
  const {goBack} = useHistory();

  return (
    <div className="single-comic">
      <Helmet>
        <meta name="description" content={`${description}`} />
        <title>{name}</title>
      </Helmet>
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
  );
};

export default SingleChar;
