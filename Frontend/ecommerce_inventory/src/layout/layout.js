import React, { useState, useMemo, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme, AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Collapse, Divider, Card, CardContent, Fab, Box, Hidden, InputBase, Avatar, Menu, MenuItem, ListItemIcon, BottomNavigation, BottomNavigationAction, Link } from '@mui/material';
import { LightMode, DarkMode, Menu as MenuIcon, ExpandLess, ExpandMore, Search as SearchIcon, AccountCircle, Settings as SettingsIcon, Notifications as NotificationsIcon, Logout, Home, Code as CodeIcon, Public as PublicIcon, Business as BusinessIcon, AlternateEmail as AlternateEmailIcon, AutoAwesomeTwoTone, Circle, AddCircleOutlineOutlined, DashboardOutlined, ShoppingCartOutlined, StorefrontOutlined, GroupOutlined, InventoryOutlined, CategoryOutlined, Category, ShoppingBasketOutlined, ShoppingBasketRounded, ReceiptOutlined, WarehouseOutlined } from '@mui/icons-material';
import { ThemeProvider as Emotion10ThemeProvider } from '@emotion/react';
import './style.scss';
import { orangeDarkTheme, orangeLightTheme, basicTheme,darkTheme,lightTheme,customTheme,blueLightTheme,blueDarkTheme,greenLightTheme,greenDarkTheme,redLightTheme,redDarkTheme } from './themes';
import logo from '../assets/logo.svg';
import { GlobalStyles } from './GlobalStyle';
import TextField from '@mui/material/TextField';
import { Outlet,useLocation,useNavigate } from 'react-router-dom'; // Import Outlet
import { expandItem,activateItem,triggerPageChange } from '../redux/reducer/sidebardata';
import {useDispatch} from 'react-redux';

const Layout = ({sidebarList,pageTitle,childPage}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true); // State for desktop sidebar
  const [themeMode, setThemeMode] = useState('light');
  const [openChildMenu, setOpenChildMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [themeMenu, setThemeMenu] = useState(null);
  const [sidebarItems, setSidebarItems] = useState(sidebarList);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const location=useLocation();
  console.log(sidebarItems);

  useEffect(()=>{
    dispatch(triggerPageChange(location))
  },[location])

  useEffect(() => {
    setSidebarItems(sidebarList);
  },[sidebarList])

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'basic';
    setThemeMode(savedTheme);
  }, []);

  let theme = useMemo(
    () => {
        switch(themeMode){
            case 'basic':
                return createTheme(basicTheme);
            case 'dark':
                return createTheme(darkTheme);
            case 'light':
                return createTheme(lightTheme);
            case 'custom':
                return createTheme(customTheme);
            case 'blue light':
                return createTheme(blueLightTheme);
            case 'blue dark':
                return createTheme(blueDarkTheme);
            case 'green light':
                return createTheme(greenLightTheme);
            case 'green dark':
                return createTheme(greenDarkTheme);
            case 'red light':
                return createTheme(redLightTheme);
            case 'red dark':
                return createTheme(redDarkTheme);
            case 'orange light':
                return createTheme(orangeLightTheme);
            case 'orange dark':
                return createTheme(orangeDarkTheme);
            default:
                return createTheme(lightTheme);
        }
    },
    [themeMode]
  );

  const handleDrawerToggle = () => {
    if (window.innerWidth >= 960) {
      setDesktopOpen(!desktopOpen); // Toggle desktop sidebar only when in desktop view
    }
    else{
      setMobileOpen(!mobileOpen);
    }
  };

  const toggleTheme = () => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const saveTheme=(themeI)=>{
    setThemeMode(themeI.name.toLowerCase());
    localStorage.setItem('theme', themeI.name.toLowerCase());
  }

  const handleChildMenuToggle = () => {
    setOpenChildMenu(!openChildMenu);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleThemeMenuOpen= (event) => {
    setThemeMenu(event.currentTarget);
  }

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };
  const handleThemeMenuClose = () => {
    setThemeMenu(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
    // Handle logout action
  };

  const drawerWidth = 280;
  const handleSidebarMenuClick=(sidebarItem)=>{
    if(sidebarItem.submenus && sidebarItem.submenus.length>0){
      dispatch(expandItem({id:sidebarItem.id}));
    }
    else{
      dispatch(activateItem({item:sidebarItem}))
      navigate(sidebarItem.module_url);
    }

  }

  const getIcon = (icon) => {
    switch (icon) {
      case 'Add':
        return <AddCircleOutlineOutlined />;
      case 'Dashboard':
        return <DashboardOutlined />;
      case 'Store':
        return <ShoppingCartOutlined />;
      case 'Retail':
        return <StorefrontOutlined />;
      case 'AccountCircle':
        return <GroupOutlined />;
      case 'Settings':
        return <SettingsIcon />;
      case 'Inventory':
        return <InventoryOutlined />;
      case 'Category':
        return <Category />;
      case 'Redeem':
        return <ShoppingBasketRounded />;
      case 'Receipt':
        return <ReceiptOutlined />;
      case 'Warehouse':
        return <WarehouseOutlined />;
      case 'exams':
        return <AccountCircle />;
      case 'results':
        return <AccountCircle />;
      case 'attendance':
        return <AccountCircle />;
      case 'ecommerce':
        return <BusinessIcon />;
      default:
        return <AccountCircle />;
    }
  }

  const drawer = (
    <div
      style={{
        borderRight: '1px solid ' + theme.palette.background.paper,
        backgroundColor: theme.palette.background.paper,
        height: '100%',
        overflowY: 'auto',
        padding: '16px'
      }}
      className='sidebar'
    >
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <img src={theme?.logo?.rectangle} alt="Logo" className='logo' style={{ marginRight: '16px',width:'100%' }} />
        
      </Box>
      <List sx={{ '& .MuiListItem-root': { transition: 'background-color 0.3s' } }}>
        {sidebarItems.map((sidebarItem) => (
            <>
            <ListItem key={sidebarItem.id} onClick={()=>handleSidebarMenuClick(sidebarItem)} sx={{ '&.Mui-selected': { backgroundColor: theme.palette.action.selected }, '&:hover': { backgroundColor: theme.palette.primary.light,borderRadius:'10px' } }} className={(sidebarItem?.active && sidebarItem.submenus.length===0)?"active-sidebar":""}>
                <ListItemIcon>
                    {getIcon(sidebarItem.module_icon)}
                </ListItemIcon>
                <ListItemText primary={sidebarItem.module_name} />
                {"submenus" in sidebarItem && sidebarItem.submenus.length>0?
                    <>
                        {(sidebarItem?.expanded || sidebarItem?.active) ? <ExpandLess /> : <ExpandMore />}
                    </>
                :""}
            </ListItem>
            {"submenus" in sidebarItem && sidebarItem.submenus.length>0?
                <Collapse in={sidebarItem?.expanded || sidebarItem?.active} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
              {sidebarItem.submenus.map(child => (
                            <ListItem button sx={{ pl: 4 }} key={child.module_name} onClick={()=>handleSidebarMenuClick(child)} className={child?.active?"active-sidebar":""}>
                                <ListItemIcon>
                                    {getIcon(child.module_icon)}
                                </ListItemIcon>
                                <ListItemText primary={child.module_name} />
                            </ListItem>
                ))}
                </List>
                </Collapse>              

                :""}
            </>
        ))}

      </List>
    </div>
  );

  const profileMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleProfileMenuClose}
      onClick={handleProfileMenuClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem>
        <ListItemIcon>
          <AccountCircle fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit">Profile</Typography>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit">Settings</Typography>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <NotificationsIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit">Notifications</Typography>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit">Logout</Typography>
      </MenuItem>
    </Menu>
  );

  const themeMenuItems=[
    {
        'name':'Basic',
        'color':'rgba(159, 84, 252, 1)',
        'theme':basicTheme
    },
    {
        'name':'Dark',
        'color':'rgba(17, 17, 17, 1)',
        'theme':darkTheme
    },
    {
        'name':'Light',
        'color':'rgba(159, 84, 252, 1)',
        'theme':lightTheme
    },
    {
        'name':'Custom',
        'color':'rgba(159, 84, 252, 1)',
        'theme':customTheme
    },
    {
        'name':'Blue Light',
        'color':'rgba(135, 206, 250, 1)',
        'theme':blueLightTheme
    },
    {
        'name':'Blue Dark',
        'color':'rgba(0, 0, 255, 1)',
        'theme':blueDarkTheme
    },
    {
        'name':'Green Light',
        'color':'rgba(144, 238, 144, 1)',
        'theme':greenLightTheme
    },
    {
        'name':'Green Dark',
        'color':'rgba(0, 100, 0, 1)',
        'theme':greenDarkTheme
    },
    {
        'name':'Red Light',
        'color':'rgba(255, 192, 203, 1)',
        'theme':redLightTheme
    },
    {
        'name':'Red Dark',
        'color':'rgba(139, 0, 0, 1)',
        'theme':redDarkTheme
    },
    {
        'name':'Orange Light',
        'color':'rgba(255, 222, 173, 1)',
        'theme':orangeLightTheme
    },
    {
        'name':'Orange Dark',
        'color':'rgba(255, 140, 0, 1)',
        'theme':orangeDarkTheme
    }
  ]

  const themeMenuUI = (
    <Menu
      anchorEl={themeMenu}
      open={Boolean(themeMenu)}
      onClose={handleThemeMenuClose}
      onClick={handleThemeMenuClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
        <MenuItem>
            <ListItemIcon>
                
                        <SettingsIcon/> 
                    </ListItemIcon>
                    <Typography variant="inherit">Theme Setting</Typography>

            </MenuItem>
        <Divider />

        {themeMenuItems.map(themeMenu=>(
            <MenuItem onClick={()=>saveTheme(themeMenu)} key={themeMenu.name}>
            <ListItemIcon>
                <Circle sx={{color:themeMenu.color}}/>
            </ListItemIcon>
            <Typography variant="inherit">{themeMenu.name}</Typography>
            </MenuItem>
        ))}

    </Menu>
  );

  return (
    <Emotion10ThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles/>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Box
            component="nav"
            sx={{ width: { sm: desktopOpen ? drawerWidth : 0 }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="persistent"
              open={desktopOpen}
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: desktopOpen ? drawerWidth : 0, transition: 'width 0.3s' },
              }}
            >
              {drawer}
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              transition: 'margin-left 0.3s',
              marginLeft: { xs: 0, sm: desktopOpen ? `${drawerWidth}px` : 0 },
              display: 'flex',
              flexDirection: 'column',
              
            }}
          >
            <AppBar position="sticky" sx={{ backgroundColor: theme.palette.background.default, backgroundImage: 'none', borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: theme.palette.background.paper }} className='appbar'>
              <Toolbar>
                <Hidden mdUp>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerToggle}
                  >
                    <MenuIcon />
                  </IconButton>
                </Hidden>
                <Hidden smDown>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2 }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Hidden>
                <Typography variant='h6' sx={{ flexGrow: 1 }}>
                    {pageTitle || 'Dashboard'}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                  <IconButton
                  className="profile-icon"
                    color="inherit"
                    aria-label="profile"
                    onClick={handleProfileMenuOpen}
                  >
                    <AccountCircle />
                  </IconButton>
                  <IconButton
                  className="theme-icon"
                    color="inherit"
                    aria-label="theme"
                    onClick={handleThemeMenuOpen}
                  >
                    <AutoAwesomeTwoTone/>
                  </IconButton>
              </Toolbar>
            </AppBar>
            {profileMenu}
            {themeMenuUI}
            <section className='main-content' style={{ padding: '20px' }}>
              {childPage?childPage:<Outlet/>}
            </section>
            <Box
              component="footer"
              sx={{
                borderTop: 1,
                borderColor: 'divider',
                py: 2,
                textAlign: 'center',
                mt: 'auto',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                EzyMarket - Version 1.0.0 (2024)
              </Typography>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </Emotion10ThemeProvider>
  );
};

export default React.memo(Layout);
