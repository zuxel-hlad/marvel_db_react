import {useHttp} from '../hooks/http.hook';

const useApi = () => {
  const {request, clearError, process, setProcess} = useHttp();
  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=bd5992b076496b02a8ccc421dffe40bb';
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const characters = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );
    return characters.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const oneChar = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(oneChar.data.results[0]);
  };

  const getCharacterByName = async (name) => {
    const oneChar = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
    return oneChar.data.results.map(_transformCharacter);
  };

  const getComic = async (id) => {
    const oneComic = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(oneComic.data.results[0]);
  };

  const getComics = async (offset = 0) => {
    const comics = await request(
      `${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`
    );

    return comics.data.results.map(_transformComics);
  };

  const _transformComics = (comic) => {
    return {
      title: comic.title,
      thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
      price: comic.prices[0].price
        ? `${comic.prices[0].price}$`
        : 'not available',
      url: comic.urls[0].url,
      id: comic.id,
      pageCount: comic.pageCount,
      description: comic.description || 'There is no description',
      language: comic.textObjects[0]?.language || 'en-us',
    };
  };

  const _transformCharacter = (char) => {
    return {
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 210)}...`
        : 'Description is not received.',
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      id: char.id,
      comics:
        char.comics.items.length > 10
          ? char.comics.items
            .map((item) => ({
              ...item,
              id: item.resourceURI
                .split('/')
                .filter((item) => !isNaN(item) && item !== '')
                .join(),
            }))
            .slice(0, 10)
          : char.comics.items.map((item) => ({
            ...item,
            id: item.resourceURI
              .split('/')
              .filter((item) => !isNaN(item) && item !== '')
              .join(),
          })),
      selected: false,
    };
  };

  return {
    getAllCharacters,
    getCharacter,
    getCharacterByName,
    clearError,
    process,
    setProcess,
    getComics,
    getComic,
  };
};

export default useApi;
