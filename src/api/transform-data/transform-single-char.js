// eslint-disable-next-line
export default (char, meta, arg) => {
    return {
        name: char.data.results[0].name,
        description: char.data.results[0].description
            ? `${char.data.results[0].description.slice(0, 210)}...`
            : 'Description is not received.',
        thumbnail: `${char.data.results[0].thumbnail.path}.${char.data.results[0].thumbnail.extension}`,
        homepage: char.data.results[0].urls[0].url,
        wiki: char.data.results[0].urls[1].url,
        id: char.data.results[0].id,
        comics:
        char.data.results[0].comics.items.length > 10
                ? char.data.results[0].comics.items
                      .map((item) => ({
                          ...item,
                          id: item.resourceURI
                              .split('/')
                              .filter((item) => !isNaN(item) && item !== '')
                              .join(),
                      }))
                      .slice(0, 10)
                : char.data.results[0].comics.items.map((item) => ({
                      ...item,
                      id: item.resourceURI
                          .split('/')
                          .filter((item) => !isNaN(item) && item !== '')
                          .join(),
                  })),
        total: char.data.total,
        offset: char.data.offset,
    };
};