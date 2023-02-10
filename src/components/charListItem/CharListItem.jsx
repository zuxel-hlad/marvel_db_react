import ListImage from '../listImage/ListImage';
import charListDefaultImg from '../../resources/img/char-list-default.png';
import './charListItem.scss';

const CharListItem = ({ thumbnail, name, index, onClick, id }) => {
    return (
        <li
            className="char__item"
            id={`${id}`}
            onClick={onClick}
            tabIndex={index + 1}
        >
            <ListImage
                src={thumbnail}
                image={charListDefaultImg}
                imageClassName="char__img"
                alt={name}
            />
            <div className="char__name">{name}</div>
        </li>
    );
};

export default CharListItem;
