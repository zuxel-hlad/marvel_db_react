import './comicsList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import ListImage from '../listImage/ListImage';
import { Link } from 'react-router-dom';
import comicsListDefaultImage from '../../resources/img/comics-list-default.jpg';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const setContent = (isError, isLoading, Component, data) => {
    if (isLoading) {
        return <Spinner />;
    } else if (!isLoading && !isError && !data.length) {
        return <div className="comics__item-name">Comics list is empty</div>;
    } else if (!isLoading && !isError) {
        return <Component />;
    } else if (isError) {
        return <ErrorMessage />;
    } else {
        throw new Error('Unexpected Error');
    }
};

const ComicsList = ({
    comicsList,
    isError,
    isLoading,
    isFetching,
    loadMore,
    comicsLimit,
}) => {
    const renederedComics = (list) => {
        const comics = list.map((item, idx) => {
            const { title, price, thumbnail, id } = item;

            return (
                <CSSTransition
                    key={idx}
                    classNames="comics__item"
                    timeout={300}
                >
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

    const hideBtn =
        isLoading || comicsList.length === 0 || comicsLimit
            ? 'button__hide'
            : '';

    return (
        <div className="comics__list">
            {setContent(
                isError,
                isLoading,
                () => renederedComics(comicsList),
                comicsList
            )}
            {
                <button
                    onClick={loadMore}
                    disabled={isFetching}
                    className={`button button__main button__long ${hideBtn}`}
                >
                    <div className="inner">load more</div>
                </button>
            }
        </div>
    );
};

export default ComicsList;
