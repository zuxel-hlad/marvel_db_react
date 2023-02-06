import ComicsList from '../../components/comicsList/ComicsList';
import AppBanner from '../../components/appBanner/AppBanner';
import { Helmet } from 'react-helmet';
import { useGetComicsQuery } from '../../api/api-slice';
import { useState, useCallback, useMemo } from 'react';

const Comics = () => {
    const [comicsOffset, setComicsOffset] = useState(0);
    const {
        data = [],
        isLoading,
        isFetching,
        isError,
    } = useGetComicsQuery(comicsOffset);
    
    const loadMoreComics = useCallback(() => {
        setComicsOffset((offset) => offset + 8);
    }, [data]);

    const comicsLimit = useMemo(() => {
        if (data.length) {
            return (
                data[data.length - 1].offset === data[data.length - 1].total - 1
            );
        } else {
            return;
        }
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
                comicsLimit={comicsLimit}
            />
        </>
    );
};

export default Comics;
