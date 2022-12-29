import express, { Router, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import imagesProcessor from '../../utils/resizeImage'

//image directory path
const thumbnailsDirectory: string = path.join(__dirname, '..', '..', '..', 'thumbnails')

const imagesProcessorRouter: Router = express.Router()

imagesProcessorRouter.get('/', async (req: Request, res: Response): Promise<void> => {
  // array of existing images in server
  const images: string[] = [
    'encenadaport',
    'fjord',
    'icelandwaterfall',
    'palmtunnel',
    'santamonica'
  ]

  const height: number = parseInt(req.query.height as string) 
  const width: number = parseInt(req.query.width as string)
  const fullImageName: string = req.query.filename as string

  //Validate image parameter
  if (!images.includes(fullImageName)) {
    res.status(400).send('File name does not exist. Enter correct file name of image')
    return
  } else if (Number.isNaN(height)) {
    res.status(400).send('Invalid height value. Please enter a positve numerical value for height')
    return
  } else if (!height || height <= 0) {
    res.status(400).send('Please enter a positve numerical value for height greater than 0')
    return
  }
  else if (Number.isNaN(width)) {
    res.status(400).send('Invalid width value. Please enter a positve numerical value for width')
    return
  }
  else if (!width || width <= 0) {
    res.status(400).send('Please enter a positve numerical value for width grater than 0')
    res.end()
  } else {
    try {
      if (height && width && fullImageName) {
        if (await imagesProcessor(fullImageName, height, width)) {
          const thumbImage: string = path.join(
            thumbnailsDirectory,
            `${fullImageName}_${height}_${width}.jpg`
          )
          const thumbImageContent: Buffer = fs.readFileSync(thumbImage, { flag: 'r' })
          res.status(200).contentType('jpg')
          res.write(thumbImageContent)
          res.end()
        } else {
          res.status(500).send('Error occured while processing image ')
          res.end()
        }
      }
    } catch (error) {
      res.status(500)
      res.end()
    }
  }
})

export default imagesProcessorRouter
