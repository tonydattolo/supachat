import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const messagesApi = createApi({
    reducerPath: "messages",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/messages",
        prepareHeaders: (headers) => {
            headers.set("Accept", "application/json");
            headers.set("Content-Type", "application/json");
            return headers;
        },
        // prepareBody: (body) => JSON.stringify(body),
        // prepareQuery: (query) => JSON.stringify(query),
        // prepareResponse: (response) => response.json(),
        // prepareResponseError: (error) => error.json(),
        // prepareResponseSuccess: (response) => response.json(),
        
    }),
    tagTypes: ["messages"],
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: (id) => `read/${id}`,
        })
    })
});

export const {
    useGetMessagesQuery,
} = messagesApi;