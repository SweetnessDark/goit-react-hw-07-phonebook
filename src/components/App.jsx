import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  selectorContacts,
  selectorError,
  selectorIsLoading,
} from './../redux/selectors';
import { fetchContacts } from './../redux/contactsOperations';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectorContacts);
  const error = useSelector(selectorError);
  const isLoading = useSelector(selectorIsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="container">
      <h1 className="h1">Phonebook</h1>
      <ContactForm />

      <h2 className="h2">Contacts</h2>
      {isLoading && !error && <h2>Request in progress...</h2>}
      {contacts.length > 0 ? (
        <>
          <Filter />
          <ContactList />
        </>
      ) : (
        <p>Your contacts is don`t list</p>
      )}
    </div>
  );
};
