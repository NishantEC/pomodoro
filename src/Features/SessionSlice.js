import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isRunning: false,


}

const SessionSlice = createSlice(
    {
        name: "session",
        initialState,
        reducers: {
            setSession   : (state, { payload }) => {},
            setIsRunning : (state, { payload }) => {},
            resetSession : (state, { payload }) => {},
            setFocusTime : (state, { payload }) => {},
            setBreakTime : (state, { payload }) => {},
        }
    }
)

export const { setSession, setIsRunning, resetSession, setFocusTime, setBreakTime } = SessionSlice.actions

export default SessionSlice.reducer