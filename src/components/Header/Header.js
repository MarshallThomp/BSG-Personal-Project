import React from 'react'
import { connect } from 'react-redux'
import Navbar from '../Navbar/Navbar'
import dog from './../../dog-solid.svg'

function Header(props) {
    return (
        <div style={styles.header}>
            <div style={styles.bsg}>
                <img src={dog} alt="" id='logo' style={styles.logo} />
                { props.user ? null: <h1>BSG</h1>}
                <div style={styles.navbar}>
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

let styles = {
    bsg: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 0
    },

    logo: {
        height: 50,
        margin: 0,
        marginLeft: 30,
        marginRight: 20
    }
}