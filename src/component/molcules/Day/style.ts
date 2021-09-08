import styled from 'styled-components'

export const DayComponent = styled.div`
  width: 100%;
  position: relative;
`

export const DayLeft = styled.div`
  height: 100vh;
  width: 70px;
  float: left;
`

export const DayTable = styled.div`
  position: absolute;
  right: 50px;
  height: 900px;
  overflow-y: auto;
  overflow-x: hidden;
  @media screen and (max-width: 1550px) {
  & {
    display: none;
  }
}
`