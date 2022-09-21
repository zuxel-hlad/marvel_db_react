import AppBanner from '../../components/appBanner/AppBanner';
import useApi from '../../services/MarvelService';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import setContent from "../../utils/setContent";

const SinglePage = ({Component, dataType}) => {
  const [data, setData] = useState(null);
  const {clearError, getComic, getCharacter, process, setProcess} = useApi();

  const {id} = useParams();

  const onDataLoaded = (loadedData) => setData(loadedData);

  useEffect(() => {
    updateData();
  }, [id]);

  const updateData = async () => {
    clearError();
    let result = null;
    switch (dataType) {
      case 'comic':
        result = await getComic(id);
        onDataLoaded(result);
        setProcess('confirmed');
        break;
      case 'character':
        result = await getCharacter(id);
        onDataLoaded(result);
        setProcess('confirmed');
        break;
      default:
        throw new Error('Something went wrong...');
    }
  };

  return (
    <>
      <AppBanner/>
      {setContent(process, Component, data)}
    </>
  );
};

export default SinglePage;
