require('dotenv').config()

import 'reflect-metadata'

import { ApolloServer } from 'apollo-server-express'
import express, { Request, Response } from 'express'
import { buildSchema } from 'type-graphql'
import Debug from 'debug'
import { resolvers } from './schema'
import middlewares from './modules/middlewares'

import { logger } from './utils/logging'

const PORT = process.env.PORT || 4334

const debug = Debug('app')

async function main() {
	const schema = await buildSchema({
		resolvers,
	})

	const apolloServer = new ApolloServer({
		schema,
		context: async ({ req, res }: { req: Request; res: Response }) => {},
	})

	const app = express()

	app.use(middlewares)

	apolloServer.applyMiddleware({
		app,
		cors: {
			credentials: true,
			origin: true,
		},
	})

	debug('starting server')

	app.listen(PORT, () => {
		logger.info(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`)
	})
}

main()
