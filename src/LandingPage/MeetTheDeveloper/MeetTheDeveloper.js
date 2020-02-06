import React, {Component} from "react";
import "./MeetTheDeveloper.css";
import Chibi from "./Chibi/Chibi";

class MeetTheDeveloper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            header: 'Meet the Developer',
            description: 'I am a Freelance Developer, that specializes in minimalism and Reactjs. Although I am \n' +
                'experienced in a range of languages like Angular, Typescript, Nodejs, Javascript, Jquery, Java, Python,\n' +
                ' and Lua. Programming is a tool to create tools for the world and the future, it allows for infinite \n' +
                'creativity, and I am fortunate to have learned the skill! I hope to leave my impact on the future and \n' +
                'if you’d like to check out my other projects, head over to my ',
            link: {to:'https://jonnydeates.com', name: 'personal site.' }
        }
    }


    render() {
        return (
            <section className={'meet-the-developer-page-wrapper'}>
                <h2>{this.state.header}</h2>
                <div className={'meet-the-developer-body'}>
                    <Chibi/>
                    <p>{this.state.description}<span title={'Goto https://jonnydeates.com'} onClick={()=> window.open(this.state.link.to)}>{this.state.link.name}</span></p>

                </div>
            </section>)
    }
}

export default MeetTheDeveloper;