import { memo } from 'react';
import CharListItem from '../charListItem/CharListItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import setContent from '../../utils/setContent';
import './charList.scss';

const CharList = ({
    data,
    isLoading,
    isFetching,
    isError,
    loadMoreCharacters,
    setSelectedChar,
    charactersLimit,
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
                        onClick={() => setSelectedChar(char.id, index)}
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

    const hideBtn = isLoading || charactersLimit ? 'button__hide' : '';

    return (
        <div className="char__list">
            {setContent( isError, isLoading, () => renderedItems(data), data )}
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
