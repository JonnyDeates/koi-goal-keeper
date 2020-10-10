import React, {Component} from "react";
import "./LandingPageSection.css";

class LandingPageSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            header: '',
            runAnimation: false,
            description: [],
            image: null,
            imageDesc: '',
            isFlipped: false
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
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.animationRun !== this.props.animationRun){
        this.setState({runAnimation: this.props.animationRun})
    }
    }

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
        return (
                <section className={`landing-page-section ${(this.state.image) ? 'landing-page-full-section' : ''} ${(this.state.runAnimation) ? 'section-animation' : ''}`}>
                <h2 >{this.state.header}</h2>
                <div className={`landing-page-body`}>
                    {flipped}
                </div>
          </section>
        )
    }
}

export default LandingPageSection;
