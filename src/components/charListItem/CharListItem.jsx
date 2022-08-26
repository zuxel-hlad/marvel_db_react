import './charListItem.scss';
import ListImage from '../listImage/ListImage';
import charListDefaultImg from '../../resources/img/char-list-default.png';

const CharListItem = ({
  thumbnail,
  name,
  id,
  setSelected,
  index,
  selected,
}) => {
  const isSelected = selected ? 'char__item_selected' : '';
  return (
    <li
      className={`char__item ${isSelected}`}
      onClick={() => setSelected(id)}
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
