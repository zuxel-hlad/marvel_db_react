// eslint-disable-next-line
export default (char) => {
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
