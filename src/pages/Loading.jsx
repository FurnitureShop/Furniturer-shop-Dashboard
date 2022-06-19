import React from 'react'

const loadingIcon = require("../assets/loadingIndicator.svg")

const Loading = () => {
    return (
        <div className='bg-white opacity-70'>
            <p>Loading</p>
            <img src={loadingIcon} alt={"loading-indicator"} />
        </div>
    )
}

export default Loading