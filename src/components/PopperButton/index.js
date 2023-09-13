import React from 'react';

import { Popper, Fab, Box, Fade } from "@mui/material";
import { ArrowBackIos } from '@mui/icons-material';

const PopperButton = ({ children }) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopper = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;


    return (
        <>
            <Fab
                aria-describedby={id}
                onClick={handlePopper}
                size="medium"
                color="primary"
                variant="extended"
                sx={{ position: "fixed", bottom: "80px", right: "-15px", borderRadius: "8px", height: "64px" }}
            >
                <ArrowBackIos />
            </Fab>
            <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                placement="left"
            >
                <Fade in={open} id={id} timeout={500}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "8px", marginRight: "16px"}}>
                        {children}
                    </Box>
                </Fade>
            </Popper>
        </>
    )

}

export default PopperButton;