// src/pages/Home/Home.js
import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { Box, Toolbar, Typography, TextField, Button, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState(null);

  async function sendPromptToBackend(prompt) {
    try {
      const response = await fetch('http://localhost:5027/api/items/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response from backend:', data);

      setResponse(data);
      return data;
    } catch (error) {
      console.error('Error sending prompt:', error);
    }
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}> {/* Lock to full screen height */}
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Toolbar />

        {/* Content area (scrollable if needed) */}
        <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4">Welcome to ChatDB</Typography>
            <Typography>
              This project is intended to use ChatGPT to directly operate on your MongoDB database.
            </Typography>

            <Box sx={{ mt: 4, p: 2, backgroundColor: '#9f9f9', borderRadius: 1, whiteSpace: 'pre-wrap' }}>
              <Typography variant="h6">ChatDB Response</Typography>
              {response ? (
                <>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {response.message}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, fontFamily: 'monospace' }}>
                    {(() => {
                      try {
                        const parsedData = JSON.parse(response.data);
                        // Pretty print JSON with 2-space indent
                        return JSON.stringify(parsedData, null, 2);
                      } catch {
                        // fallback to raw string if parse fails
                        return response.data;
                      }
                    })()}
                  </Typography>
                </>
              ) : (
                <Typography variant="body1" sx={{ mt: 1 }}>
                  No queries made yet. Please enter a query in the sidebar.
                </Typography>
              )}
            </Box>

          </Box>
        </Box>

        {/* Chat Interface at bottom of page */}
        <Box
          sx={{
            width: '60%',
            mx: 'auto',
            p: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              border: '1px solid #ccc',
              borderRadius: 2,
              p: 1,
              backgroundColor: '#fff',
            }}
          >
            <TextField
              fullWidth
              multiline
              minRows={2}
              maxRows={6}
              variant="standard"
              placeholder="Type your message..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              InputProps={{ disableUnderline: true }}
              sx={{ flex: 1, mr: 1 }}
            />
            <IconButton
              color="primary"
              onClick={() => sendPromptToBackend(prompt)}
              disabled={!prompt.trim()}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
