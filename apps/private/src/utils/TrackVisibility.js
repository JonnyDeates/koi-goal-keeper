import {Component} from 'react';
import * as React from "react";
// Received from https://hackernoon.com/tracking-element-visibility-with-react-and-the-intersection-observer-api-7dfaf3a47218
export default class TrackVisibility extends Component {
    ref = React.createRef();

    async componentDidMount() {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.intersectionRatio >= .5) {
                this.props.onVisible()
            }
        }, {
            root: null,
            rootMargin: '0px',
            threshold: [0.5,1.0]
        })
        if(this.ref.current) {
            observer.observe(this.ref.current)
        }
    }
    render() {
        return <div ref={this.ref}> {this.props.children} </div>
    }
}
