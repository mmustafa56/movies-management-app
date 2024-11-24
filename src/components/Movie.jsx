import React from 'react';
import { useParams } from 'react-router-dom';

const Video = () => {

const {trackId} = useParams()
console.log(trackId)
  return (
    <div>
        
    </div>
  )
}

export default Video