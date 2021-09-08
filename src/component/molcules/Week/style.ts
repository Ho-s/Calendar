import styled from "styled-components";

export const WeekComponent = styled.div`
    height: calc(100vh - 30px);
    width: 100%;
    overflow: auto;
    position: relative;
`

export const WeekLeft = styled.div`
    height: 100vh;
    width: 70px;
    float: left;
`

export const WeekBox = styled.div`
    float: left;
    font-weight: 600;
    color:black;
    transition: background-color .5s;
    font-size: 26px;
    width: calc((100vw - 430px) / 7);
`

export const WeekDay = styled.div`
    float: left;
    font-weight: 600;
    color: #e9e9e9;
    width: calc((100vw - 430px) / 7);
    &.week-selected span{
        background-color: skyblue;
        color: white;
        border-radius: 60px;
    }
    &.week-grayed{
        color: #e9e9e9 !important;
        cursor: unset;
        background-color: transparent !important;
    }
`




