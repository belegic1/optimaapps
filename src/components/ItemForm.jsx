import React from 'react'

const ItemForm = ({handlePerson, person, disabled}) => {
  return (
    <form onSubmit={handlePerson}>
      <TextField
        label="Add Person"
        type="text"
        placeholder="Add Person"
        value={person}
        onChange={(e) => setPerson(e.target.value)}
      />
      <Button variant="contained" type="submit">
        Add
      </Button>
    </form>
  );
}

export default ItemForm