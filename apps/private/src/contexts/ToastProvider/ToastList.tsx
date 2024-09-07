import React from 'react'
import {CSSProperties} from "react";
import ToastComponent, {ToastStateType} from "./ToastComponent";


export type ToastPosition = 'top-left' | 'top-center' | 'top-right' |
  'center-left' | 'center' | 'center-right' |
  'bottom-left' | 'bottom-center' | 'bottom-right'

const createPositionStyles = (
  vertical: 'top' | 'center' | 'bottom',
  horizontal: 'left' | 'center' | 'right'
): CSSProperties => {
  const styles: CSSProperties = {};
  const distanceFromBorder = '2rem';

  // Handle vertical positioning
  if (vertical === 'top') styles.top = distanceFromBorder;
  else if (vertical === 'bottom') styles.bottom = distanceFromBorder;
  else {
    styles.top = '50%'
    styles.transform = 'translateY(-50%)';
  }

  // Handle horizontal positioning
  if (horizontal === 'left') styles.left = distanceFromBorder;
  else if (horizontal === 'right') styles.right = distanceFromBorder;
  else {
    styles.left = '50%';
    styles.transform = styles.transform
      ? `${styles.transform} translateX(-50%)`
      : 'translateX(-50%)';
  }

  return styles;
};

const ToastPositionStyles: Record<ToastPosition, CSSProperties> = {
  'top-left': createPositionStyles('top', 'left'),
  'top-center': createPositionStyles('top', 'center'),
  'top-right': createPositionStyles('top', 'right'),

  'center-left': createPositionStyles('center', 'left'),
  'center': createPositionStyles('center', 'center'),
  'center-right': createPositionStyles('center', 'right'),

  'bottom-left': createPositionStyles('bottom', 'left'),
  'bottom-center': createPositionStyles('bottom', 'center'),
  'bottom-right': createPositionStyles('bottom', 'right'),
};

type ToastListProps = {
  position: ToastPosition,
  toastList: ToastStateType[],
  handleClose: (id: string) => void
}

const ToastList = ({position, handleClose, toastList}: ToastListProps) => {


  return <div style={ToastPositionStyles[position]} className={"ToastList"}>
    {toastList.map((currentToast) =>
      <React.Fragment key={currentToast.id}>
        <ToastComponent handleClose={handleClose} {...currentToast}/>
      </React.Fragment>
)}
</div>
}
export default ToastList