import styled from 'styled-components';
import { defaultTheme, typeScale } from '../../utils';

const Button = styled.button`
  cursor: pointer;
  font-size: ${typeScale.paragraph};
  min-width: 48px ;
  padding: 12px 24px;
  font-family: ${defaultTheme.primaryFont};
  
  &:disabled {
    cursor: not-allowed;
  }
`;

export const PrimaryButton = styled(Button)`
  background-color: ${defaultTheme.secondaryColor};
  border: none;
  color: ${defaultTheme.primaryColorLight};
  transition: background-color 0.2s linear;
  
  &:hover {
    background-color: ${defaultTheme.secondaryColorHover};
    color: ${defaultTheme.primaryColor};
  }
`;

export const SecondaryButton = styled(Button)`
  background: none;
  border: 1px solid ${defaultTheme.textColorLight};
  color: ${defaultTheme.textColorOnPrimary};
`;

export const TertiaryButton = styled(Button)`
  background: none;
  border: 1px solid ${defaultTheme.primaryColorLight};
  color: ${defaultTheme.primaryColorLight};
`;
