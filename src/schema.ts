import { Resolver, Query } from 'type-graphql'

@Resolver()
class HelloResolver {
	@Query(() => String)
	hello(): string {
		return 'world'
	}
}

export const resolvers = [HelloResolver]
