import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';

export const DashboardTabs = ({ tabs, activeTab, onChange, subtle = false }) => (
  <Box
    sx={{
      borderBottom: 1,
      borderColor: 'divider',
      backgroundColor: subtle ? '#fafafa' : '#fff',
      borderRadius: 1,
      boxShadow: subtle ? 'none' : '0 1px 3px rgba(0,0,0,0.1)',
    }}
  >
    <Tabs
      value={Math.max(tabs.indexOf(activeTab), 0)}
      onChange={(_, newValue) => onChange(tabs[newValue])}
      variant='scrollable'
      scrollButtons='auto'
      textColor='primary'
      indicatorColor='primary'
    >
      {tabs.map((tab) => (
        <Tab key={tab} label={tab} />
      ))}
    </Tabs>
  </Box>
);
