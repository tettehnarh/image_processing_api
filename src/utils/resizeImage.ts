import path from 'path'
import sharp from 'sharp'
import fs from 'fs-extra'

//image directory paths
const imagesDirectory: string = path.join(__dirname, '..', '..', 'images')
const thumbnailsDirectory: string = path.join(__dirname, '..', '..', 'thumbnails')

//function to make thumbnail directory
const createDirectory = (): void => {
  fs.mkdir(thumbnailsDirectory, (err) => {
    if (err) {
      console.log(`Error:${err}`)
    } else {
      console.log('Success')
    }
  })
}

//function to check if directory exists
const checkDirectory = (): void => {
  if (fs.existsSync(thumbnailsDirectory)) return
  else {
    createDirectory()
    return
  }
}

//function to check if image exists
const checkIfImageExist = async (
  filename: string,
  height: number,
  width: number
): Promise<boolean> => {
  const resizedImage: string = path.join(thumbnailsDirectory, `${filename}_${height}_${width}.jpg`)
  try {
    //check if thumbnails folder exists and create if not
    await fs.ensureDir(thumbnailsDirectory)
    //check if path exists
    const resizedImageExist: boolean = await fs.pathExists(resizedImage)
    return resizedImageExist
  } catch (error) {
    throw new Error('File does not exist')
  }
}

//Function to resize image
const imagesProcessor = async (
  filename: string,
  height: number,
  width: number
): Promise<boolean> => {
  const resizedImage: string = path.join(thumbnailsDirectory, `${filename}_${height}_${width}.jpg`)
  const originalImage: string = path.join(imagesDirectory, `${filename}.jpg`)
  try {
    checkDirectory()
    let status = false
    if (await checkIfImageExist(filename, height, width)) {
      status = true
    } else {
      await sharp(originalImage).resize({ height: height, width: width }).toFile(resizedImage)
      status = true
    }
    return status
  } catch (error) {
    //console.log('Error processing image')
    return false
  }
}

export default imagesProcessor
