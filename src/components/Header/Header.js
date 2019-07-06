import React from 'react'
import { connect } from 'react-redux'
import Navbar from '../Navbar/Navbar'
import dog from './../../assets/dog.svg'
import './Header.css'

function Header(props) {
    return (
        <div className="header">
            <div className='bsg' >
                {props.user ?
                    <img src={dog} alt="" className='logo' />
                    : (<h1 className="mainPageHeader">
                        <img src={dog} alt="" className='logo' />
                        BSG
                </h1>)}
                <div>
                    {props.user && <Navbar />}
                </div>
            </div>
        </div>
    )
}

let mapStateToProps = state => {
    let { data: user } = state.user
    return { user }
}

export default connect(mapStateToProps)(Header)