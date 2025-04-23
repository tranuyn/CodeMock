// src/app/components/AppBar.tsx
"use client"; // Cần thêm directive này cho Next.js App Router

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  AppBar as MuiAppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  SxProps,
  Theme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import VideoChatRoundedIcon from '@mui/icons-material/VideoChatRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Link from 'next/link';
import Logo from '@/assets/images/logo.svg';
import Image from 'next/image';

interface AppBarProps {
  isHomePage: boolean;
  isShow?: boolean;
}

const AppBar: React.FC<AppBarProps> = ({ isHomePage, isShow = true }) => {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  // Common styles
  const listItemButtonStyle: SxProps<Theme> = {
    '& .MuiTypography-root': { textTransform: 'none' },
  };
  
  const buttonStyle: SxProps<Theme> = { 
    my: 1, 
    color: 'white', 
    display: 'flex', 
    textTransform: 'none',
    width: '100%',
  };

  // Public routes available to all users
  const publicRoutes = [
    { name: 'Trang chủ', path: '/', icon: <HomeRoundedIcon /> },
  ];

  // Routes for authenticated users
  const authenticatedRoutes = [
    { name: 'Lịch phỏng vấn', path: '/schedule', icon: <CalendarMonthRoundedIcon  /> },
    { name: 'Tìm kiếm', path: '/search', icon: <SearchRoundedIcon /> },
  ];

  // Routes based on specific roles
  const adminRoutes = [
    { name: 'Xem lại và đánh giá', path: '/viewAndFeedback', icon: <VideoChatRoundedIcon />  },
    { name: 'Cài đặt', path: '/settings', icon: <SettingsIcon />},
  ];

  const settings = ['Login', 'Logout'];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingClick = (setting: string) => {
    handleCloseUserMenu();
    if (setting === 'Logout') {
      console.log('Logging out...');
    } else if (setting === 'Login') {
      router.push('/authentication');
    } 
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  // Render route item for drawer
  const renderDrawerRouteItem = (route: { name: string, path: string, icon: React.ReactNode }) => (
    <Link href={route.path} key={route.name} style={{ textDecoration: 'none', color: 'inherit'}}>
      <ListItemButton sx={listItemButtonStyle}>
        <ListItemIcon>{route.icon}</ListItemIcon>
        <ListItemText primary={route.name} />
      </ListItemButton>
    </Link>
  );

  // Phần nội dung của drawer/sidebar
  const drawerContent = (
    <Box
      sx={{ width: 250,  }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {publicRoutes.map(renderDrawerRouteItem) }
        <Divider />
        {authenticatedRoutes.map(renderDrawerRouteItem)}
        <Divider />
        {adminRoutes.map(renderDrawerRouteItem)}
      </List>
    </Box>
  );

  return (
    <>
      <MuiAppBar position="static" elevation={isHomePage ? 0 : 2}
        sx={{ background: isHomePage ? 'transparent' : 'linear-gradient(45deg, #501794 30%, #3E70A1 90%)', display: isShow ? 'block' : 'none' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo và tiêu đề cho màn hình lớn */}
            <Link href="/" style={{ textDecoration: 'none', width: '18%' }}>
              <Image
                src={Logo}
                alt="logo"
                style={{ objectFit: 'contain', width: '70%' }}
                priority
              />
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawer(true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Logo và tiêu đề cho màn hình nhỏ */}
            {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}

            {/* Các nút điều hướng cho màn hình lớn */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', flex: 1, justifyContent: 'space-around' } }}>
              {[...publicRoutes, ...authenticatedRoutes, ...adminRoutes].map((route) => (
                <Button
                  key={route.name}
                  component={Link}
                  href={route.path}
                  sx={buttonStyle}
                  startIcon={route.icon}
                >
                  {route.name}
                </Button>
              ))}
            </Box>

            {/* Menu user */}
            <Box sx={{ flexGrow: 0 , width: '12%', display: 'flex', justifyContent: 'right'}}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar-user"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleSettingClick(setting)}>
                    <Typography sx={{ textAlign: 'center', textTransform: 'none' }}>
                      {setting === 'Login' ? <Link href="/authentication">Log in</Link> : setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </MuiAppBar>

      <Drawer 
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: 'rgba(228, 228, 228, 0.95)', // Thay 'yourColor' bằng mã màu bạn muốn
          },
        }}
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default AppBar;