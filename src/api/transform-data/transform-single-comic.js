// eslint-disable-next-line
export default (comic, meta, arg) => {
    return {
        title: comic.data.results[0].title,
        thumbnail: `${comic.data.results[0].thumbnail.path}.${comic.data.results[0].thumbnail.extension}`,
        price: comic.data.results[0].prices[0].price
            ? `${comic.data.results[0].prices[0].price}$`
            : 'not available',
        url: comic.data.results[0].urls[0].url,
        id: comic.data.results[0].id,
        pageCount: comic.data.results[0].pageCount,
        description:
            comic.data.results[0].description || 'There is no description',
        language: comic.data.results[0].textObjects[0]?.language || 'en-us',
        total: comic.data.total,
        offset: comic.data.limit,
    };
};
