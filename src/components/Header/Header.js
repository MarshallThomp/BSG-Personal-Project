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
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 20
    },

    bsg: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 0
    },

    logo: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-start ',
        height: 50,
        marginRight: 10
    },

    navbar: {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}