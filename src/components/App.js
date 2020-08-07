import React from "react";

import Game from "./Game/Playground";

const sentences = {
  TEST: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
  ONN: ['OM', 'NA', 'MO', 'NĀ', 'RĀ', 'YA', 'ṆA', 'YA'],
  GTR: ['OM', 'BHUR', 'BHU', 'VA', 'SVA', 'HA', 'TAT', 'SA', 'VI', 'TUR', 'VA', 'RE', 'NYA', 'BHA', 'RGO', 'DE', 'VA', 'SYA', 'DI', 'MA', 'HI', 'DI', 'YO', 'YO', 'NAT', 'PRA', 'CHYO', 'DA', 'YA', 'TE'],
  SVG: ['ŚRĪ', 'VIṬ', 'ṬHA', 'LA', 'GI', 'RI', 'DHĀ', 'RI', 'PA', 'RA', 'BRA', 'HMA', 'ṆE', 'NA', 'MAḤ'],
};

export default () => {
  return (
    <Game syllables={sentences.SVG} />
  )
};
