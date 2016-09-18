import React from 'react';
import randomColor from 'randomColor';

function determineColor(result) {
	if (!result) {
		return '#EEE';
	} else {
		if (result == 'Pathogenic') return randomColor({hue: 'red'});
		return randomColor({hue: 'blue'});
	}

}

class Card extends React.Component {
	shouldComponentUpdate() {
		return false;
	}

	render() {
		const { data } = this.props;
		return (
		<div className="sidebarCard">
			<div className="sidebarCardStrand" style={{
				backgroundColor: determineColor(data.result)
			}}/>
			<div className="sidebarCardContent">
				<div className="sidebarCardContentContainer">
					<p className="subtitle">Name</p>
					<h3>{data.name}</h3>
					<p className="subtitle">URL</p>
					<a target="_blank" className={`${data.url === '' ? 'disabled' : ''}`} href={data.url}><h3>Analysis Link</h3></a>
					<p className="subtitle">Result</p>
					<h3 className={`${data.url === '' ? 'disabled' : ''}`}>{data.result || 'Indeterminant Response'}</h3>
				</div>
			</div>
		</div>
	);
	}
}

export default Card;