import { useState } from 'react';
import RandomChar from '../../components/randomChar/RandomChar';
import CharList from '../../components/charList/CharList';
import CharInfo from '../../components/charInfo/CharInfo';
import SearchCharForm from '../../components/searchCharForm/searchCharForm';
import ErrorBoundary from '../../components/errorBoundary/ErrorBoundary';
import decoration from '../../resources/img/vision.png';

const Main = () => {
  const [selectedChar, setChar] = useState(null);

  const setSelectedChar = (id) => setChar(id);

  return (
    <>
      <ErrorBoundary>
        <RandomChar />
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
