import React, { useState } from 'react'
import QrReader from 'react-qr-scanner'

export default function QRCode (){
  const [result,setResult]=useState(() => '')
 const handleScan=(data)=>{
   setResult(data)
    console.log(data);
  }
  const handleError=(err)=>{
    console.error(err)
  }
  
    const previewStyle = {
      height: 240,
      width: 320,
    }

    return(
      <div>
        <QrReader
          delay={100}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
          />
        <p>{result}</p>
      </div>
    )
  
}