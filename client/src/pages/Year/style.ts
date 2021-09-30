import styled from 'styled-components'

export const YearComponent = styled.div`
    height: calc(100vh - 30px);
`

interface YearBoxProps {
    backgroundColor: string
}

export const YearBox = styled.div<YearBoxProps>`
    width: 2.6vw;
    height: 3.3vh;
    line-height: 2.5;
    text-align: center;
    color:black;
    border:1px solid white;
    cursor: pointer;
    transition: background-color .2s;
    background-color: ${(props)=>props.backgroundColor};
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
        background-color: gray;
    }
`

export const YearDay = styled.div`
    width: 2.6vw;
    height: 3.3vh;
    line-height: 2.5;
    text-align: center;
    color:black !important;
    border:1px solid white;
    transition: background-color .2s;
`

export const YearRow = styled.div`
    display: flex;
    & div:first-child{
        color: red;
    }
    & div:last-child{
        color: rgb(61, 61, 255);
    }
`

export const YearTitle = styled.div`
color: red;
font-size: 30px;
`

export const YearWrapper = styled.div`
display: flex;
flex-flow: row wrap;
align-content: stretch;
`

export const MonthWrapper = styled.div`
margin-right: 10px;
height: 28vh;
margin-top: 20px;
width: 303px;
`

export const MonthTitle = styled.div`
font-weight: 600;
margin-bottom: 5px;
`