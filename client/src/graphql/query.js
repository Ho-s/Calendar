import { gql } from 'apollo-server';

export const GET_SCHEDULES = gql`
  query {
    getScheduels {
      id
      title
      year
      month
      day
      startHours
      startMinutes
      endHours
      endMinutes
      color
    }
  } 
`