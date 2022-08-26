import React, { lazy, Suspense } from 'react';
import Spinner from '../spinner/Spinner';
import AppHeader from '../appHeader/AppHeader';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Main = lazy(() => import('../pages/mainPage/Main'));
const Comics = lazy(() => import('../pages/comicsPage/Comics'));
const SingleComic = lazy(() => import('../pages/singleComicPage/SingleComic'));
const Page404 = lazy(() => import('../pages/Page404/404'));

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/comics" component={Comics} />
              <Route exact path="/comics/:comicId" component={SingleComic} />
              <Route path="*" component={Page404} />
            </Switch>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
