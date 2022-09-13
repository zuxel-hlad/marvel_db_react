import AppBanner from "../../components/appBanner/AppBanner";
import useApi from "../../services/MarvelService";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";
import Spinner from "../../components/spinner/Spinner";
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

const SinglePage = ({Component, dataType}) => {
  const [data, setData] = useState(null);
  const {error, clearError, loading, getComic, getCharacter} = useApi();


  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error || !data) ? <Component data={data}/> : null;
  const {id} = useParams();

  const onDataLoaded = (loadedData) => setData(loadedData);

  useEffect(() => {
    updateData();
  }, [id])

  const updateData = async () => {
    clearError();
    let result = '';
    switch (dataType) {
      case 'comic':
        result = await getComic(id);
        onDataLoaded(result);
        break
      case 'character':
        result = await getCharacter(id);
        onDataLoaded(result);
        break
      default:
        throw new Error('Something went wrong...');
    }
  }

  return <>
    <AppBanner/>
    {spinner}
    {content}
    {errorMessage}
  </>
}

export default SinglePage;