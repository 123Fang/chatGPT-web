import express from 'express'
import type { ChatContext, ChatMessage } from './chatgpt'
import { chatReply, chatReplyProcess } from './chatgpt'

const app = express()
const router = express.Router()

app.use(express.static('public'))
app.use(express.json())

app.all('*', (_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})

router.post('/chat', async (req, res) => {
  try {
    const { prompt, options = {} } = req.body as { prompt: string; options?: ChatContext }
    const response = await chatReply(prompt, options)
    res.send(response)
  }
  catch (error) {
    res.send(error)
  }
})

router.post('/chat-process', async (req, res) => {
  res.setHeader('Content-type', 'application/octet-stream')

  try {
    const { prompt, options = {} } = req.body as { prompt: string; options?: ChatContext }
    await chatReplyProcess(prompt, options, (chat: ChatMessage) => {
      res.write(JSON.stringify(chat))
    })
  }
  catch (error) {
    res.write(JSON.stringify(error))
  }
  finally {
    res.end()
  }
})


app.use('', router)
app.use('/api', router)

app.listen(3002, () => globalThis.console.log('Server is running on port 3002'))
