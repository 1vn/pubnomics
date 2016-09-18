import React from 'react';
import Button from './Button';
import Icon from './Icon';
import ProteinBlock from './ProteinBlock';
import shallowCompare from 'react-addons-shallow-compare';


class Modal extends React.Component {
	shouldComponentUpdate(nextProps, nextState){
		return shallowCompare(this, nextProps, nextState)
	}

	componentDidMount() {
		this.onEsc = this.onEsc.bind(this);
		document.body.addEventListener('keydown', this.onEsc);
	}

	componentWillUnmount() {
		document.body.removeEventListener('keydown', this.onEsc);
	}

	onEsc(e) {
		e = e || window.event;
		if (e.keyCode === 27) {
			this.props.onClose();
		}
	}

	onClickOverlay(e) {
		if (!this.modal.contains(e.target)) {
			this.props.onClose();
		}
	}

	render() {
		if(this.props.isOpen) { 
			return (
			<div
				className="modalBackground"
				onClick={::this.onClickOverlay}
			>
				<div
					className="modalElement"
					ref={(ref) => {
			        	this.modal = ref;
				      }}
				>
				<div className="modalNavigation">
					<div style={{ flex: 1 }}>
						<h3>Pick your resulting protein</h3>
						<p>{this.props.picked.data}{this.props.picked.id}</p>
					</div>
					<Button
				        className="sidebarCloseButton"
				        onClick={() => this.props.onClose()}
				        
				      >
				        <Icon
				          iconType="cross"
				          style={{
				            height: 25,
				            width: 25,
				          }}
				        />
				      </Button>
				  </div>
				  <div className="modalContent">
				  	<div className="modalContentContainer">
				  		{this.props.possiblePoints.map((each, index) => {
					    const color = this.props.colorMapping[this.props.proteinMappingArray.indexOf(each)];
					    return (
					      <ProteinBlock
					        key={index}
					        id={index}
					        color={color || 'rgb(125, 237, 186)'}
					        data={each}
					        typeOfProtein={each}
					        onClick={() => this.props.onPickResult(each)}
					        shouldShow
					      />
					    );
				  		})}
				  	</div>
				  </div>
				</div>
			</div>
		);
		}
		return null;
	}
}

export default Modal;