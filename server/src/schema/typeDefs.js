import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Schedule {
    id: ID!
    title:String
    year: Int
    month: Int
    day: Int
    startHours: Int
    startMinutes: Int
    endHours: Int
    endMinutes: Int
    color:String
  }

  input ScheduleInput {
    title:String!
    year: Int!
    month: Int!
    day: Int!
    startHours: Int!
    startMinutes: Int!
    endHours: Int!
    endMinutes: Int!
    color:String!
  }

  type Query {
    getScheduels: [Schedule]
  }

  type Mutation {
    createSchedule(input: ScheduleInput!): Schedule!
  }
`

export default typeDefs