import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import transformComics from './transform-data/transform-comics';
import transformCharacters from './transform-data/transform-characters';
const apiKey = 'apikey=bd5992b076496b02a8ccc421dffe40bb';

export const marvelApi = createApi({
    reducerPath: 'marvelApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://gateway.marvel.com:443/v1/public/',
    }),
    endpoints: (builder) => ({
        getComics: builder.query({
            query: (offset = 0) => `comics?limit=8&offset=${offset}&${apiKey}`,
            transformResponse: (comics, meta, arg) =>
                comics.data.results.map(transformComics),
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            // Always merge incoming data to the cache entry
            merge: (currentCache, newItems) => {
                currentCache.push(...newItems);
            },
            // Refetch when the page arg changes
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
        }),
        getRandomChar: builder.query({
            query: () => {
                const id = Math.floor(
                    Math.random() * (1011400 - 1011000) + 1011000
                );
                return `characters/${id}?&${apiKey}`;
            },
            transformResponse: (char) =>
                transformCharacters(char.data.results[0]),
        }),
        getSinglePageData: builder.query({
            query: ({ id, dataType }) => {
                if (dataType === 'comic' && id) {
                    console.log(id, dataType);
                    return `comics/${id}?&${apiKey}`;
                } else if (dataType === 'character' && id) {
                    console.log(id, dataType);
                    return `characters/${id}?&${apiKey}`;
                } else {
                    return false;
                }
            },
            transformResponse: (item) => {
                if (item.data.results[0].resourceURI.includes('characters')) {
                    return transformCharacters(item.data.results[0]);
                } else if (item.data.results[0].resourceURI.includes('comic')) {
                    return transformComics(item.data.results[0]);
                }
            },
        }),
    }),
});

export const {
    useGetComicsQuery,
    useGetSinglePageDataQuery,
    useGetRandomCharQuery,
} = marvelApi;
