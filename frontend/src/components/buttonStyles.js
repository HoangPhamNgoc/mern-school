import styled from 'styled-components';
import { Button } from '@mui/material';

const createStyledButton = (bgColor, hoverBgColor, hoverBorderColor = null) => styled(Button)`
  && {
    background-color: ${bgColor};
    color: white;
    margin-left: 4px;
    &:hover {
      background-color: ${hoverBgColor};
      ${hoverBorderColor ? `border-color: ${hoverBorderColor};` : ''}
      box-shadow: none;
    }
  }
`;

export const RedButton = createStyledButton('#f00', '#eb7979', '#f26767');
export const BlackButton = createStyledButton('#000000', '#212020', '#212020');
export const DarkRedButton = createStyledButton('#650909', '#eb7979', '#f26767');
export const BlueButton = createStyledButton('#080a43', '#0a1e82');
export const PurpleButton = createStyledButton('#270843', '#3f1068');
export const LightPurpleButton = createStyledButton('#7f56da', '#7a1ccb');
export const GreenButton = createStyledButton('#133104', '#266810');
export const BrownButton = createStyledButton('#2c1006', '#40220c', '#40220c');
export const IndigoButton = createStyledButton('#2f2b80', '#534ea6', '#473d90');