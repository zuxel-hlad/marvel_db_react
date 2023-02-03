import ComicsList from '../../components/comicsList/ComicsList';
import AppBanner from '../../components/appBanner/AppBanner';
import { Helmet } from 'react-helmet';
import { useGetComicsQuery } from '../../api/api-slice';
import { useState, useCallback } from 'react';

const Comics = () => {
    const [comicsOffset, setComicsOffset] = useState(54060);
    const {
        data = [],
        isLoading,
        isFetching,
        isError,
    } = useGetComicsQuery(comicsOffset);
    const loadMoreComics = useCallback(() => {
        setComicsOffset((offset) => offset + 8);
        console.log(data);
    }, [data]);

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
                comicsList={data}
                isLoading={isLoading}
                isFetching={isFetching}
                isError={isError}
                loadMore={loadMoreComics}
            />
        </>
    );
};

export default Comics;
