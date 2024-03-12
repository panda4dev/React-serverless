import { useState, useEffect } from 'react';

import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, styled, Button } from '@mui/material';

import axios from 'axios';

const Component = styled(Box)`
    width: 80%;
    margin: 50px auto;
    & > h4 {
        margin-bottom: 20px;
    }
    & > div > table > thead {
        background-color: #000;
    }
    & > div > table > thead > tr > th {
        color: #FFFFFF;
        font-size: 16px;
        font-weight: 600;
    }
    & > div > table > tbody > tr > td {
        font-size: 16px;
    }
`;


const defaultObj = [{
    name: "shyam",
    id: 111,
    email:"name@gmail.com",
    phone:1234567890,
    salary:20000,
    age:20
}]

const Users = () => {

    const [users, setUsers] = useState(defaultObj);

     const API_URL = 'https://xuc76dxre0.execute-api.us-east-1.amazonaws.com/dev';

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(API_URL);
            setUsers(JSON.parse(response.data.body).Items);
        }
        getData();
    }, [])

    const removeEntry = (id) => {
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
    }

    return (
        <Component>
            <Typography variant="h4">Users</Typography>
            <Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Salary</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Working days</TableCell>
                            <TableCell></TableCell>
                            <TableCell>Remove Entry</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            users.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.salary}</TableCell>
                                    <TableCell>{user.age}</TableCell>
                                    <TableCell><Button variant="contained" color="error" onClick={() => removeEntry(user.id)}>Remove</Button></TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </Box>
        </Component>
    )
}

export default Users;