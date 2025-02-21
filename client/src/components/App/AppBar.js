import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';

function ButtonAppBar() {
    const navigate = useNavigate();
    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ bgcolor: "white" }}>
                <Toolbar style={{ color: 'black' }}>
                <Typography variant="h5" sx={{ flexGrow: 1 }}>
                    Movie Magic
                </Typography>
                
                <div>
                    <Button
                    color="inherit"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate('/')}
                    >
                        <Typography variant="h6" color="inherit" noWrap> Landing </Typography>
                    </Button>

                    <Button
                    color="inherit"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate('/MyPage')}
                    >
                        <Typography variant="h6" color="inherit" noWrap> MyPage </Typography>
                    </Button>

                    <Button
                    color="inherit"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate('/ReviewPage')}
                    >
                        <Typography variant="h6" color="inherit" noWrap> Review </Typography>
                    </Button>

                    <Button
                    color="inherit"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate('/SearchPage')}
                    >
                        <Typography variant="h6" color="inherit" noWrap> Search </Typography>
                    </Button>
                </div>
                </Toolbar>
            </AppBar>
        </Box>
        </>
    );
}

export default ButtonAppBar;
