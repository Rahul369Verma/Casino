import React from 'react'
import { Card, CardActions, CardContent, Button, Typography, Grid } from "@material-ui/core"
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    paper: {
      position: 'absolute',
      width: 900,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
		root: {
			minWidth: 275,
		},
		bullet: {
			display: 'inline-block',
			margin: '0 2px',
			transform: 'scale(0.8)',
		},
		title: {
			fontSize: 14,
		},
		first: {
			padding: "50px"
		},
		second: {
			padding: "39.5px"
		},
		pos: {
			marginBottom: 12,
		},
  });

class ModalCasino extends React.Component {
    constructor(props){
        super(props)
		
        this.state = { 
				id: [],
				slot1: null,
				slot2: null,
				slot3: null,
				time: null,
				minus: null,
				add: null
			}
    }

		checkBalance = () => {
			if(this.props.balance < 1){
				return(null)
			}else{
				return(
					<Button variant="contained"  color="primary" onClick={this.random}>
						First
					</Button>
				)
			}
		}

// date-feb-year 1:20:20 am
    random = () => {
			this.setState({ 
				slot1: (Math.floor(Math.random() * 10)),
				slot2: (Math.floor(Math.random() * 10)),
				slot3: (Math.floor(Math.random() * 10)),
				time: new Intl.DateTimeFormat('en-IN',{day: 'numeric', month: 'short', year:'numeric', hour: 'numeric', minute:'numeric', second:'numeric', hour12:true}).format(new Date())	
			},() => {
					const {slot1, slot2, slot3} = this.state
					if((slot1 === slot2 === slot3) || (slot1 === 1 && slot2 === 1 && slot3 === 2) || (slot1 === 1 && slot2 === 2 && slot3 === 2)){
						this.setState({minus: 0, add: 5},() => {
							this.props.callArgu(this.state.slot1, this.state.slot2, this.state.slot3, this.state.time,this.state.minus, this.state.add)
						})
					}else if(slot1 === 1 && slot2 === 2 && slot3 === 3){
						this.setState({minus: 0, add: 0},() => {
							this.props.callArgu(this.state.slot1, this.state.slot2, this.state.slot3, this.state.time,this.state.minus, this.state.add)
						})
					}else if(slot1 === 7 && slot2 === 7 && slot3 === 7){
						this.setState({minus: 0, add: 10},() => {
							this.props.callArgu(this.state.slot1, this.state.slot2, this.state.slot3, this.state.time,this.state.minus, this.state.add)
						})
					}else{
						this.setState({minus: 1, add: 0},() => {
							this.props.callArgu(this.state.slot1, this.state.slot2, this.state.slot3, this.state.time,this.state.minus, this.state.add)
						})
					}
				})
    }

		seven = () => {
			this.setState({
				slot1: 7,
				slot2: 7,
				slot3: 7,
				minus: 0,
				add: 10,
				time: new Intl.DateTimeFormat('en-IN',{day: 'numeric', month: 'short', year:'numeric', hour: 'numeric', minute:'numeric', second:'numeric', hour12:true}).format(new Date())	
				},() => {
					this.props.callArgu(this.state.slot1, this.state.slot2, this.state.slot3, this.state.time,this.state.minus, this.state.add)
				})
		}


    render() {
			
        const {classes} = this.props
				const { slot1, slot2, slot3 } = this.state

        return (
          <div className={` ${classes.paper}`}>
						<Grid container spacing={24}>
							<Grid item md={4}>						
								<Card className={classes.root}>
									<CardContent>
										<Typography className={classes.title} color="textSecondary" gutterBottom>
											Press First Button To Play 
										</Typography>
										<Typography className={classes.first} color="textSecondary" gutterBottom>
											{slot1}
										</Typography>
									</CardContent>
									<CardActions>
										{this.checkBalance()}
									</CardActions>
								</Card>
							</Grid>
							<Grid item md={4}>	
								<Card className={classes.root}>
									<CardContent>
										<Typography className={classes.title} color="textSecondary" gutterBottom>
											Press Second To Debugging for 777 and plus $10 
										</Typography>
										<Typography className={classes.second} color="textSecondary" gutterBottom>
											{slot2}
										</Typography>
									</CardContent>
									<CardActions>
										<Button variant="contained"  color="primary" onClick={this.seven}>
											Debugging
										</Button>
									</CardActions>
								</Card>
							</Grid>	
							<Grid item md={4}>	
								<Card className={classes.root}>
									<CardContent>
										<Typography className={classes.title} color="textSecondary" gutterBottom>
											Press Third Button To Close Popup 
										</Typography>
										<Typography className={classes.first} color="textSecondary" gutterBottom>
											{slot3}
										</Typography>
									</CardContent>
									<CardActions>
										<Button variant="contained"  color="primary" onClick={this.props.closeCall}>
											Close
										</Button>
									</CardActions>
								</Card>
							</Grid>
						</Grid>
          </div>
        );
    }
}
export default withStyles(styles, {withTheme: true})(ModalCasino)