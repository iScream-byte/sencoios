import {createSlice} from "@reduxjs/toolkit";

const currentUserDetails = createSlice({
    name:'currentUser',
    initialState: {
        contactId: 0,
        organizationId: 0,
        hierarchicalId : 0,
        createdById: 0,
        username: "",
        token: "",
        totalCartItems: 0,
        totalUnreadNotify: 0,
        isLoggedIn: false,
        brandId: undefined
    },
    reducers: {
        setContactId: (state, action) => {
            state.contactId = action.payload.contId
        },
        setOrganizationId: (state, action) => {
            state.organizationId = action.payload.orgId
        },
        setHierarchicalId: (state, action) => {
            state.hierarchicalId = action.payload.hierId
        },
        setCreatedById: (state, action) => {
            state.createdById = action.payload.createdById
        },
        setUsername: (state, action) => {
            state.createdById = action.payload.username
        },
        setLoginAs: (state, action) => {
            state.loginAs = action.payload.loginAs
        },
        setToken: (state, action) => {
            state.token = action.payload.token
        },
        setTotalCartItems: (state, action) => {
            state.totalCartItems = action.payload.totalCartItems
        },
        setTotalUnreadNotify: (state, action) => {
            state.totalUnreadNotify = action.payload.totalUnreadNotify
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        },
        setBrandId: (state, action) => {
            state.brandId = action.payload.brandId
        }
    }
})

export const addContactId = currentUserDetails.actions.setContactId;
export const addOrganizationId = currentUserDetails.actions.setOrganizationId;
export const addHierarchicalId = currentUserDetails.actions.setHierarchicalId;
export const addCreatedById = currentUserDetails.actions.setCreatedById;
export const addUsername = currentUserDetails.actions.setUsername;
export const addLoginAs = currentUserDetails.actions.setLoginAs;
export const addBrandId = currentUserDetails.actions.setBrandId;
export const updateToken = currentUserDetails.actions.setToken;
export const updateTotalCartItems = currentUserDetails.actions.setTotalCartItems;
export const updateTotalUnreadNotify = currentUserDetails.actions.setTotalUnreadNotify;
export const updateLoginStatus = currentUserDetails.actions.setIsLoggedIn;

export default currentUserDetails.reducer;