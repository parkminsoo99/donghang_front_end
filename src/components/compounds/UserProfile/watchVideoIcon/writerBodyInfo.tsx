import styled from 'styled-components';
import './scroll.css';
import { OtherChattingTemplate } from '../../Chatting/chattingTemplate';
import { useState } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: scroll;
`;
export const WriterBodyInfo = () => {
  const [otherCommentArray, setOtherCommentArray] = useState([]);
  const [showOtherCommentCount, setShowOtherCommentCount] = useState(true);
  const test = () => {
    const otherCommentArray = [];
    otherCommentArray.push(
      <OtherChattingTemplate
        userName="minsoo3"
        showOtherCommentCount={false}
        isPaddingLeft={true}
        numberOfOtherCommentCount={12}
      />
    );
    otherCommentArray.push(
      <OtherChattingTemplate
        userName="minsoo4"
        showOtherCommentCount={false}
        isPaddingLeft={true}
        numberOfOtherCommentCount={12}
      />
    );
    setOtherCommentArray(otherCommentArray);
    setShowOtherCommentCount(false);
  };
  return (
    <Container>
      <OtherChattingTemplate
        userName="minsoo1"
        showOtherCommentCount={false}
        isPaddingLeft={false}
        numberOfOtherCommentCount={14}
      />
      <OtherChattingTemplate
        userName="minsoo2"
        showOtherCommentCount={showOtherCommentCount}
        isPaddingLeft={true}
        numberOfOtherCommentCount={2}
        OtherCommentFunction={test}
      />
      {otherCommentArray &&
        otherCommentArray.map((value, index) => <div key={index}>{value}</div>)}
    </Container>
  );
};
