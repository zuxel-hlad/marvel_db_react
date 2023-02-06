import { Helmet } from 'react-helmet';
import { useState, useCallback, useEffect } from 'react';
import RandomChar from '../../components/randomChar/RandomChar';
import CharList from '../../components/charList/CharList';
import CharInfo from '../../components/charInfo/CharInfo';
import SearchCharForm from '../../components/searchCharForm/searchCharForm';
import ErrorBoundary from '../../components/errorBoundary/ErrorBoundary';
import decoration from '../../resources/img/vision.png';
import { useGetRandomCharQuery } from '../../api/api-slice';

const Main = () => {
    const [randomId, setRandomId] = useState(1011000);
    const {
        data: charData,
        isLoading,
        isFetching,
        isError,
    } = useGetRandomCharQuery(randomId);

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
