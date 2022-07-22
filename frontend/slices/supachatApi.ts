import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const supachatApi = createApi({
    reducerPath: "supachat",
    baseQuery: fakeBaseQuery(),
    // tagTypes: ["supachat"],
    endpoints: (builder) => ({
        getMessages: builder.query({
            queryFn: async () => {
                const messages = await supabase
                    .from("messages")
                    .select("*")
                    .orderBy("created_at", "desc")
                    .limit(10)
                    .get();
                return {
                    data: messages,
                };
            }
        }),
        

        // postMessage: builder.mutation({
        //     mutationFn: async (message) => {
        //         const newMessage = await supabase
        //             .from("messages")
        //             .insert({
        //                 ...message,
        //                 created_at: new Date(),
        //             })
        //             .returning("*")
        //             .get();
        //         return {
        //             data: newMessage,
        //         };
        //     }
        // }),
    }),

});

export const {
} = supachatApi;