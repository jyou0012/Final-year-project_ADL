"use client";
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student'); 

    const handleLogin = (event) => {
        event.preventDefault();
        console.log("Logging in as:", role, "with username:", username, "and password:", password);
        // 连接下后端登录逻辑
    };

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                boxShadow: 3,
                borderRadius: 1
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleLogin}
        >
            <FormControl component="fieldset">
                <FormLabel component="legend">Role</FormLabel>
                <RadioGroup
                    row
                    aria-label="role"
                    name="role1"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <FormControlLabel value="student" control={<Radio />} label="Student" />
                    <FormControlLabel value="staff" control={<Radio />} label="Staff" />
                </RadioGroup>
            </FormControl>
            <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">
                Login
            </Button>
        </Box>
    );
}
