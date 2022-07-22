import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import Message from "@/types/Message";

export interface SupachatState {
    messages: Message[];
}

const initialState: SupachatState = {
    messages: [],
};

const slice = createSlice({
    name: "supachat",
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        }
    }
});

export const {
    addMessage,
} = slice.actions;

export const selectMessages = (state: RootState) => state.messages;

export default slice.reducer;