import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingContainer = styled.div`
  display: block;
  width: 100%;
  font-size: 2rem;
`;

const spinner = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  
`;
const Loader = styled.div`
  margin: auto;
  border: 20px solid green;
  border-radius: 50%;
  border-top: 20px solid darkgreen;
  width: 100px;
  height: 100px;
  animation: ${spinner} 4s linear infinite;
`;

const Loading = ({ loaderProps }) => {
  <LoadingContainer>
    <Loader data-testid='loading' {...loaderProps} />
  </LoadingContainer>;
};

export default Loading;
