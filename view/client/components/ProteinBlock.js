import React from 'react';
import randomColor from 'randomcolor';


const proteinBlockData = 'OPO';

function ProteinBlock({ id, onClick, isSelected }) {
  return (
    <div
      className={`proteinBlockSection ${isSelected ? 'selected' : ''}`}
      id={id}
      onClick={() => onClick(id)}
    >
      {Array.from(proteinBlockData).map((each, index) => {
        return (
          <div
          className="eachProtein"
          key={each + index}
          style={{
            backgroundColor: randomColor(),
          }}
          >
            {each}
          </div>
        );
      })}
    </div>
  );
}

export default ProteinBlock;
