import React from 'react';

function Logo({ width = 40, height = 40 }) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="32" cy="32" r="30" stroke="#007bff" strokeWidth="4" />
            <text
                x="32"
                y="38"
                textAnchor="middle"
                fontSize="24"
                fill="#007bff"
                fontFamily="Arial, sans-serif"
                fontWeight="bold"
            >
                EV
            </text>
        </svg>
    );
}

export default Logo;
