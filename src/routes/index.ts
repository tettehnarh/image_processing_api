import express, { Router, Request, Response } from 'express'
import path from 'path'
import imagesProcessorRouter from './api/imagesProcessorRouter'

const router: Router = express.Router()

router.use('/api/images', express.static(path.join(__dirname, '..', '..', 'images')))

router.get('/', (req: Request, res: Response): void => {
  res.status(200).send('Welcome to the Image Processor')
  res.end()
})

router.use('/api/resize', imagesProcessorRouter)

router.all('/*', (req: Request, res: Response): void => {
  res.status(404).send(`${req.url} not found`)
  res.end()
})

export default router
