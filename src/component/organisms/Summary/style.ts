import styled from 'styled-components'

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
    & button {
        background-image: url(https://user-images.githubusercontent.com/71132893/103125964-2e5e3580-46d0-11eb-9cdd-15ce0c5ca318.png);
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
    }

    &:hover button {
        display: block;
    }
`