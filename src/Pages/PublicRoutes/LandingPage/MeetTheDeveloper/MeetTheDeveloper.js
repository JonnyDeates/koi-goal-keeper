import React from "react";
import Chibi from "./Chibi/Chibi";
import "./MeetTheDeveloper.css";

const MeetTheDeveloper = ({style = {display: 'block'}, animation}) => {

    const header = 'Meet the Developer';
    const description =  'I am a Freelance Developer, that specializes in minimalism and Reactjs. Although I am \n' +
            'experienced in a range of languages like Angular, Typescript, Nodejs, Javascript, Jquery, Java, Python,\n' +
            ' and Lua. Programming is a tool to create tools for the world and the future, it allows for infinite \n' +
            'creativity, and I am fortunate to have learned the skill! I hope to leave my impact on the future and \n' +
            'if you’d like to check out my other projects, head over to my ';
    const link = {to:'https://jonnydeates.com', name: "personal site." }

        return (
            <section style={style}
                     className={`meet-the-developer-page-wrapper ${animation ? 'section-animation' : ''}`}>
                <h2>{header}</h2>
                <div className={'meet-the-developer-body'}>
                    <Chibi/>
                    <p>{description}<span title={'Goto https://jonnydeates.com'} onClick={()=> window.open(link.to)}>{link.name}</span></p>

                </div>
            </section>)
}

export default MeetTheDeveloper;
