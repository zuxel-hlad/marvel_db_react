import ComicsList from '../../components/comicsList/ComicsList';
import AppBanner from '../../components/appBanner/AppBanner';
import {Helmet} from "react-helmet";

const Comics = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Page with list of our comics" />
        <title>Comics page</title>
      </Helmet>
      <AppBanner/>
      <ComicsList />
    </>
  );
};

export default Comics;
