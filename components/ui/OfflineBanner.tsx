import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const OfflineBanner = ({ className }: { className: string }) => {
    return (
        <div id='skull' className={className + ` flex flex-col items-center`}>
            <FontAwesomeIcon icon={faSkullCrossbones} className='text-8xl' style={{ color: "#000000"}} />
            <span className='text-xl text-black font-extrabold'>Offline</span>
        </div>
    )
}

export default OfflineBanner
