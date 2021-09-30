import { gql } from 'apollo-server';

export const CREATE_SCHEDULE = gql`
  mutaion CreateSchedule(input: ScheduleInput!){
    createSchedule(input: $input){
      id: ID!
      title:String
      year: Int
      month: Int
      day: Int
      startHours: Time
      startMinutes: Time
      endHours: Time
      endMinutes: Time
      color:String
    }
  }
`