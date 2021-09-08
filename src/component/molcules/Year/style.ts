import styled from "styled-components";

export const YearComponent = styled.div`
    height: calc(100vh - 30px);
    width: 100%;
    padding-left: 14px;
    background-color: white;
`

export const YearBox = styled.div`
    width: 2.6vw;
    height: 3.3vh;
    line-height: 2.5;
    float: left;
    text-align: center;
    color:black;
    border:1px solid white;
    cursor: pointer;
    transition: background-color .5s;
    &:hover{
        background-color: green;
    }
    &.year-selected{
        color: skyblue;
    }
    &.year-grayed{
        color: #e9e9e9 !important;
        cursor: unset;
        background-color: transparent !important;
    }
    &.yearSelected{
        background-color: gray !important;
    }
`

export const YearDay = styled.div`
    width: 2.6vw;
    height: 3.3vh;
    line-height: 2.5;
    float: left;
    text-align: center;
    color:black;
    border:1px solid white;
    transition: background-color .5s;
`

export const YearRow = styled.div`
    &.year-box:first-child{
        color: red;
    }
    &.year-box:last-child{
        color: rgb(61, 61, 255);
    }
`