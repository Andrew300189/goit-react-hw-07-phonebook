import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, fetchContacts } from '../../redux/contactsSlice';

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items) || [];
  const filter = useSelector((state) => state.contacts.filter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = filter
    ? contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    : contacts;

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id))
      .then(() => {
        dispatch(fetchContacts()); 
      })
      .catch((error) => {
        alert('Failed to delete contact: ' + error.message);
      });
  };

  return (
    <div>
      <ul>
        {filteredContacts.map((contact) => (
          <li key={contact.id} className="contact-item">
            {contact.name}: {contact.number}
            <button
              className="delete-button"
              onClick={() => handleDeleteContact(contact.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;
