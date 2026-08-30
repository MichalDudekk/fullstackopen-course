import { useState, useEffect } from 'react';
import usersService from '../services/users';
import { Link } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from '@mui/material';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        usersService.getAll().then((fetchedUsers) => {
            setUsers(fetchedUsers);
        });
    }, []);

    if (users.length === 0) return null;

    return (
        <>
            <br />
            <Typography
                variant="h5"
                component="h2"
                fontWeight={700}
                gutterBottom
            >
                Users
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <b>Name</b>
                            </TableCell>
                            <TableCell>
                                <b>Username</b>
                            </TableCell>
                            <TableCell>
                                <b>Blogs created</b>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Link to={`/users/${user.id}`}>
                                        {user.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.blogs.length}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default UserList;
