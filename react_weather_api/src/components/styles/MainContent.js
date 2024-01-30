// src/components/styled/MainContent.js
import styled from 'styled-components';

const MainContent = styled.div`
  display: flex;
  // ... other styles

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export default MainContent;