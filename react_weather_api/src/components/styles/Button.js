// src/components/styled/Button.js
import styled from 'styled-components';

const Button = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: darken(${props => props.theme.colors.primary}, 10%);
  }
`;

export default Button;
