import React from 'react'
import './Footer.css'

class Footer extends React.Component {
    constructor(props){
        super(props)
        this.state = {}

    }

    render() {
        return (
          <div >
            <div className='footer'>
              &copy; {new Date().getFullYear()}{' '}
              <a href='/'>
								Casino
              </a>
            </div>
          </div>
        );
    }
}
export default Footer