import styled from 'styled-components';
import { Search } from '@/components/atomics/Search';
import { SubTitle } from '@/components/atomics/Typography';
import { foodListsWithOutAll } from '@/constants/foodLists';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 25px;
`;
const TopRightContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubTitleContainer = styled(SubTitle)`
  border-bottom: 1px solid #000;
`;
const KindOfFoodContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const SubKindOfFoodContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const VideoRegister = () => {
  const foodList = foodListsWithOutAll;
  return (
    <Container>
      <TopContainer>
        <TopRightContainer>
          <Search placeHolder="주소 검색" />
        </TopRightContainer>
      </TopContainer>
      <SubTitleContainer label="분류" level={5} />
      <KindOfFoodContainer>
        <SubKindOfFoodContainer></SubKindOfFoodContainer>
      </KindOfFoodContainer>
    </Container>
  );
};
