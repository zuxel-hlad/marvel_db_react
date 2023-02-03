// eslint-disable-next-line
export default (comic) => {
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
