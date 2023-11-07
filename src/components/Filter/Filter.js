import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from '../../redux/contactsSlice';

function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.contacts.filter);

  const handleFilterChange = (e) => {
    dispatch(updateFilter(e.target.value));
  };

  return (
    <input
      type="text"
      className="form-input"
      value={filter}
      onChange={handleFilterChange}
    />
  );
}

export default Filter;