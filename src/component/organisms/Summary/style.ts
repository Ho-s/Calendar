import styled from "styled-components"

export const Summary = styled.div`
    background-color: #292726;
    width: 350px;
    color:white;
    height: calc(100vh - 300px);
    position: relative;
    &::-webkit-scrollbar-track {
        background-color: white;
        border-radius: 1px;
        box-shadow: inset 0px 0px 5px white;
    }
    &::-webkit-scrollbar {
        width: 1px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgb(199, 199, 199);
        border-radius: 1px;
        background-clip: padding-box;
        border: 2px solid transparent;
    }
`

export const LoadList = styled.div `
    padding: 20px;
    height: 670px;
    overflow-y: auto;
    overflow-x: hidden;
`

export const SummarySchedule = styled.div`
    margin-bottom: 15px;
    display: block;
    width: 100%;
    height: 1.7vh;
    position: relative ;

    &:hover button {
        display: block;
    }
`

export const SummaryScheduleButton = styled.button`
    background-image: url('https://user-images.githubusercontent.com/71132893/103125964-2e5e3580-46d0-11eb-9cdd-15ce0c5ca318.png');
    background-repeat: no-repeat;
    background-size: contain;
    width: 16px;
    height: 16px;
    border: 0;
    padding: 0;
    position: absolute;
    right: 85px;
    top:-0;
    cursor: pointer;
    background-color: transparent;
    display: none;
    filter: opacity(0.5) drop-shadow(0 0 0 white);
`

interface SummaryScheduleColorProps {
    backgroundColor: string
}

export const SummaryScheduleColor = styled.div<SummaryScheduleColorProps>`
background-color: ${(props)=>props.backgroundColor};
margin-top: 6px;
position: absolute;
left: 3px;
width: 10px;
border-radius: 10px;
height: 10px;
`

export const SummaryScheduleTitle = styled.div`
line-height: 1;
float: left;
font-size: 20px;
margin-left: 17px;
width: 11.6vw;
text-overflow: ellipsis;
overflow: hidden;
white-space: nowrap;
font-weight: 100;
color: white;
`

export const SummaryScheduleTime = styled.div`
line-height: 1.5;
position: absolute;
right: 40px;
overflow: noWrap;
font-size: 14px;
font-weight: 600;
color: gray;
`

export const NoSchedule = styled.div`
color: gray;
font-size: 15px;
`

interface DateProps {
    color:string
}

export const Date = styled.div<DateProps>`
color:${(props)=>props.color};
font-weight: 600;
font-size: 18px;
margin-bottom: 10px;
`

export const Title = styled.div`
font-size: 16px;
font-weight: 600;
color: black;
text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
margin-bottom: 15px;
`