import { Link } from 'react-router-dom';
import { useEffect, memo } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';

const setContent = (id, isloading, isError, Component, data) => {
    if (!id) {
        return <Skeleton />;
    } else if (isloading) {
        return <Spinner />;
    } else if (isError) {
        return <ErrorMessage />;
    } else if (!isError && !isloading && id) {
        return <Component data={data} />;
    } else {
        throw new Error('Unexpected process state');
    }
};

const CharInfo = ({ charId, charInfo: { data, isloading, isError } }) => {
    useEffect(() => {
        console.log('render');
    });
    return (
        <div className="char__info">
            {setContent(charId, isloading, isError, View, data)}
        </div>
    );
};

const View = ({ data }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = data;
    const imgNotFound =
        thumbnail.indexOf('image_not_available') > 1
            ? 'char__basics_not-img'
            : null;

    const comicsList = !comics.length ? (
        <li className="char__comics-item">Comics is not received.</li>
    ) : (
        comics.map((com, idx) => {
            const { name, id } = com;
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
                <img src={thumbnail} alt={name} />
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

export default memo(CharInfo);
