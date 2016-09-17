import React from 'react';
import randomColor from 'randomcolor';


const proteinBlockData = 'OPO';

function ProteinBlock(props) {
  return (
    <div className="proteinBlockSection">
      {Array.from(proteinBlockData).map((each, index) => {
        return (
          <div
          className="eachProtein"
          key={each + index}
          style={{
            backgroundColor: randomColor(),
          }}
          />
        );
      })}
    </div>
  );
}

export default ProteinBlock;
