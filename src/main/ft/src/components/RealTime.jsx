import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Menu, MenuItem } from '@mui/material';
import notie from 'notie';

const queryClient = new QueryClient();

export default function RealTime() {
  return (
    <QueryClientProvider client={queryClient}>
      <RealTimeContent />
    </QueryClientProvider>
  );
}

function RealTimeContent() {
  const { data: listData, error } = useQuery('realTimeList', async () => {
    const response = await axios.get('/ft/realTime/list');
    return response.data;
  }, {
    refetchInterval: 5000,
  });

  const [rank, setRank] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setRank(prevRank => (prevRank === listData.length - 1 ? 0 : prevRank + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [listData]);

  const handleListOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleListClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (query) => {
    navigate(`/itemlist/${query}`);
    handleListClose();
  };

  const handleRolling = () => {
    notie.alert({ text: listData[rank]?.query, time: 3 });
  };

  if (error) return <div>Error fetching data</div>;
  if (!listData) return <div>Loading...</div>;

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <div style={{ fontSize: '15px', overflow: 'hidden' }}>
        <span style={{ color: 'orange', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', marginLeft: 20 }}>
          {(rank + 1).toString().padStart(2, '0')}
        </span>
        <span
          style={{ fontFamily: 'Arial, sans-serif', marginLeft: 15, cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          onClick={() => {
            handleListOpen();
            handleRolling();
          }}
        >
          {listData[rank]?.query}
        </span>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleListClose}
          PaperProps={{
            style: {
              width: '300px',
              transform: 'translate(-100px, 10px)',
            },
          }}
          disableScrollLock
        >
          <Box sx={{ px: 2, pb: 2, mt: 2 }}>
            <Typography variant="subtitle2" color="textSecondary" align="center" gutterBottom>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </Typography>
            <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
              실시간 쇼핑 검색어
            </Typography>
          </Box>
          {listData.map((item, index) => (
            <MenuItem key={index} onClick={() => handleMenuItemClick(item.query)}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ color: 'orange', marginRight: 1 }}>
                  {(index + 1).toString().padStart(2, '0')}
                </Typography>
                <Typography variant="body1" sx={{ color: 'black' }}>
                  {item.query}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </Box>
  );
}
