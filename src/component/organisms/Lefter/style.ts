import styled from 'styled-components'
interface GetClicked {
    clicked: boolean
}

export const LeftBar = styled.nav<GetClicked>`
    width: ${(props) => (props.clicked ? '350px' : '50px')};
    padding: ${(props) => (props.clicked ? '0' : '10px')};
    transition: all .2s;
    z-index: 99;
`

export const TitleWrapper = styled.div<GetClicked>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${(props) => (props.clicked ? '10px 10px 0' : '')};
    & a{
        display: ${(props) => (props.clicked ? 'flex' : 'none')};
        text-decoration: none;
    }
`

export const LinkWrapper = styled.div``

export const Logo = styled.div`
    background-image: url('https://user-images.githubusercontent.com/71132893/134448931-a8433a53-aea9-4fc3-bf99-daba04298050.png');
    background-size: contain;
    background-repeat: no-repeat;
    width: 38px;
    height: 38px;
`

export const Title = styled.div`
    color: red;
    font-size: 35px;
    font-weight: 600;
    margin: 1.5px 10px;
`

export const Hamburger = styled.div<GetClicked>`
    cursor: pointer;
    &:hover span{
        background-color: #cc0001;
    }
    & span:first-child {
        transform: ${(props)=>(props.clicked ? 'rotate(-45deg) translate(-7px, 7px)' : '')};
        margin-bottom: .4rem;
    }
    & span:nth-child(2) {
        margin-bottom: .4rem;
        opacity: ${(props)=>(props.clicked ? '0' : '')};
    }
    & span:last-child {
        transform: ${(props)=>(props.clicked ? 'rotate(45deg) translate(-7px, -7px)' : '')};
    }
`

export const HamburgerBars = styled.span`
    cursor: pointer;
    display: block;
    width: 3rem;
    height: 0.24rem;
    background-color: black;
    transition: all 0.4s;
    background-color: white;
`