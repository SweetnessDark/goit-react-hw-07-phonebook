import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  addContact,
  deleteContact,
  fetchContacts,
} from 'redux/contactsOperations';

const status = {
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
};

const customArr = [addContact, deleteContact, fetchContacts];
const arrContacts = status => customArr.map(el => el[status]);

const handlePending = state => {
  state.status = status.pending;
};

const handleFulfilled = state => {
  state.status = status.fulfilled;
  state.error = null;
};

const handleFulfilledGet = (state, { payload }) => {
  state.items = payload;
};

const handleFulfilledCreate = (state, { payload }) => {
  state.items.push(payload);
};

const handleFulfilledDelete = (state, { payload }) => {
  state.items = state.items.filter(contacts => contacts.id !== payload.id);
};

const handleRejected = (state, { payload }) => {
  state.status = status.rejected;
  state.error = payload;
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, handleFulfilledGet)
      .addCase(addContact.fulfilled, handleFulfilledCreate)
      .addCase(deleteContact.fulfilled, handleFulfilledDelete)

      .addMatcher(isAnyOf(...arrContacts(status.pending)), handlePending)
      .addMatcher(isAnyOf(...arrContacts(status.fulfilled)), handleFulfilled)
      .addMatcher(isAnyOf(...arrContacts(status.rejected)), handleRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;
