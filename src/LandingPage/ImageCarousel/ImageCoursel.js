import React from 'react';
import './ImageCoursel.css';

class ImageCoursel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentImageIndex: 0,
            imageUrls: []
        };
        this.nextSlide = this.nextSlide.bind(this);
        this.prevSlide = this.prevSlide.bind(this);
    }

    componentDidMount() {
        if(this.props.imageUrls) {
            this.setState({imageUrls: this.props.imageUrls});
        }

    }

    nextSlide() {
        const lastIndex = this.state.imageUrls.length - 1;
        const {currentImageIndex} = this.state;

        this.setState({
            currentImageIndex: currentImageIndex === lastIndex ? 0 : currentImageIndex + 1
        });
    }

    prevSlide() {
        const lastIndex = this.state.imageUrls.length - 1;
        const {currentImageIndex} = this.state;

        this.setState({
            currentImageIndex: currentImageIndex === 0 ? lastIndex : currentImageIndex - 1
        });
    }

    render() {
        const ImageSlide = (image) => {

            if(image.img)
                return (
                    <img className="image-slide noselect" src={image.img.img} alt={image.atl}/>
                );
            return (<></>)
        };

        const Arrow = ({direction, clickFunction, glyph}) => (
            <div
                className={`slide-arrow noselect ${direction}`}
                onClick={clickFunction}>
                {glyph}
            </div>
        );

        return (
            <>
                <section className='image-coursel'>
                    <Arrow
                        direction="left"
                        clickFunction={this.prevSlide}
                        glyph="&#9664;"/>

                    <ImageSlide img={this.state.imageUrls[this.state.currentImageIndex]}/>

                    <Arrow
                        direction="right"
                        clickFunction={this.nextSlide}
                        glyph="&#9654;"/>

                </section>
                <section className='image-slider'>{this.state.imageUrls.map((img, i) => <div key={i} onClick={() =>
                    this.setState({currentImageIndex: i})}
                                                                                             className={`${(i === this.state.currentImageIndex) ? 'circle-active' : ''}`}/>)}</section>
            </>

        );
    }
}

export default ImageCoursel;
