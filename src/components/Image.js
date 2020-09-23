import React, { useState, useEffect } from "react"

async function fetchImage(src, updateSrc) {
  // const image = await S3.getimage(src)
  updateSrc(src)
}

const Image = ({ src, ...props}) => {
  return src ? <img src={src} {...props} /> : null
}

export default Image
