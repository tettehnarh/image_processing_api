import express, { Application } from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import router from './routes'
dotenv.config()

const PORT = process.env.PORT || 3000

// create an instance server
const app: Application = express()

// HTTP request logger middleware
app.use(morgan('short'))

// add routing to paths
app.use(router)

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at: http://localhost:${PORT}`)
})

export default app
