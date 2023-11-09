import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';
import { selectContacts } from 'redux/selectors';

function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => selectContacts(state));

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === '' || number.trim() === '') {
      alert('Name and number cannot be empty');
      return;
    }

    const isContactExists = contacts.some(
      (contact) => contact.name === name && contact.number === number
    );

    if (isContactExists) {
      alert(`${name} with number ${number} is already in contacts.`);
      return;
    }

    dispatch(addContact({ name, number }))
      .unwrap()
      .then(() => {
        alert('Contact added successfully!');
        setName('');
        setNumber('');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-input"
        />
        <label htmlFor="number" className="form-label">
          Number
        </label>
        <input
          type="tel"
          id="number"
          name="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="form-input"
        />
        <button type="submit" className="form-button">
          Add contact
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
