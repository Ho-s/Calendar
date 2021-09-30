import { gql } from '@apollo/client';

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