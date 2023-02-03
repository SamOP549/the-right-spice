import React from 'react'
import Screen0 from './Screen0'
import Screen1 from './Screen1'

const ImageSlider = (props) => {
    if (props.screen === 0) {
        return <Screen0 {...props} />
    }
    else if (props.screen === 1) {
        return <Screen1 {...props} />
    }
}

export default ImageSlider