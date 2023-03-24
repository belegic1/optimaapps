import React from 'react'
import {Box, Autocomplete, TextField, Button} from "@mui/material"
const Items = ( { price, users}) => {
  return (
    <Box mt={6} gap={'32px'} display={'flex'}>
      <TextField
        label='Add users'
        placeholder="Add amount"
        type="number"
        value={price}
        disabled
        // onChange={(e) => setPrice(e.target.value)}
      />
      <Autocomplete
        
        disabled
        fullWidth
        renderInput={(params) => (
          <TextField  {...params} fullWidth label="Add users"></TextField>
        )}
        options={users}
        value={users}
        multiple
  
      />
    </Box>
  );
}

export default Items