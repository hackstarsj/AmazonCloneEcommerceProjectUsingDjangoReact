import React, {useState} from 'react'
const Image=(props)=>{
    const [loaded,setLoaded]=useState(false)

    const onImageLoad=()=>{
        setLoaded(true)
    }
    return <>
        {!loaded && <div className="shimmer" style={props.style}/>}
        {
            <img {...props} onLoad={onImageLoad}/>
        }
    </>
}

export default Image;