import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import styled from 'styled-components';

const IconSizeContainer = styled.div`
  height: 24px;
  width: 24px;
`;
export const SearchIcon = () => {
  return (
    <IconSizeContainer>
      <SearchSharpIcon />;
    </IconSizeContainer>
  );
};
