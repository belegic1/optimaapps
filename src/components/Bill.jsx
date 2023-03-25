import React, { useState } from 'react'
import { Autocomplete, Box, Button, Container, FormControl, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import axios from 'axios'
import Users from './Users';
import Items from './Items';

const Bill = () => {
  const [loadingIban, setLoadingIban] = useState(false)
  const [users, setUsers] = useState([])
  const [id, setId] = useState(0)
  const [items, setItems] = useState([])
  const [price, setPrice] = useState(0)
  const [item, setItem] = useState({
    price: 0,
    splitMemebers: []
  })
  const [person, setPerson] = useState("")
  const handlePerson = e => {
    e.preventDefault()
    if (!person) return;
    setUsers(prev => [...prev, { id: id, price: 0, label: person, iban: 0 }])
    setId(prev=> prev + 1)
    setPerson("")
  }
  const fetchPib = (user) => {
    setLoadingIban(true)
    axios.post('https://63e3e2d765ae49317719e670.mockapi.io/api/v1/users', { name: user })
      .then(res => {
        console.log(res.data)
        const updatedUsers = []
        users.map(user => {
           
          if (user.label === res.data.name) {
            updatedUsers.push({ ...user, iban: res.data.iban });
           }
          else {
            updatedUsers.push(user)
           }
        })
        setUsers(updatedUsers)
        setLoadingIban(false)
      }).catch(err => console.log(err.message))
  }


  const addItem = () => {
    if (!price || item.splitMemebers.length === 0) return;
          if (!price || item.splitMemebers.length === 0) return;

          let hashMap = {};

          let usersCopy = [...users];
          let memebersCopy = [...item.splitMemebers];
          const amount = price / memebersCopy.length;

          for (let i = 0; i < memebersCopy.length; i++) {
            hashMap[memebersCopy[i].id] = memebersCopy[i];
          }

          for (let i = 0; i < usersCopy.length; i++) {
            let obj = hashMap[usersCopy[i].id];
            if (obj) {
              usersCopy[i].price += amount;
            }
          }
          setUsers(usersCopy);
          setItems((prev) => [...prev, item]);
          setPrice(0);
          setItem({
            price: 0,
            splitMemebers: [],
          });

  };
  return (
    <Container maxWidth="80px">
      <Box mb={6}>
        <h3>PayBil</h3>
        <form style={{
          display : "flex",
          gap: "24px",
          
        }} onSubmit={handlePerson}>
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
        {
          items.map((item, idx )=> (<Items key={idx} price={item.price} users={item.splitMemebers} />))
        }
        <Box mt={6} display={'flex'} gap={2}>
          <TextField
            placeholder="Add amount"
            type="number"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value)
              setItem(prev => ({...prev, price: Number(e.target.value)}))
            }}
          />
          <Autocomplete
            fullWidth
            renderInput={(params) => (
              <TextField {...params} fullWidth label=""></TextField>
            )}
            value={item.splitMemebers}
            options={users}
            multiple
            onChange={(e, value) =>
              setItem((prev) => ({ ...prev, splitMemebers: value }))
            }
          />
        </Box>
      </Box>
      <Box display={'flex'} mb={6}>
      
        <Button variant="contained" onClick={addItem}>
          Add item
        </Button>
      </Box>
      <Users fetchPib={fetchPib} users={users} loading={loadingIban} />
    </Container>
  );
}

export default Bill