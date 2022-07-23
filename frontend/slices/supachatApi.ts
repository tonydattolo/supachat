import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import supabase from "utils/supabase";
import Message from "@/types/Message";


export const supachatApi = createApi({
    reducerPath: "supachat",
    baseQuery: fakeBaseQuery(),
    // tagTypes: ["supachat"],
    endpoints: (builder) => ({
        getMessages: builder.query({
            queryFn: async () => {
                const messages = await supabase
                    .from<Message>("messages")
                    .select("*")
                    // .select("*, author:user_id(username)")
                    .order("created_at")
                    .limit(10)
                    
                return {
                    data: messages,
                    // check for default return value behaviors of queryFn vs query
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
    useGetMessagesQuery,
    useLazyGetMessagesQuery,
} = supachatApi;