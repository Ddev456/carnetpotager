import React, { type Dispatch, type SetStateAction } from 'react';
import { Map } from './Map';

export const ClimateStep = ({handleClimateIsDefined}: {handleClimateIsDefined: Dispatch<SetStateAction<boolean>>}) => {

  return (
    <Map handleClimateIsDefined={handleClimateIsDefined} />
  );
};
