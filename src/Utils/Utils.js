import React from 'react'
import './Utils.css'

export function getColor(type) {
    let color = '';
    switch (type) {
        case 'Daily':
            color = '#8888ff';
            break;
        case 'Weekly':
            color = '#88ff88';
            break;
        case 'Monthly':
            color = '#ff8888';
            break;
        case 'Quarterly':
            color = '#88ffff';
            break;
        case 'Yearly':
            color = '#ff88ff';
            break;
        case '5-Year':
            color = '#ffff88';
            break;
        default:
            color = '#888888';
            break;
    }
    return {backgroundColor: color}
}
export function Hyph() {
    return <span className='Hyph'>{' - '}</span>
}

export function Button({ className, ...props }) {
    return <button className={['Button', className].join(' ')} {...props} />
}

export function Textarea({ className, ...props }) {
    return (
        <textarea className={['Textarea', className].join(' ')} {...props} />
    )
}

export function Input({ className, ...props }) {
    return (
        <input className={['Input', className].join(' ')} {...props} />
    )
}

export function Required({ className, ...props }) {
    return (
        <span className={['Required', className].join(' ')} {...props}>
      &#42;
    </span>
    )
}

export function Section({ className, list, ...props }) {
    const classes = [
        'Section',
        list && 'Section--list',
        className,
    ].filter(Boolean).join(' ')
    return (
        <section className={classes} {...props} />
    )
}