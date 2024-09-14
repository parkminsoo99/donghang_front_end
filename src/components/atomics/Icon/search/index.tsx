import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import styled from 'styled-components';

interface Props {
  IconColor?: string;
  onClick?: () => void;
}
const IconSizeContainer = styled.div`
  height: 24px;
  width: 24px;
  cursor: pointer;
`;
export const SearchIcon = ({ IconColor, onClick }: Props) => {
  return (
    <IconSizeContainer onClick={onClick}>
      <SearchSharpIcon style={{ color: IconColor }} />
    </IconSizeContainer>
  );
};
