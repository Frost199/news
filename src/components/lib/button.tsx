import styled from 'styled-components';
import { defaultTheme, typeScale } from '../../utils';

const Button = styled.button`
  cursor: pointer;
  font-size: ${typeScale.paragraph};
  width: 48px;
  height: 48px;
  padding: 12px;
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
  width: auto;
`;

export const SecondaryButtonDisabled = styled(SecondaryButton)`
  &[disabled] {
    
  }
`;

export const TertiaryButton = styled(Button)`
  background: ${defaultTheme.textFieldBackground};
  border: 1px solid ${defaultTheme.primaryColorLight};
  color: ${defaultTheme.textFieldLabelColor};
  height: 56px;
  width: auto;
`;
