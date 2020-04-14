import { Router } from 'express'

const debug = require('debug')('api:middlewares')

const middlewares = Router()

function logResponseTime(req, res, next) {
	const startHrTime = process.hrtime()

	debug(req.path, req?.body?.operationName, 'fetching')

	res.on('finish', () => {
		const elapsedHrTime = process.hrtime(startHrTime)
		const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6

		debug(req.path, req?.body?.operationName, elapsedTimeInMs)
	})

	next()
}

middlewares.use(logResponseTime)

export default middlewares
