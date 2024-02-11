import fastify from "fastify"
import cookie from '@fastify/cookie'
import { createPoll } from './routes/create-polls'
import { getPoll } from "./routes/get-polls"
import { voteOnPoll } from "./routes/vote-on-poll"
import websocket from "@fastify/websocket"
import { pollResults } from "./ws/poll-results"

const app = fastify()

app.register(cookie, {
    secret: "app-polls-websocket",
    hook: 'onRequest',
})

app.register(websocket)

app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)
app.register(pollResults)

app.listen({ port:3333 }).then(() => {
    console.log('HTTP Server Running!')
}) 