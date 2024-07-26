import React from 'react';
import { SpeedDial, SpeedDialAction, styled } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';

const CustomSpeedDial = styled(SpeedDial)`
  .MuiSpeedDial-fab {
    background-color: #032803;
    &:hover {
      background-color: green;
    }
  }
`;

const SpeedDialTemplate = ({ actions }) => (
    <CustomSpeedDial ariaLabel="SpeedDial playground example" icon={<TuneIcon />} direction="left">
        {actions.map((action) => (
            <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={action.action} />
        ))}
    </CustomSpeedDial>
);

export default SpeedDialTemplate;