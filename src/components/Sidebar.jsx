import React, { useState } from 'react';
import {
  Drawer,
  Typography,
  Divider,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  ListItemText,
  IconButton,
  useMediaQuery
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

const drawerWidth = 300;

const Sidebar = () => {
  const [apiKey, setApiKey] = useState('');
  const [databaseName, setDatabaseName] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleConnectToMongoDB = async () => {
        try {
            const response = await fetch('http://localhost:5027/api/items/connectToMongoDB', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mongoApiKey: apiKey,         // Assuming apiKey is in component state
                database: databaseName // Replace with your DB name
            }),
            });

            const data = await response.json();

            if (!response.ok) {
            console.error('Server error:', data);
            alert(`Error: ${data}`);
            } else {
            console.log('MongoDB connected:', data);
            alert(`Connected! Collections: ${data.collections.join(', ')}`);
            }
        } catch (err) {
            console.error('Request failed:', err);
            alert('Request failed. See console.');
        }
    };

  const drawerContent = (
    <>
      <div style={{ padding: '3em 2em 2em', textAlign: 'center' }}>
        <Typography variant="h4" component="div">
          <span style={{ fontWeight: 'bold' }}>Chat</span>
          <span style={{ fontWeight: 300 }}>DB</span>
        </Typography>
      </div>

      <Divider sx={{ my: 2, mx: 2 }} />

      <Box sx={{ mx: 1 }}>
        <Accordion
          sx={{
            mt: 2,
            borderRadius: 2,
            width: '100%',
            boxSizing: 'border-box',
            overflow: 'hidden',
            border: '1px solid #ddd',
            backgroundColor: '#fafafa',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <ListItemText primary="MongoDB Connection" />
          </AccordionSummary>
          <AccordionDetails>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Enter MongoDB Database Name"
                variant="outlined"
                size="small"
                multiline
                maxRows={10}
                fullWidth
                value={databaseName}
                onChange={(e) => setDatabaseName(e.target.value)}
              />
              <TextField
                label="Enter MongoDB API Key"
                variant="outlined"
                size="small"
                multiline
                maxRows={10}
                fullWidth
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ mt: 1 }}
              fullWidth
              onClick={handleConnectToMongoDB}
            >
              Save
            </Button>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => setMobileOpen(true)}
          sx={{ position: 'absolute', top: 16, left: 16, zIndex: 1300 }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Sidebar Drawer */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#f4f4f4',
            boxShadow: '4px 0 16px rgba(0, 0, 0, 0.2)',
          },
        }}
        variant={isMobile ? 'temporary' : 'permanent'}
        anchor="left"
        open={isMobile ? mobileOpen : true}
        onClose={() => setMobileOpen(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
