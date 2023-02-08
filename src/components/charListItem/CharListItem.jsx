import './charListItem.scss';
import ListImage from '../listImage/ListImage';
import charListDefaultImg from '../../resources/img/char-list-default.png';
import { useState } from 'react';

const CharListItem = ({ thumbnail, name, index }) => {
    const [selected, setSelected] = useState(false);
    const toggleSelected = (id) => {
        setSelected((prevselected) => !prevselected);
    };
    return (
        <li
            className={`char__item${selected ? ' char__item_selected' : ''}`}
            onClick={toggleSelected}
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
