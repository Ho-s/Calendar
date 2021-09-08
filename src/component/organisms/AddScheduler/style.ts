import styled from 'styled-components'

export const Scheduler = styled.div`
    top:-40px;
    left:350px;
    width: 344px;
    background-color: white;
    border-radius: 4px;
    border: 2px solid #e9e9e9;
    margin: 1px;
`

export const SchedulerHead = styled.div`
    width: 90%;
    height: 40px;
    padding: 5%;
    border-bottom: 1px solid #e9e9e9;
    position: relative;
    & input{
    padding: 0;
    outline: 0;
    height: 100%;
    width: 100%;
    font-size: 20px;
    font-weight: 600;
    float: left;
    text-decoration: none;
    transition: color .4s, background-color .4s;
}
`

export const SchedulerBody = styled.div`
    width: 90%;
    padding: 5%;
    color: black;
    font-weight: 600;
    & input{
    border: 0;
    outline: 0;
}
`

export const SchedulerBodyTime = styled.div`
    height: 37px;
    margin-bottom: 20px;
    & input:nth-child(1),
    & input:nth-child(2),
    & input:nth-child(4),
    & input:nth-child(5){
        width: 30px;
    }
    & input:nth-child(3){
        width: 50px;
        margin-right: 20px;
    }
`

export const SchedulerTimeError = styled.div`
    position: relative;
    font-size: 17px;
    top: 12px;
    left: 104px;
    border:1px solid red;
    z-index: 4;
    color: red;
    background-color: white;
    display: inline-block;
    &::after{
    content: '';
    width: 0;
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 10px solid transparent;
    border-bottom-color: red;
}
`

export const SchedulerDayError = styled.div`
    position: relative;
    font-size: 17px;
    top: 9px;
    left: 50px;
    border:1px solid red;
    z-index: 4;
    color: red;
    background-color: white;
    display: inline-block;
    &::after{
    content: '';
    width: 0;
    position: absolute;
    bottom: 100%;
    left: 22%;
    transform: translateX(-50%);
    border: 10px solid transparent;
    border-bottom-color: red;
}
`

export const SchedulerBodyColor = styled.div`
    height: 40px;
    & input {
        height: 40px;
        width: 40px;
        margin:0 19px;
        cursor: pointer;
        float: left;
        padding: 0;
    }
`

export const SchedulerFoot = styled.div`
    width: 100%;
    & button {
        outline: none;
        border: 0;
        padding: 0;
        color:white;
        border-radius: 14px;
        font-size: 20px;
        width: 250px;
        height: 50px;
        margin:20px 49px;
        cursor: pointer;
        transition: background-color .4s;
        &:hover{
            background-color:#292726 !important;
            border: 1px solid gray;
        }
    }
`
