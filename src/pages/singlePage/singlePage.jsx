import AppBanner from '../../components/appBanner/AppBanner';
import { useParams } from 'react-router-dom';
import { useGetSingleItemInfoQuery } from '../../api/api-slice';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import Spinner from '../../components/spinner/Spinner';

const setContent = (isError, isFetching, isLoading, Component, data) => {
    if (isLoading || isFetching) {
        return <Spinner />;
    } else if (!isFetching && !isLoading && !isError) {
        return <Component data={data} />;
    } else if (isError) {
        return <ErrorMessage />;
    } else {
        throw new Error('Unexpected Error');
    }
};

const SinglePage = ({ Component, dataType }) => {
    const { id } = useParams();
    const { data, isLoading, isError, isFetching } = useGetSingleItemInfoQuery({
        id,
        dataType,
        undefined,
    });

    return (
        <>
            <AppBanner />
            {setContent(isError, isFetching, isLoading, Component, data)}
        </>
    );
};

export default SinglePage;
