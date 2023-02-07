import { Helmet } from 'react-helmet';
import { useState, useCallback, useEffect } from 'react';
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
    const [randomId, setRandomId] = useState(1011000);
    const {
        data: charData,
        isLoading,
        isFetching,
        isError,
    } = useGetRandomCharQuery(randomId);

    const {
        data: charactersData,
        isError: charactersIsError,
        isFetching: charactersIsFetching,
        isLoading: charactersIsLoading,
    } = useGetCharactersQuery(charactersLimit, { skip: false });

    if (charactersData) {
        console.log(charactersData);
    }

    const [selectedChar, setChar] = useState(null);

    const setSelectedChar = useCallback((id) => setChar(id), []);
    const updateRandomChar = useCallback(() => {
        setRandomId(Math.floor(Math.random() * (1011400 - 1011000) + 1011000));
    }, []);

    useEffect(() => {
        const interval = setInterval(updateRandomChar, 30000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            <Helmet>
                <meta name="description" content="Marvel information portal" />
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar
                    data={charData}
                    isLoading={isLoading}
                    isFetching={isFetching}
                    isError={isError}
                    updateRandomChar={updateRandomChar}
                />
                <button onClick={() => setCharactersLimit((prev) => prev + 1)}>
                    UPPPPP
                </button>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList setSelectedChar={setSelectedChar} />
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar} />
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
