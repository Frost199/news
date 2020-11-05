import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { defaultTheme, secondaryFont } from '../../utils';

const Input = styled.input`
  background-color: ${props => props.theme.textFieldBackground};
  border: none;
  border-radius: 2px;
`;

const InputSearch = styled(Input)`
  width: 309px;
  height: 56px;
  background-color: ${props => props.theme.textFieldBackground};
  color: ${props => props.theme.textFieldLabelColor};
  border: none;
  padding-left: 40px;
  font-family: ${secondaryFont};
  border-radius: 2px;
  
  &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: ${props => props.theme.textFieldLabelColor};
  opacity: 1; /* Firefox */
  }
  
  &:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: ${props => props.theme.textFieldLabelColor};
  }
  
  &::-ms-input-placeholder { /* Microsoft Edge */
    color: ${props => props.theme.textFieldLabelColor};
  }
  
  @media only screen and (max-width: 768px) {
    height: 30px;
    width: 200px;
    
    @media only screen and (max-width: 400px) {
      display: block;
      width: 100%;
    }
  }
`;

interface IEmailProps {
  placeHolder: string;
}

export const SearchInput = ({ placeHolder }: IEmailProps) => (
  <div className="input-icon">
    <FontAwesomeIcon className="icon" icon={faSearch} size="xs"/>
    <InputSearch aria-label='search' theme={defaultTheme} id="email" type="email" placeholder={placeHolder}/>
  </div>
);