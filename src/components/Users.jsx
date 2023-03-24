import React from 'react'
import {
  Autocomplete,
  Box,
  Button,
  Container,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
const Users = ({users, fetchPib}) => {
  return (
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
              {user.iban ? (
                <p>{user.iban}</p>
              ) : (
                <Button onClick={() => fetchPib(user.label)}>add iban</Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default Users