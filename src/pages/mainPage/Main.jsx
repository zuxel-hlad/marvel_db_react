import { Helmet } from 'react-helmet';
import { useState, useCallback, useMemo } from 'react';
import RandomChar from '../../components/randomChar/RandomChar';
import CharList from '../../components/charList/CharList';
import CharInfo from '../../components/charInfo/CharInfo';
import SearchCharForm from '../../components/searchCharForm/searchCharForm';
import ErrorBoundary from '../../components/errorBoundary/ErrorBoundary';
import decoration from '../../resources/img/vision.png';
import {
    useGetSingleCharInfoQuery,
    useGetCharactersQuery,
    useGetSingleCharInfoByNameQuery,
} from '../../api/api-slice';

const Main = () => {
    const [charactersLimit, setCharactersLimit] = useState(210);
    const [selectedCharId, setSelectedCharId] = useState(null);
    const [findedCharName, setFindedCharName] = useState(undefined);
    const [skipFindChar, setSkipFindChar] = useState(true);
    const randomCharInfo = useGetSingleCharInfoQuery(undefined, { pollingInterval: 30000 });

    const selectedCharInfo = useGetSingleCharInfoQuery(selectedCharId);
    const charList = useGetCharactersQuery(charactersLimit);
    const findedCharInfo = useGetSingleCharInfoByNameQuery(findedCharName, { skip: skipFindChar });

    const memoizedSelectedCharInfo = useMemo(() => {
        return {
            charId: selectedCharId,
            charInfo: selectedCharInfo,
        };
    }, [selectedCharId]);

    const findCharacterByName = useCallback(({ charName }) => {
        console.log(charName);
        setFindedCharName(charName);
        setSkipFindChar(false);
    }, []);

    const updateRandomChar = useCallback(() => {
        randomCharInfo.refetch();
    }, []);

    const loadMoreCharacters = useCallback(() => {
        setCharactersLimit((limit) => limit + 9);
    }, []);

    const setSelectedChar = useCallback((id, ind) => {
        setSelectedCharId(id);
        const listItems = document.querySelectorAll('.char__item');
        if (listItems[ind].classList.contains('char__item_selected')) {
            listItems[ind].classList.remove('char__item_selected');
        } else {
            listItems.forEach((item) => {
                item.classList.remove('char__item_selected');
            });
            listItems[ind].classList.add('char__item_selected');
            listItems[ind].focus();
        }
    }, []);

    const checkCharactersLimit = useMemo(() => {
        if (charList.data && charList.data.length) {
            return (
                charList.data[charList.data.length - 1].offset ===
                charList.data[charList.data.length - 1].total - 1
            );
        } else {
            return;
        }
    }, [charList.data]);

    return (
        <>
            <Helmet>
                <meta name="description" content="Marvel information portal" />
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar
                    {...randomCharInfo}
                    updateRandomChar={updateRandomChar}
                />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList
                        {...charList}
                        charactersLimit={checkCharactersLimit}
                        loadMoreCharacters={loadMoreCharacters}
                        setSelectedChar={setSelectedChar}
                    />
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                        <CharInfo {...memoizedSelectedCharInfo} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <SearchCharForm
                            onSearch={findCharacterByName}
                            {...findedCharInfo}
                        />
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    );
};

export default Main;
