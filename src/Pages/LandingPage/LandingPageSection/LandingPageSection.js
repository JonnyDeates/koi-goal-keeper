import React, {Component} from "react";
import "./LandingPageSection.css";
import Fish from "../Fish/Fish";

class LandingPageSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            header: '',
            runAnimation: false,
            description: [],
            image: null,
            imageDesc: '',
            isFlipped: false,
            style: {display: 'block'},
            indexes: [],
            section: null,
            fishCount: 3,
            bounds: {x: 0, y:0}
        }
    }

    componentDidMount() {
        if (this.props.image) {
            this.setState({image: this.props.image, imageDesc: this.props.imageDesc});
        }
        if (this.props.isFlipped) {
            this.setState({isFlipped: this.props.isFlipped});
        }
        if (this.props.header) {
            this.setState({header: this.props.header});
        }
        if (this.props.description) {
            this.setState({description: this.props.description})
        }
        if (this.props.style) {
            this.setState({style: this.props.style})
        }
        if(this.props.indexes) {
            this.setState({indexes: this.props.indexes})
        }
        if(this.props.fishCount) {
            this.setState({fishCount: this.props.fishCount})
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.animationRun !== this.props.animationRun) {
            this.setState({runAnimation: this.props.animationRun})
        }
        if(prevState.isToggled !== this.state.isToggled){
            this.setState({bounds:{x: this.state.section.offsetWidth, y: this.state.section.offsetHeight}})
        }
        if (prevState.bounds.x !== this.state.section.offsetWidth) {
            this.setBounds();
        }
    }
    setBounds = () => this.setState({
        bounds: {
            x: this.state.section.offsetWidth,
            y: this.state.section.offsetHeight
        }
    });
    render() {
        const Image = ((this.state.image) ? <figure>
            <img src={this.state.image} alt={this.state.imageDesc}/>
            <figcaption>{this.state.imageDesc}</figcaption>
        </figure> : '');

        const Body = (<div>
            {this.state.description.map((paragraph, i) => <p key={i} className={'landing-page-text'}>
                {paragraph}
            </p>)}
        </div>);
        const flipped = (this.state.isFlipped) ? <>{Body}{Image}</> : <>{Image}{Body}</>;
        if(this.state.section && !this.state.isToggled)
            this.setState({isToggled: true});
        return (
            // eslint-disable-next-line
            <section style={this.state.style} ref={section => this.state.section = section}
                    className={`landing-page-section ${(this.state.image) ? 'landing-page-full-section' : ''}
                    ${(this.state.runAnimation) ? 'section-animation' : ''}`}>
                {this.state.indexes.length > 0 ?
                    <Fish bounds={this.state.bounds} indexes={this.state.indexes} fishCount={this.state.fishCount}/>
                    : ''}
                <h2>{this.state.header}</h2>
                <div className={`landing-page-body`}>
                    {flipped}
                </div>
            </section>
        )
    }
}

export default LandingPageSection;
