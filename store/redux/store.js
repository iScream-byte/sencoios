import { configureStore } from "@reduxjs/toolkit"
import currentUserReducer from "./currentUser"

export const store = configureStore({
    reducer: {
        currentUserDetails: currentUserReducer
    }
})
