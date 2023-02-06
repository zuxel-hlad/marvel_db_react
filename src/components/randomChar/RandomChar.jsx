import mjolnir from '../../resources/img/mjolnir.png';
import ListImage from '../listImage/ListImage';
import randomCharImageDefault from '../../resources/img/char-list-default.png';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './randomChar.scss';

const setContent = (isError, isFetching, isLoading, Component, data) => {
    if (isLoading || isFetching) {
        return <Spinner />;
    } else if (!isFetching && !isLoading && !isError) {
        return <Component data={data} />;
    } else if (isError) {
        return <ErrorMessage />;
    } else {
        throw new Error('Unexpected Error');
    }
};

const RandomChar = ({ isError, isFetching, isLoading, data }) => {
    return (
        <div className="randomchar">
            {setContent(isError, isFetching, isLoading, View, data)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!
                    <br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">Or choose another one</p>
                <button className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img
                    src={mjolnir}
                    alt="mjolnir"
                    className="randomchar__decoration"
                />
            </div>
        </div>
    );
};

const View = ({ data }) => {
    console.log(data);
    const { name, description, thumbnail, homepage, wiki } = data;

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
