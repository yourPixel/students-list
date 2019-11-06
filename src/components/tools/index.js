//@flow
import * as React from "react"
import { isArray, isNull, isObject, isUndefined } from 'util';

type DataProps = {
	data: any,
	children: React.Node
}

export class Data extends React.Component<DataProps> {
	render() {
		const {data, children} = this.props;
		
		if (isNull(data) || isUndefined(data)) {
			return null;
		}
		
		if (isArray(data)) {
			return data.map((item, index) => children({item: item, index: index}))
		}
		
		if (isObject(data)) {
			return Object.entries(data).map(([k, v], index) => children({item: [k, v], index: index}))
		}
		
		return null;
		
	}
}

// ClickOutsideProps

type ClickOutsideProps = {
	clickedOutside: (e: Event) => void;
	children: any => React.Node
}
export class ClickOutside extends React.Component<ClickOutsideProps> {
	
	node = React.createRef();
	
	componentDidMount() {
		document.addEventListener('click', this.outsideClickHandler, true);
	};
	
	componentWillUnmount() {
		document.removeEventListener('click', this.outsideClickHandler, true);
	};
	
	outsideClickHandler = (e: Event): void => {
		const domNode = this.node.current;
		
		if (domNode !== null && !domNode.contains(e.target)) {
			const {clickedOutside} = this.props;
			clickedOutside(e);
		}
	};
	
	render() {
		return this.props.children({
			innerRef: this.node
		});
	}
}