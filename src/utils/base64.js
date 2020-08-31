require('dotenv').config()

const { v4: uuidv4 } = require('uuid');
const base64Img = require("base64-img")

const baseURI = `${process.env.BASE_URI || localhost}:${process.env.PORT || 3000}`

const convertB64toImage = async (fileName, image, dest) => {
  try {
    _uuid = uuidv4()
    _image = image
    const type = fileType(fileName) || fileBase64(image) || 'jpg'
    const physicalPath = base64Img.imgSync(
      image,
      `src/public/images/${dest}`,
      _uuid
    )

    // `public/images/${dest}/${_uuid}.${type}`
    imgPath = baseURI.concat(`/public/images/${_uuid}.${type}`)
    return imgPath
  } catch (error) {
    throw error
  }
}

const fileType = fileName => {
  if (fileName) {
    let splitFileName = fileName.split(".")
    return splitFileName[splitFileName.length - 1]
  }
  return null
}

const fileBase64 = base64String => {
  if (base64String) {
    let data = base64String.split(',')[0].split(';')[0].split('/')[1] || null
    return data
  } return null
}

module.exports = {
  convertB64toImage,
}