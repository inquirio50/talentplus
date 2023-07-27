import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel = ({ children, index, value }: TabPanelProps) => (
    <Grid
        item
        xs={12}
        role="tabpanel"
        hidden={value !== index}
        id={`tab-${index}`}
        aria-labelledby={`tabpanel-${index}`}>
        {value === index && (
            <Box>
                <Typography component="div">{children}</Typography>
            </Box>
        )}
    </Grid>
);

TabPanel.defaultProps = {
    children: <div />,
};

export default TabPanel;
