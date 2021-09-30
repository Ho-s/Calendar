import { ApolloClient,HttpLink,from, InMemoryCache } from '@apollo/client'
import {onError} from '@apollo/client/link/error'

const errorLink = onError(({ graphQLErrors, networkError}) =>{
	if(graphQLErrors){
		graphQLErrors.map(({message, locations, path})=>{
			alert(`Graphql error ${message}`)
		})
	}
})

const link = from([
	errorLink,
	new HttpLink({uri: 'http://localhost:4000'})
])

const client = new ApolloClient({
	cache: new InMemoryCache(),
})

export default client