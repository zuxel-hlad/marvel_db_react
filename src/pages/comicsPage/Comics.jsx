import ComicsList from '../../components/comicsList/ComicsList';
import AppBanner from '../../components/appBanner/AppBanner';
import { Helmet } from 'react-helmet';
import { useGetComicsQuery } from '../../api/api-slice';
import { useState, useCallback } from 'react';

const Comics = () => {
    const [comicsLimit, setComicsLimit] = useState(8)
    const {
        data: comics = [],
        isLoading,
        isFetching,
        isError,
    } = useGetComicsQuery(comicsLimit);

    const loadMoreComics = useCallback(() => {
        setComicsLimit(limit => limit + 8)
    },[])

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
                loadMore={loadMoreComics}
            />
        </>
    );
};

export default Comics;
