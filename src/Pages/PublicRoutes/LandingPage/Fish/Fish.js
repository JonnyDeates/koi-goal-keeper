import React, {Component, useEffect, useState} from 'react'

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

const Fish = ({fishCount = 3, bounds = {x: 0, y: 0}, fishIndexes = []}) => {
    const [fishes, setFishes] = useState([])
    const [timing, setTiming] = useState(null)
    const fishSrcs = [
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

    useEffect(()=>{
        createPond();
        if(!timing){


        setTiming(setInterval(() => {
                if (fishCount > fishes.length) {
                    setFishes([...fishes, createKoi()])
                } else if (fishCount < fishes.length) {
                    const newFishes = fishes;
                    newFishes.pop()
                    setFishes(newFishes)
                }
                setFishes(fishes.map(fish => {
                    let vector = fish.vector;
                    let x = fish.x + vector.x; // Movement in the X direction
                    let y = fish.y + vector.y; // Movement in the Y direction
                    let animation = fish.animation;

                    animation = (fish.animation <= 100) ? animation + 5 : animation;

                    if (x > bounds.x) // Bounds Detection Horizontal
                        x = 0;
                    else if (x < -1 * fish.size.width)
                        x = bounds.x;

                    if (y > bounds.y) // Bounds Detection Vertical
                        y = 0;
                    else if (y < -1 * fish.size.height)
                        y = bounds.y;

                    // 1% chance of new Movement (Recalculates Vectors)
                    if (rand(101) < 1) {
                        vector.x = rand(2) === 1 ? (rand(2) + 1) : -(rand(2) + 1); // 50% Chance to move up to 3 in either direction horizontally & Never stand still
                        vector.y = rand(2) === 1 ? (rand(3) - 2) : 0; //50% chance to move horizontally -- 50% to move vertically between speeds [-2, 1]
                    }
                    return {...fish, x, y, vector, animation}
                }))
            }),20)
        }
    }, [])

    const rand = (i) => Math.floor(i * Math.random());

    const createKoi = () => {
        const sizes = [50, 60, 70, 80, 90, 95, 100, 105]; // Width & Height of Fishes
        const size = sizes[rand(sizes.length)];
        const src = fishSrcs[fishIndexes[rand(fishIndexes.length)]]; // Gets the Fishes Image
        console.log(fishIndexes, sizes,size)
        return {
            x: rand(bounds.x), y: rand(bounds.y), // Positioning
            src: src.src, // Fish Image
            size: {width: size, height: size},
            name: src.name,
            vector: {x: (rand(6) + 1), y: rand(3)}, //Random Vector
            animation: 0
        }
    };

    const createPond = () => {
        let newFishes = [];

        for (let x = 0; x < fishCount; x++) {
            newFishes.push(createKoi());
        }
        setFishes(newFishes) // Updating the Fishes to be displayed
    };

    const scurryAway = (fish) => fish.vector.x = fish.vector.x < 0 ? -6 : 6;

    return (
            <div className={'canvas-wrapper'}>
                {fishes.map((fish, i) => <img key={'koi' + i} src={fish.src} alt={fish.name} title={fish.name}
                                                         width={`${fish.size.width}px`} height={`${fish.size.height}px`}
                                                         className={'koi-fish'} onClick={() => scurryAway(fish)}
                                                         style={{
                                                             position: 'absolute',
                                                             left: fish.x,
                                                             top: fish.y,
                                                             animation: (fish.animation >= 100) ? `${2 / Math.abs(fish.vector.x)}s ${(fish.vector.x > 0) ? 'swimRev' : 'swim'} infinite` : '1s fadeIn forwards'
                                                         }}/>)}
            </div>
        );

}

export default Fish;