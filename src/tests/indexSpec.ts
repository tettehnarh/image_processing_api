import supertest from 'supertest'
import fs from 'fs'
import path from 'path'
import app from '../index'
import imagesProcessor from '../utils/resizeImage'

// create a request object
const request = supertest(app)

describe('Test endpoint response', () => {
  it('Gets / endpoint', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })

  it('Gets /api/images/fjord.jpg endpoint', async () => {
    const response = await request.get('/api/images/fjord.jpg')
    expect(response.status).toBe(200)
  })
})

describe('Test image processing api', () => {
  it('Gets /api/resize endpoint with a valid query', async () => {
    const response = await request.get('/api/resize?filename=fjord&height=500&width=500')
    expect(response.status).toBe(200)
  })

  it('Gets /api/resize endpoint with an invalid query', async () => {
    const response = await request.get('/api/resize?filename=fjord&height=0&width=500')
    expect(response.status).toBe(400)
  })

  it('Images by second time properties should exist', async () => {
    const response = await request.get('/api/resize?filename=fjord&height=500&width=500')
    expect(response.status).toBe(200)
  })

  it('Images by first time properties should not exist', () => {
    const thumbnailsDirectory: string = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'thumbnails',
      'fjord_200_200.jpg'
    )
    expect(fs.existsSync(thumbnailsDirectory)).toBeFalsy()
  })
})

describe('Test image processing functionality with valid name', () => {
  it('Should return true', async () => {
    const name = 'fjord'
    const height = 200
    const width = 200
    const resizeFunction: boolean = await imagesProcessor(name, height, width)
    expect(resizeFunction).toEqual(true)
  })
})

describe('Test image processing functionality with invalid name', () => {
  it('Should return false', async () => {
    const filename = 'fjor'
    const height = 200
    const width = 200
    const resizeFunction: boolean = await imagesProcessor(filename, height, width)
    expect(resizeFunction).toEqual(false)
  })
})