'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { Font } from '@/components/atomics/Font';
import { SubTitle } from '@/components/atomics/Typography';
import { Profile } from '@/components/compounds/UserProfile/index';

import { MyVideo, SavedVideo } from '@/components/compounds/UserProfile/index';
const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Container = styled.div`
  display: flex;
  margin: 0 auto;
`;

const Main = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 720px;
  height: 600px;
  background: var(--Default, #fff);
  box-shadow:
    5px 5px 10px 0px rgba(0, 0, 0, 0.25),
    -5px -5px 10px 0px rgba(0, 0, 0, 0.25);
`;

const SiderContainer = styled.div`
  border-right: 3px solid #8e8e8e;
  flex-direction: row;
  width: 120px;
  height: 100%;
  align-items: start;
  justify-content: start;
  display: flex;
`;

const SiderItem = styled.div`
  align-items: center;
  justify-content: start;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 540px;
`;

const SubTitleStyleContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &.activate {
    border-right: 3px solid #ffaaa4 !important;
    padding-right: 3px;
  }
  &:hover {
    background-color: #f0f0f0;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const FormContainer = styled.div``;
export default function ProfilePage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <PageWrapper className="PageWrapper">
      <Container className="Container">
        <Main className="Main">
          <SiderContainer className="SiderContainer">
            <SiderItem className="SiderItem">
              <SubTitleStyleContainer
                className={activeIndex === 0 ? 'activate' : ''}
                onClick={() => handleItemClick(0)}
              >
                <Font label="프로필" font={11} thick="bold" />
              </SubTitleStyleContainer>
              <SubTitleStyleContainer
                className={activeIndex === 1 ? 'activate' : ''}
                onClick={() => handleItemClick(1)}
              >
                <Font label="나의 영상" font={11} thick="bold" />
              </SubTitleStyleContainer>
              <SubTitleStyleContainer
                className={activeIndex === 2 ? 'activate' : ''}
                onClick={() => handleItemClick(2)}
              >
                <Font label="저장된 영상" font={11} thick="bold" />
              </SubTitleStyleContainer>
            </SiderItem>
          </SiderContainer>
          <ContentContainer>
            {activeIndex == 0 && <Profile />}
            {activeIndex == 1 && <MyVideo />}
            {activeIndex == 2 && <SavedVideo />}
          </ContentContainer>
        </Main>
      </Container>
    </PageWrapper>
  );
}
