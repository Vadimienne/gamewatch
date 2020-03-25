import React from 'react';


function Svg(props) {
    const { icon, className } = props
    let classes = `svg-icon ${className}`;
    return (
        <>
            <div className={classes} dangerouslySetInnerHTML={{ __html: icon }} />
        </>
    );
}

Svg.propTypes = {};

export default Svg;