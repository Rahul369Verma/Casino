import React from 'react'
import { Button, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    paper: {
      position: 'absolute',
      width: 200,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  });


class Login extends React.Component {
    constructor(props){
        super(props)
        // const token = localStorage.getItem("token")
        // var isSignin = true
        // if(token == null){
        	// isSignin = false
        // }
        this.state = { isSignin: false, name: null, errMess:''}

    }


    getName = (e) => {
        this.setState({ name: e.target.value })
    }
    formSubmit = (e) => {
        e.preventDefault();
        if(this.state.name === null){
            return(null)
        }
        this.props.loginFun(this.state.name)

    }
    render() {
        const {classes} = this.props
        return (
            <div className={classes.paper}>
            <form className="form" onSubmit={this.formSubmit}>
              <div style={{paddingBottom: "10px"}}>
                <TextField id="standard-basic" label="Standard" type="text"
                value={this.state.name} onChange={this.getName} />
              </div>
              <Button variant="contained" size="small"  color="primary" type="submit">
                Login
              </Button>
            </form>
          </div>
        );
    }
}
export default withStyles(styles, {withTheme: true})(Login)