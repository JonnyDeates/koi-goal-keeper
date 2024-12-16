import {ReactNode} from "react";
import './HorizontalSlide.css'
type HorizontalSlideProps = {
  startAmount: number,
  bufferAmount: number,
  scrolledAmount: number,
  children: ReactNode
}

const HorizontalSlide = ({bufferAmount, scrolledAmount, startAmount, children}: HorizontalSlideProps) => {

  const getTranslationAmount = () => {

    if (scrolledAmount / 2 - startAmount <= 50) {
      return scrolledAmount / 2 - startAmount;
    }
    if (scrolledAmount / 2 - startAmount <= bufferAmount)
      return 50;
    return Math.max(scrolledAmount / 2 - startAmount - bufferAmount, 50)
  }

  return <div className={"HorizontalSlide"} style={{translate: `${getTranslationAmount()}% 0`}}>
    <div className={'HorizontalBox'}>
      {children}
    </div>
  </div>


}
export default HorizontalSlide;