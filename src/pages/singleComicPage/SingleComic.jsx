import {useHistory} from 'react-router-dom';
import {Helmet} from "react-helmet";
import comicsListDefaultImage from '../../resources/img/comics-list-default.jpg';
import ListImage from '../../components/listImage/ListImage';
import './singleComic.scss';

const SingleComic = ({data}) => {
  const {title, thumbnail, price, pageCount, description, language} = data;
  const {goBack} = useHistory();


  return (
    <div className="single-comic">
      <Helmet>
        <meta name="description" content={`${title} comics book`} />
        <title>{title}</title>
      </Helmet>
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
