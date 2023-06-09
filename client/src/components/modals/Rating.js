import React, { useState, useEffect } from 'react';

const Rating = ({ initialRating, onChange }) => {
    const [rating, setRating] = useState(initialRating);

    useEffect(() => {
        setRating(initialRating);
    }, [initialRating]);

    const handleClick = (newRating) => {
        setRating(newRating);
        onChange(newRating);
    };

    return (
        <div>
            {[1, 2, 3, 4, 5].map((value) => (
                <span
                    key={value}
                    onClick={() => handleClick(value)}
                    style={{ fontSize: 30, cursor: 'pointer', color: value <= rating ? 'gold' : 'gray' }}
                >
                    &#9733;
                </span>
            ))}
        </div>
    );
};

export default Rating;
