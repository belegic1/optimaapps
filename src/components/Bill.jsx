import React, { useState } from 'react'
import { Autocomplete, Box, Button, Container, FormControl, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import axios from 'axios'

const Bill = () => {
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
        console.log(updatedUsers)
      }).catch(err => console.log(err.message))
  }


  const updateObjects = () => {
      const amount = price / item.splitMemebers.length
    const updatedObjects = []
    users.map(user => {
      const member = item.splitMemebers.find(u => u.id === user.id)
      if (member) {
        updatedObjects.push({
          ...user,
          price: user.price + amount,
        });
      } else {
        updatedObjects.push(user)
      }
    })

      setUsers(updatedObjects);
    setPrice(0)
    };
  return (
    <Container>
      <Box mb={6}>
        <h3>PayBil</h3>
        <form onSubmit={handlePerson}>
          <TextField
            type="text"
            placeholder="Add Person"
            value={person}
            onChange={(e) => setPerson(e.target.value)}
          />
          <Button  variant='contained' type='submit'>Add</Button>
        </form>
      </Box>
      <Box display={'flex'} mb={6}>
        <form
          action=""
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            minWidth: '80vw',
          }}
        >
          <TextField
            placeholder="Add amount"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Autocomplete
            fullWidth
            renderInput={(params) => (
              <TextField {...params} fullWidth label=""></TextField>
            )}
            options={users}
            multiple
            onChange={(e, value) =>
              setItem((prev) => ({ ...prev, splitMemebers: value }))
            }
          />
        </form>
        <Button variant='contained' onClick={updateObjects}>Add item</Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <th>name</th>
            <th>price</th>
            <th>iban</th>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, idx) => (
            <TableRow key={idx}>
              <TableCell>{user.label}</TableCell>
              <TableCell>{user.price}$</TableCell>
              <TableCell>
                {
                  user.iban ? <p>{user.iban}</p>:
                <Button onClick={() => fetchPib(user.label)}>add iban</Button>
                
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default Bill