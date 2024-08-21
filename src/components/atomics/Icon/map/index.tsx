'use client';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import styled from 'styled-components';

const IconSizeContainer = styled.div`
  height: 20px;
  width: 20px;
  cursor: pointer;
`;

interface AccountProps {
  onClick?: () => void;
}

export const Map = ({ onClick }: AccountProps) => {
  return (
    <IconSizeContainer>
      <TravelExploreOutlinedIcon onClick={onClick} sx={{ fontSize: 20 }} />
    </IconSizeContainer>
  );
};
