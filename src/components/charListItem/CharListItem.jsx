import { useState } from 'react';
import ListImage from '../listImage/ListImage';
import charListDefaultImg from '../../resources/img/char-list-default.png';
import './charListItem.scss';

const CharListItem = ({ thumbnail, name, index, setSelectedChar }) => {
    const [selected, setSelected] = useState(false);
    return (
        <li
            className={`char__item${selected ? ' char__item_selected' : ''}`}
            onClick={() => {
                setSelectedChar();
                setSelected((prevselected) => !prevselected);
            }}
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
