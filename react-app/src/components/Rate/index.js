import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const RateStar = () => {
    const colors = {
        'orange': "#f15c00",
        'grey': "#a9a9a9"
    }

    const stars = Array(5).fill(0);
    const [ currValue, setCurrValue ] = useState(0);
    const [ hoverValue, setHoverValue ] = useState(undefined);

    const handleClick = value => {
        setCurrValue(value)
    };

    const handleMouseOver = value => {
        setHoverValue(value)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    };

    return (
        <div style={styles.container}>
            <div style={styles.stars}>
                {stars.map((_, index) => (
                    <FaStar 
                        key={index}
                        size={24}
                        style={{
                            marginRight: 10,
                            cursor: 'pointer'
                        }}
                        color={(hoverValue || currValue) > index ? colors.orange : colors.grey}
                        onClick={() => handleClick(index + 1)}
                        onMouseOver={() => handleMouseOver(index + 1)}
                        onMouseLeave={handleMouseLeave}
                        ></FaStar>
                ))}
            </div>
        </div>
    )
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}

export default RateStar;
