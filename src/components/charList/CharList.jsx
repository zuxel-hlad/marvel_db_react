import { memo } from 'react';
import PropTypes from 'prop-types';
import CharListItem from '../charListItem/CharListItem';
import './charList.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const setContent = (isLoading, isError, Component, data) => {
    if (isLoading) {
        return <Spinner />;
    } else if (!isLoading && !isError && !data) {
        return <div className="comics__item-name">Comics list is empty</div>;
    } else if (!isLoading && !isError) {
        return <Component />;
    } else if (isError) {
        return <ErrorMessage />;
    } else {
        throw new Error('Unexpected Error');
    }
};

const CharList = ({
    data,
    isLoading,
    isFetching,
    isError,
    loadMoreCharacters,
}) => {
    const renderedItems = (arr) => {
        const charCards = arr.map((char, index) => {
            return (
                <CSSTransition
                    key={char.id}
                    classNames="char__item"
                    timeout={300}
                >
                    <CharListItem
                        {...char}
                        index={index}
                    />
                </CSSTransition>
            );
        });

        return (
            <TransitionGroup component={'ul'} className="char__grid">
                {charCards}
            </TransitionGroup>
        );
    };

    const hideBtn = isLoading ? 'button__hide' : '';

    return (
        <div className="char__list">
            {setContent(isLoading, isError, () => renderedItems(data), data)}
            <button
                className={`button button__main button__long ${hideBtn}`}
                disabled={isFetching}
                onClick={loadMoreCharacters}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default memo(CharList);
