import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { menuItemStyle } from '../../../type/MainType';
import { useNavigate } from 'react-router-dom';

export default function MainMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Menu0Select = () => {
    setAnchorEl(null);
    navigate('/homePage');
  };

  const Menu1Select = () => {
    setAnchorEl(null);
    navigate('/MyMapPage');
  };

  const Menu2Select = () => {
    setAnchorEl(null);
    navigate('/PlaceReviewPage');
  };

  return (
    <div>
      {/* 메뉴 아이콘 버튼 */}
      <IconButton
        id="menu_btn"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-expanded={open ? 'true' : 'false'}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      {/* 메뉴 드롭다운 생성 */}
      <Menu
        id="menu_opt"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
        PaperProps={{
          sx: {
            bgcolor: '#6D7A87', // 연한 주황 배경 (드롭다운 창만)
            borderRadius: 2,
            boxShadow: 3,
            zIndex: 1001,
          },
        }}
      >
        {/* HomePage, 내 여행지도 관리, 여행 스팟 리뷰 */}
        <MenuItem sx={{ ...menuItemStyle }} onClick={Menu0Select}>
          Home
        </MenuItem>
        <MenuItem sx={{ ...menuItemStyle }} onClick={Menu1Select}>
          My Trip Map
        </MenuItem>
        <MenuItem sx={{ ...menuItemStyle }} onClick={Menu2Select}>
          Trip Place Review
        </MenuItem>
      </Menu>
    </div>
  );
}
