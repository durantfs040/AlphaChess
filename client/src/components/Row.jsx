import React from 'react';

const Row = ({positions}) => {
    return (
        <div style={{display: 'flex', height: '20px'}}>
            {positions.map((position) => <div style={{border: '1px solid brown', padding: '2px'}}>{position}</div>)}
        </div>
    );
};

export default Row;