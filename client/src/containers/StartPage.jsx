import React from 'react';

const StartPage = ({setPlayer}) => {
    return (
        <div className='start'>
            <div>Choose Side</div>
            <div>
                <button className='button' onClick={() => setPlayer('w')}>White</button>
                <button className='button' onClick={() => setPlayer('b')}>Black</button>
                <button className='button' onClick={() => setPlayer(Math.random() < 0.5 ? 'w' : 'b')}>Random</button>
            </div>
        </div>
    );
};

export default StartPage;