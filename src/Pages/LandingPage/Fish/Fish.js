import React, {Component} from 'react'

//Koi Fishes
import asagi from './fish/asagi.png'
import bekko from './fish/bekko.png'
import goshiki from './fish/goshiki.png'
import karasugoi from './fish/karasugoi.png'
import kigoi from './fish/kigoi.png'
import kinKiUtsuri from './fish/kin_ki_utsuri.png'
import kinShowa from './fish/kin_showa.png'
import kohaku from './fish/kohaku.png'
import koromo from './fish/koromo.png'
import platinum from './fish/platinum.png'
import showaSanshoku from './fish/showa_sanshoku.png'
import shusui from './fish/shusui.png'
import taishoSanke from './fish/taisho_sanke.png'
import tancho from './fish/tancho.png'

import './Fish.css';

export default class Fish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bounds: {x: 1980, y: 300},
            fishes: [],
            fishCount: 3,
            interval: null,
            indexes: [0],
            fishSrcs: [
                {src: asagi, name: 'Asagi'},
                {src: bekko, name: 'Bekko'},
                {src: goshiki, name: 'Goshiki'},
                {src: karasugoi, name: 'Karasugoi'},
                {src: kigoi, name: 'Kigoi'},
                {src: kinKiUtsuri, name: 'Kin Ki Utsuri'},
                {src: kinShowa, name: 'Kin Showa'},
                {src: kohaku, name: 'Kohaku'},
                {src: koromo, name: 'Koromo'},
                {src: platinum, name: 'Platinum'},
                {src: showaSanshoku, name: 'Showa Sanshoku'},
                {src: shusui, name: 'Shusui'},
                {src: taishoSanke, name: 'Taisho Sankshoku'},
                {src: tancho, name: 'Tancho'},
            ]
        }
    }
    componentDidMount(){
        if(this.props.fishCount) {
            this.setState({fishCount: this.props.fishCount})
        }
        if(this.props.indexes){
            this.setState({indexes: this.props.indexes})
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.bounds !== this.props.bounds){
            this.setState({bounds: this.props.bounds}, ()=> {
                this.createPond(this.state.fishCount);
                const interval = setInterval(() => {
                    if (this.state.fishCount > this.state.fishes.length) {
                        this.state.fishes.push(this.createKoi())
                    } else if (this.state.fishCount < this.state.fishes.length) {
                        this.state.fishes.splice(0, 1)
                    }
                    this.setState({
                        fishes: this.state.fishes.map(fish => {
                            let vector = fish.vector;
                            let x = fish.x + vector.x; // Movement in the X direction
                            let y = fish.y + vector.y; // Movement in the Y direction
                            let animation = fish.animation;
                            const rand = (i) => this.rand(i);

                            animation = (fish.animation <= 100) ? animation + 5 : animation;

                            if (x > this.state.bounds.x) // Bounds Detection Horizontal
                                x = 0;
                            else if (x < -1 * fish.size.width)
                                x = this.state.bounds.x;

                            if (y > this.state.bounds.y) // Bounds Detection Vertical
                                y = 0;
                            else if (y < -1 * fish.size.height)
                                y = this.state.bounds.y;

                            // 1% chance of new Movement (Recalculates Vectors)
                            if (rand(101) < 1) {
                                vector.x = rand(2) === 1 ? (rand(4) + 1) : -(rand(4) + 1); // 50% Chance to move up to 3 in either direction horizontally & Never stand still
                                vector.y = rand(2) === 1 ? (rand(4) - 2) : 0; //50% chance to move horizontally -- 50% to move vertically between speeds [-2, 1]
                            }
                            return {x, y, name: fish.name, src: fish.src, size: fish.size, vector, animation}
                        })
                    })
                }, 20);
                this.setState({interval})
            })
        }
    }


    rand = (i) => Math.floor(i * Math.random());

    createKoi = () => {

        const sizes = [50, 60, 70, 80, 90, 95, 100, 105]; // Width & Height of Fishes
        const rand = (i) => this.rand(i);

        const size = sizes[rand(sizes.length)];
        console.log(this.state.fishSrcs, this.state.indexes, 'hereeee')
        const src = this.state.fishSrcs[this.state.indexes[rand(this.state.indexes.length)]]; // Gets the Fishes Image
        return {
            x: rand(this.state.bounds.x), y: rand(this.state.bounds.y), // Positioning
            src: src.src, // Fish Image
            size: {width: size, height: size},
            name: src.name,
            vector: {x: (rand(6) + 1), y: rand(3)}, //Random Vector
            animation: 0
        }
    };

    createPond = (fishCount) => {
        let fishes = [];

        for (let x = 0; x < fishCount; x++) {
            fishes.push(this.createKoi());
        }
        this.setState({fishes}) // Updating the Fishes to be displayed
    };

    scurryAway = (fish) => fish.vector.x = fish.vector.x < 0 ? -6 : 6;



    render() {
        return (
            <div className={'canvas-wrapper'}>
                {this.state.fishes.map((fish, i) => <img key={'koi' + i} src={fish.src} alt={fish.name}
                                                         title={fish.name}
                                                         width={`${fish.size.width}px`}
                                                         height={`${fish.size.height}px`}
                                                         className={'koi-fish'} onClick={() => this.scurryAway(fish)}
                                                         style={{
                                                             position: 'absolute',
                                                             left: fish.x,
                                                             top: fish.y,
                                                             animation: (fish.animation >= 100) ? `${2 / Math.abs(fish.vector.x)}s ${(fish.vector.x > 0) ? 'swimRev' : 'swim'} infinite` : '1s fadeIn forwards'
                                                         }}/>)}
            </div>
        );
    }


}
