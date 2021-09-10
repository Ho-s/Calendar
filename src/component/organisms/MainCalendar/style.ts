import styled from 'styled-components'

export const MainCalendar = styled.div`
    background-color: white;
    width: calc(100vw - 350px);
    height: 100vh;
`

export const MainCalendarHead = styled.div`
    padding:14px;
    height: 30px;
    position: relative;
    display: flex;
    min-width: 620px;
    & div:first-child{
    cursor: pointer;
    font-weight: 600;
    background-color: rgb(201, 201, 201);
    border:1px solid white;
    text-align: center;
    height: 28px;
    width: 80px;
    border-radius: 7px;
    display: inline-block;
    }
    & span {
        cursor: pointer;
    font-weight: 600;
    background-color: rgb(201, 201, 201);
    border:1px solid white;
    text-align: center;
    height: 28px;
    width: 80px;
    border-radius: 7px;
    display: inline-block;
    }
`
export const MainCalendarHeadMid = styled.div`
    margin:0 auto;
    line-height: 1.7;
    &.clicked{
    color: white;
    transition: background-color .5s, color .5s;
    background-color: red !important;
}
`