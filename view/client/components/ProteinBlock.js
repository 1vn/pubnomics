import React from 'react';


class ProteinBlock extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.isSelected !== this.props.isSelected) return true;
    return false;
  }

  render() {
    const { id, onClick, isSelected, data, color, typeOfProtein } = this.props;
    return (
      <div
        className={`proteinBlockSection ${isSelected ? 'selected' : ''}`}
        id={id}
        onClick={() => onClick(typeOfProtein, id)}
      >
        <p className="proteinName">{typeOfProtein}</p>
        <div className="proteinSection">
          {Array.from(data).map((each, index) => {
            return (
              <div
              className="eachProtein"
              key={data + index}
              style={{
                backgroundColor: color
              }}
              >
                {each}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}


export default ProteinBlock;
