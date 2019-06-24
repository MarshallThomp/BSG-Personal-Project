import React from 'react'
import { connect} from 'react-redux'

import { Link } from 'react-router-dom'
import { logout } from '../redux/reducers/users'

function Header(props) {
    return(
        <div>
            Header
            <div>
                { props.user && <Link to="/welcomePage" onClick={props.logout}>
                    <button>Logout</button>
                </Link>}
            </div>
        </div>
    )
}

let mapStateToProps = state => {
    let { data: user } = state.user
    return { user }
}

export default connect(mapStateToProps, { logout })(Header)