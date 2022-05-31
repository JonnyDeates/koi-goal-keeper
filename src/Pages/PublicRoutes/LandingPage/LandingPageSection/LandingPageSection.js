import React, {useEffect, useRef, useState} from "react";
import Fish from "../Fish/Fish";
import "./LandingPageSection.css";

const LandingPageSection = ({image, imageDesc = '', isFlipped = false, header = '', description = '', style = {display: 'block'}, fishCount = 3, indexes = [], animationRun}) =>  {
    const [bounds, setBounds] = useState({x: 0, y:0})
    const ref = useRef()

    useEffect(()=>{
        handleBounds();
    }, [ref.current])

    const handleBounds = () => setBounds({x: ref.current.offsetWidth, y: ref.current.offsetHeight});

    const Image = image && <figure>
            <img src={image} alt={imageDesc}/>
            <figcaption>{imageDesc}</figcaption>
        </figure>;

    const Body = <div>
            {description.map((paragraph, i) => <p key={i} className={'landing-page-text'}>
                {paragraph}
            </p>)}
        </div>
        const flipped = isFlipped ? <>{Body}{Image}</> : <>{Image}{Body}</>;

        return (
            <section style={style} ref={ref}
                    className={`landing-page-section ${image ? 'landing-page-full-section' : ''}
                    ${animationRun ? 'section-animation' : ''}`}>
                {indexes.length > 0 && <Fish bounds={bounds} indexes={indexes} fishCount={fishCount}/>}
                <h2>{header}</h2>
                <div className={`landing-page-body`}>
                    {flipped}
                </div>
            </section>
        )
}

export default LandingPageSection;
