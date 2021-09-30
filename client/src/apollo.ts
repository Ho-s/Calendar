import { ApolloClient,HttpLink,from, InMemoryCache } from '@apollo/client'

const errorLink = on

const link = from([
	errorLink,
	new HttpLink({uri: 'http://localhost:4000'})
])

const client = new ApolloClient({
	cache: new InMemoryCache(),
})

export default client