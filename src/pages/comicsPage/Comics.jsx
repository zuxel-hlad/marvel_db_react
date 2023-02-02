import ComicsList from '../../components/comicsList/ComicsList';
import AppBanner from '../../components/appBanner/AppBanner';
import { Helmet } from 'react-helmet';
import { useGetComicsQuery } from '../../api/api-slice';

const Comics = () => {
    const {
        data: comics = [],
        isLoading,
        isFetching,
        isError,
    } = useGetComicsQuery();

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with list of our comics"
                />
                <title>Comics page</title>
            </Helmet>
            <AppBanner />
            <ComicsList
                comicsList={comics}
                isLoading={isLoading}
                isFetching={isFetching}
                isError={isError}
            />
        </>
    );
};

export default Comics;
