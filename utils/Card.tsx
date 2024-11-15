import React from 'react'

const CardTemplate = ({className, color, value}:{className: string, color: string, value: string}) => {
    return (
        
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 350" className={className}>
                {/* <!-- Card background --> */}
                <rect x="10" y="10" width="230" height="330" rx="20" ry="20" fill={color} />

                {/* <!-- White oval --> */}
                <ellipse cx="125" cy="175" rx="100" ry="140" fill="white" stroke={color} strokeWidth="5" />

                {/* <!-- Main number 4 --> */}
                S<text x="125" y="240" fontFamily="Arial, sans-serif" fontSize="180" fontWeight="bold" textAnchor="middle" fill={color}>{value}</text>

                {/* <!-- Top-left number 4 --> */}
                <text x="30" y="50" fontFamily="Arial, sans-serif" fontSize="40" fontWeight="bold" fill="white">{value}</text>

                {/* <!-- Bottom-right number 4 (rotated and repositioned) --> */}
                <text x="220" y="340" fontFamily="Arial, sans-serif" fontSize="40" fontWeight="bold" fill="white" transform="rotate(180 220 320)">{value}</text>
            </svg>
        
    )
}

export default CardTemplate
