import React from 'react';
import './TextAnimation.css'

export type TextAnimationProps = {
  textToAnimate: string,
  delayInSeconds: number,
  className?: string
};
const TextAnimation = ({textToAnimate, delayInSeconds, className=''}: TextAnimationProps) => {

  const textSplitUp = textToAnimate.split('');
  const randomInt = (maxExclusive: number) => {
    return Math.floor(Math.random() * maxExclusive)
  }


  return <h2 className={`TextAnimation ${className}`}>
    {textSplitUp.map((character, index) =>
      <span key={character + index}
            style={{
              animation: `1s ${(index * .05) +  delayInSeconds}s fadeInBetter ease-out forwards`,
            }}>
      {character}
    </span>)}
  </h2>
};
export default TextAnimation;