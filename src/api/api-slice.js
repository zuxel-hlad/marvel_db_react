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
        // get all comics
        getComics: builder.query({
            query: (offset = 0) => `comics?limit=8&offset=${offset}&${apiKey}`,
            transformResponse: transformComics,
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCache, newItems) => {
                currentCache.push(...newItems);
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
        }),

        // get all characters
        getCharacters: builder.query({
            query: (offset = 210) =>
                `characters?limit=9&offset=${offset}&${apiKey}`,
            transformResponse: transformCharacters,
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCache, newItems) => {
                currentCache.push(...newItems);
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
        }),

        //get random char by id
        getSingleCharInfo: builder.query({
            query: (id) => {
                const radomId = Math.floor(
                    Math.random() * (1011400 - 1011000) + 1011000
                );
                return `characters/${id ? id : radomId}?&${apiKey}`;
            },
            transformResponse: transformSingleChar,
        }),

        getSingleCharInfoByName: builder.query({
            query: (name) => `characters?name=${name}&${apiKey}`,
            transformResponse: transformSingleChar,
        }),

        //get info for single comic or character
        getSingleItemInfo: builder.query({
            query: ({ id, dataType }) => {
                if (dataType === 'comic' && id) {
                    return `comics/${id}?&${apiKey}`;
                } else if (dataType === 'character' && id) {
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
    useGetSingleItemInfoQuery,
    useGetSingleCharInfoQuery,
    useGetCharactersQuery,
    useGetSingleCharInfoByNameQuery,
} = marvelApi;
