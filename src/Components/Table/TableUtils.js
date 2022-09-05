import React from 'react';
export const EmptyCell = () => <div className={'cell'}/>
export const RenderRow = ({array, row, cell, arrayTitles, arrayFunctions}) => {
    const hasCorrespondingFunction = (x,i) => {
            return x && x[i] && typeof x[i] === 'function' ? ({cursor: 'pointer'}) : {}
    }
    return (
        <div className={row ? row : 'row'}>
            {array.map((string,i)=> <p key={'Table'+string+i} title={arrayTitles ? arrayTitles[i] : string}
                                       style={hasCorrespondingFunction(arrayFunctions,i)}
                                       onClick={() => arrayFunctions && arrayFunctions[i] ? arrayFunctions[i]() : ()=> {}}
                                       className={cell ? cell : 'cell'}>
                {string}
            </p>)}
        </div>
    );
}
export const RenderRowExtended = ({array, children, row, cell, rowStyle}) => {
    return (
        <div className={row ? row : 'row'} style={rowStyle?rowStyle:{}}>
            {array.map((string,i)=> <p key={'Table'+string+i} className={cell ? cell : 'cell'}>
                {string}
            </p>)}
            {children}
        </div>
    );
}
export const ErrorRow = ({error}) => error !== "" && <p className='errorRow' >{error}</p>
export const rowStyle = (i) => {return {backgroundColor: i % 2 !== 0 ? '#3d3d3d00' : '#3d3d3d33'}};
