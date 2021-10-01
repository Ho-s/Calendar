import { gql } from '@apollo/client'

export const CREATE_SCHEDULE = gql`
  mutation CreateSchedule($input: ScheduleInput!) {
    createSchedule(input: $input) {
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

export const Example = gql`
mutation MutationExampleMutation {
  mutationExample {
    message
  }
}
`