import { ApolloClient,HttpLink,from, InMemoryCache } from '@apollo/client'
import {onError} from '@apollo/client/link/error'

const errorLink = onError(({ graphQLErrors, networkError}) =>{
	if(graphQLErrors){
		graphQLErrors.map(({message, locations, path})=>{
			alert(`Graphql error ${message}`)
		})
	}
})

// 여기서 4000의 데이터를 받거나 다른 url의 데이터를 받거나
const link = from([
	errorLink,
	new HttpLink({uri: 'http://localhost:4000'})
])

const client = new ApolloClient({
	link,
	cache: new InMemoryCache(),
})

export default client