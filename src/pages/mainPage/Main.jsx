import { Helmet } from 'react-helmet';
import { useState, useCallback, useMemo } from 'react';
import RandomChar from '../../components/randomChar/RandomChar';
import CharList from '../../components/charList/CharList';
import CharInfo from '../../components/charInfo/CharInfo';
import SearchCharForm from '../../components/searchCharForm/searchCharForm';
import ErrorBoundary from '../../components/errorBoundary/ErrorBoundary';
import decoration from '../../resources/img/vision.png';
import {
    useGetRandomCharQuery,
    useGetCharactersQuery,
} from '../../api/api-slice';

const Main = () => {
    const [charactersLimit, setCharactersLimit] = useState(210);
    const [selectedCharId, setSelectedCharId] = useState(null);
    const randomChar = useGetRandomCharQuery(undefined, {
        pollingInterval: 30000,
    });
    const charList = useGetCharactersQuery(charactersLimit);

    const updateRandomChar = useCallback(() => {
        randomChar.refetch();
    }, []);

    const loadMoreCharacters = useCallback(() => {
        setCharactersLimit((limit) => limit + 9);
    }, []);

    const setSelectedChar = useCallback((id) => {
        setSelectedCharId(id);
        console.log(charList.data[charList.data.length - 1]);
    }, []);

    const comicsLimit = useMemo(() => {
        if (charList.data && charList.data.length) {
            console.log(charList.data);

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
                    {...randomChar}
                    updateRandomChar={updateRandomChar}
                />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList
                        {...charList}
                        charactersLimit={comicsLimit}
                        loadMoreCharacters={loadMoreCharacters}
                        setSelectedChar={setSelectedChar}
                    />
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                        <CharInfo />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <SearchCharForm />
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    );
};

export default Main;
