import React, {Component} from "react";
import "./LandingPageSection.css";

class LandingPageSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            header: '',
            description: '',
            image: null,
            imageDesc: ''
        }
    }

    componentDidMount() {
        if (this.props.image) {
            this.setState({image: this.props.image, imageDesc: this.props.imageDesc});
        }
        this.setState({header: this.props.header, description: this.props.description});
    }

    render() {


        const Image = ((this.state.image) ? <figure>
            <img src={this.state.image} alt={this.state.imageDesc}/>
            <figcaption>{this.state.imageDesc}</figcaption>
        </figure> : '');

        const Body = (
            <div className={'landing-page-section-body'}>
                {this.state.description}
            </div>
        )
        return (
            <section className={'landing-page-section'}>
                <h2>{this.state.header}</h2>
                {Body}
                {Image}
            </section>
        )
    }
}

export default LandingPageSection;