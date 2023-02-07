import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import transformSingleComic from './transform-data/transform-single-comic';
import transformSingleChar from './transform-data/transform-single-char';
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
            transformResponse: transformComics,
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
        getCharacters: builder.query({
            query: (offset = 210) =>
                `characters?limit=9&offset=${offset}&${apiKey}`,
            transformResponse: transformCharacters,
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            // // Always merge incoming data to the cache entry
            merge: (currentCache, newItems) => {
                currentCache.push(...newItems);
            },
            // // Refetch when the page arg changes
            forceRefetch({ currentArg, previousArg }) {
                console.log(
                    'currentArg :',
                    currentArg,
                    'previousArg :',
                    previousArg
                );
                return currentArg !== previousArg;
            },
        }),
        getRandomChar: builder.query({
            query: (id) => {
                return `characters/${id}?&${apiKey}`;
            },
            transformResponse: transformSingleChar,
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
            transformResponse: (response) => {
                if (
                    response.data.results[0].resourceURI.includes('characters')
                ) {
                    return transformSingleChar(response);
                } else if (
                    response.data.results[0].resourceURI.includes('comic')
                ) {
                    return transformSingleComic(response);
                }
            },
        }),
    }),
});

export const {
    useGetComicsQuery,
    useGetCharactersQuery,
    useGetSinglePageDataQuery,
    useGetRandomCharQuery,
} = marvelApi;
