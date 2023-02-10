import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';

const setContent = (isError, isLoading, Component, data) => {
    if (isLoading) {
        return <Spinner />;
    } else if (!isLoading && !isError && !data.length) {
        return <div className="comics__item-name">Comics list is empty</div>;
    } else if (!isLoading && !isError) {
        return <Component data={data} />;
    } else if (isError) {
        return <ErrorMessage />;
    } else {
        throw new Error('Unexpected Error');
    }
};

export default setContent;
