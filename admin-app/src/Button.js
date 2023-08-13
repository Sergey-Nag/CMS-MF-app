import React, { useCallback, useEffect } from 'react';

const Button = props => {
    const onClick = () => {
        console.log('Click');
    }
    return <button onClick={onClick}>[Remote Button]</button>;
};

export default Button;