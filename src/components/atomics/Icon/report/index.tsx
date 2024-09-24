import styled from 'styled-components';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';

const IconSizeContainer = styled.div`
  cursor: pointer;
`;

interface AccountProps {
  onClick?: () => void;
}

export const Report = ({ onClick }: AccountProps) => {
  return (
    <IconSizeContainer>
      <ReportProblemOutlinedIcon onClick={onClick} sx={{ fontSize: 32 }} />
    </IconSizeContainer>
  );
};
