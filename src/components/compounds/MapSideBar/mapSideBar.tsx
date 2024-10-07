'use client';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { CustomList } from '@/components/atomics/Icon';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { VideoItem } from '@/components/compounds/MapSideBar/videoItem';
import { useEffect } from 'react';
import { CustomAutoComplete } from '@/components/atomics/AutoComplete';
import styled from 'styled-components';
import { fetchAddress } from '@/reactQuery/Search/addressSearch';
import { FC } from 'react';
import Collapse from '@mui/material/Collapse';
import { useState } from 'react';
import {
  custom_map_side_bar_pixel_large,
  custom_map_side_bar_pixel_medium,
  custom_map_side_bar_pixel_small,
} from '@/constants/size';
import { MapFoodFiltering } from '../MapFoodFiltering';

const Main = styled.main<{ open?: boolean; $drawerWidth: number }>`
  width: ${props =>
    props.open ? `calc(100vw - ${props.$drawerWidth}px)` : '100vw'};
  flex-grow: 1;
  transition: ${({ theme }) =>
    theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })};
  margin-left: ${props => (props.open ? 0 : `-${props.$drawerWidth}px`)};

  ${({ open, theme }) =>
    open &&
    `
    transition: ${theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    })};
    margin-left: 0;
  `}
`;
const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(0, 1)};
  justify-content: flex-end;
  ${({ theme }) => theme.mixins.toolbar};
`;

const Container = styled.div`
  width: 100% !important;
  height: inherit !important;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: scroll;
  transition-duration: 0ms !important;
  box-shadow:
    5px 5px 10px 0px rgba(0, 0, 0, 0.2),
    5px 5px 10px 0px rgba(0, 0, 0, 0.1);
  position: relative;
  left: 0;
  z-index: 9999;
`;
const CustomAutoCompleteContainer = styled.div`
  width: 90%;

  @media (max-width: ${custom_map_side_bar_pixel_large}) {
    width: 85%;
  }
`;
const VideoItemsContainer = styled.div`
  width: 100%;
  gap: 10px;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  z-index: 9999999;
`;
export default function MapSideBar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(230);
  const temp_array = [
    {
      name: '엽기떡볶이1',
      tag: '한식',
      description: '너무 맜있어요.',
      numberOfHeart: 312,
    },
    {
      name: '엽기떡볶이1',
      tag: '분식',
      description: '너무 맜있어요.',
      numberOfHeart: 123,
    },
    {
      name: '엽기떡볶이1',
      tag: '분식',
      description: '너무 맜있어요.',
      numberOfHeart: 123,
    },
    {
      name: '엽기떡볶이1',
      tag: '분식',
      description: '너무 맜있어요.',
      numberOfHeart: 123,
    },
    {
      name: '엽기떡볶이1',
      tag: '분식',
      description: '너무 맜있어요.',
      numberOfHeart: 123,
    },
  ];
  const IterationItem = () => {
    const ItemArray = [];
    for (let i = 0; i < temp_array.length; i++) {
      ItemArray.push(
        <React.Fragment key={`ItemArray-${i}`}>
          <VideoItem
            tag={temp_array[i].tag}
            name={temp_array[i].name}
            description={temp_array[i].description}
            numberOfHeart={temp_array[i].numberOfHeart}
          />
          <Divider />
        </React.Fragment>
      );
    }
    return ItemArray;
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const updateDrawerWidth = () => {
    const width = window.innerWidth;
    console.log('width', width);
    if (width > 910) {
      setDrawerWidth(230);
    } else if (width > 625) {
      setDrawerWidth(200);
    } else if (width > 425) {
      setDrawerWidth(170);
    } else {
      setDrawerWidth(150);
    }
  };

  useEffect(() => {
    updateDrawerWidth();
    window.addEventListener('resize', updateDrawerWidth);

    return () => {
      window.removeEventListener('resize', updateDrawerWidth);
    };
  }, []);

  console.log('drawerWidth', drawerWidth);
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              position: 'relative !important',
              overflow: 'scroll !important',
              height: '100vh !important',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader theme={theme}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <Container className="Container">
              <CustomAutoCompleteContainer className="custom-complete">
                <CustomAutoComplete
                  height={40}
                  customfont={12}
                  mobilefont={12}
                  mobileHeight={40}
                  query={fetchAddress}
                  placeHolder="주소 검색"
                />
              </CustomAutoCompleteContainer>
              <VideoItemsContainer>{IterationItem()}</VideoItemsContainer>
            </Container>
          </List>
        </Drawer>
        <Main open={open} theme={theme} $drawerWidth={drawerWidth}>
          <MapFoodFiltering open={open} drawerWidth={drawerWidth} />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: 'none' },
            ]}
          >
            <CustomList />
          </IconButton>
        </Main>
      </Box>
    </>
  );
}
