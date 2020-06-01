import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Color = props => {
    return (
        <div className="color">
        <div 
            className="color-block" 
            style={{
                background: props.displayColor
            }}
            onMouseEnter={() => props.setBackgroundColor(props.color[1])}
        ></div>
            {props.color.map(color => (
                <CopyToClipboard text={color}><div className="color-text">{color}</div></CopyToClipboard>
            ))}
        </div>
    );
}

export default Color;
