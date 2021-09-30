import { gql } from 'apollo-server';

export const CREATE_SCHEDULE = gql`
  mutaion createUser(
    $title:String
    $year: Int
    $month: Int
    $day: Int
    $startHours: Int
    $startMinutes: Int
    $endHours: Int
    $endMinutes: Int
    $color:String
    ){
    createSchedule(
      title:$title
      year: $year
      month: $month
      day: $day
      startHours: $startHours
      startMinutes: $startMinutes
      endHours: $endHours
      endMinutes: $endMinutes
      color:$color
      ){
        id
    }
  }
`