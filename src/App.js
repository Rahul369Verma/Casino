import React from 'react';
import Login from './components/Login.js';
import Footer from './components/Footer.js'
import ModalCasino from './components/ModalCasino.js'
import { withStyles } from '@material-ui/core/styles';
import { Button, AppBar, Toolbar, Typography, MenuItem, Menu, Avatar, Modal, TableSortLabel, 
  Container, Table, TableBody, TableCell, TableContainer,TableHead, TableRow, Paper } from '@material-ui/core';

import './App.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  balance: {
    align: "right"
  },
  table: {
    minWidth: 650,
  },
});


class App extends React.Component{
  constructor(props){
    super(props)
    
    var balanceValue = "99.99"
    this.state = {
      balance: [balanceValue],
      name: "Guest",
      anchorEl: null,
      modalOpen: false,
      modalCasinoOpen: false,
      firstLetter: "Gst",
      sort: "asc",
      id: [],
      slot1: [],
      slot2: [],
      slot3: [],
      time: [],
    } 
  }

    getLocalStorage = () => {
      if(window.localStorage.getItem(this.state.name)){
        const user = JSON.parse(window.localStorage.getItem(this.state.name))
        this.setState({
          id: user.id,
          slot1: user.slot1,
          slot2: user.slot2,
          slot3: user.slot3,
          time: user.time,
          balance: user.balance
        })
      }else{
        this.setState({
          id: [],
          slot1: [],
          slot2: [],
          slot3: [],
          time: [],
          balance: ["99.99"]
        })
      }
    }

  handleModalCasinoOpen = () => {
    this.setState({ modalCasinoOpen: true });
  };

  handleModalCasinoClose = () => {
    this.setState({ modalCasinoOpen: false });
  };

  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  handleMenuClick = (e) => {
    this.setState({ anchorE1: e.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorE1: null });
  };

  handleLogout = () => {
    this.setState({ name: "Guest", firstLetter: "Gst" },() => {
      this.getLocalStorage()
    })
    this.handleMenuClose()
  }

  handleSortIcon = () => {
    if(this.state.sort === "asc"){
      this.setState({sort: "desc"})
    }else{
      this.setState({sort: "asc"})
    }
  }

  setLogin = (name) => {
    const letter = name.substr(0,1)
    this.setState({ name: name, firstLetter: letter },() =>{
      this.getLocalStorage()
    })
    this.handleModalClose()
    this.handleMenuClose()
  }

  loginInfo = () => {
    if(this.state.name === "Guest"){
      return(<MenuItem onClick={this.handleModalOpen}>Login</MenuItem>)
    }else{
      return(<MenuItem onClick={this.handleLogout}>Logout</MenuItem>)
    }
  }


  checkSort = (id,slot1,slot2,slot3,time,balance) => {
    if(this.state.sort === "asc"){
      return(
        id.map((value, index) => (
          <TableRow>
            <TableCell component="th" scope="value">
              {value}
            </TableCell>
            <TableCell>
              {slot1[index]}
            </TableCell>
            <TableCell>
              {slot2[index]}
            </TableCell>
            <TableCell>
              {slot3[index]}
            </TableCell>
            <TableCell>
              {time[index]}
            </TableCell>
            <TableCell>
              {balance[index + 1]}
            </TableCell>
          </TableRow>
        ))
      )
    }else{
      return(
        id.slice(0).reverse().map((value, index, array) => (
          <TableRow>
            <TableCell component="th" scope="value">
              {value}
            </TableCell>
            <TableCell>
              {slot1[array.length - 1 - index]}
            </TableCell>
            <TableCell>
              {slot2[array.length - 1 - index]}
            </TableCell>
            <TableCell>
              {slot3[array.length - 1 - index]}
            </TableCell>
            <TableCell>
              {time[array.length - 1 - index]}
            </TableCell>
            <TableCell>
              {balance[array.length - 1 - index + 1]}
            </TableCell>
          </TableRow>
        ))
      )
    }
  }

  getArgu = (one, two, three, newTime, minus, add) => {
    const newId = this.state.id.length
    const newBalance = this.state.balance[newId] -minus +add
    this.setState(prevState => ({
      id: [...prevState.id, newId],
      slot1: [...prevState.slot1, one],
      slot2: [...prevState.slot2, two],
      slot3: [...prevState.slot3, three],
      time: [...prevState.time, newTime],
      balance: [...prevState.balance, newBalance.toFixed(2)],
    }),() => {
      const {id,slot1,slot2,slot3,time,balance} = this.state
      const name = this.state.name
      window.localStorage.setItem( name , JSON.stringify({
        id: id,
        slot1: slot1,
        slot2: slot2,
        slot3: slot3,
        balance: balance,
        time: time
      }));
    });
  }

  componentDidMount = () => {
    this.getLocalStorage()
  }

    

  render = () => {
    const { classes } = this.props;
    const { anchorE1, balance, modalOpen, firstLetter, modalCasinoOpen, id, slot1, slot2, slot3, time, sort } = this.state;
    const open = Boolean(anchorE1);


    return(
      <div>
        <div className={`navbar ${classes.root}`}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h5" className={classes.title}>
                Casino
              </Typography>
              <Typography variant="h6" className={classes.balance}>
                ${balance[id.length]}
              </Typography>
              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleMenuClick}>
                <Avatar alt="Remy Sharp" src="">{firstLetter}</Avatar>
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                getContentAnchorEl = {null}
                anchorOrigin = {{horizontal: "right"}}
                open= {open}
                onClose={this.handleMenuClose}
              >
                {this.loginInfo()} 
                <Modal
                  open={modalOpen}
                  onClose={this.handleModalClose}
                  style={{display:'flex',alignItems:'center',justifyContent:'center'}}
                >
                  <Login loginFun = {this.setLogin} />
                </Modal>
              </Menu>
            </Toolbar>
          </AppBar>
        </div>
        <Container maxWidth="lg">
          <div className="start">
            <Button variant="contained"  color="primary" onClick={this.handleModalCasinoOpen}>
              Play
            </Button>
            <Modal
              open={modalCasinoOpen}
              onClose={this.handleModalCasinoClose}
              style={{display:'flex',alignItems:'center',justifyContent:'center'}}
            >
              <ModalCasino balance = {balance[id.length]} callArgu = {this.getArgu} closeCall = {this.handleModalCasinoClose} />
            </Modal>
          </div>
          <div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    ID
                    <TableSortLabel 
                      active
                      direction={sort}
                      onClick={this.handleSortIcon}
                    ></TableSortLabel>
                    </TableCell>
                  <TableCell>Slot 1</TableCell>
                  <TableCell>Slot 2</TableCell>
                  <TableCell>Slot 3</TableCell>
                  <TableCell>
                    Time(D,M,Y, h,m,s)
                    <TableSortLabel 
                      active
                      direction={sort}
                      onClick={this.handleSortIcon}
                    ></TableSortLabel>
                    </TableCell>
                  <TableCell>balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.checkSort(id,slot1,slot2,slot3,time,balance)}
              </TableBody>
            </Table>
          </TableContainer>
          </div>
          <div className="Footer">
						<Footer />
          </div>
        </Container>
      </div>
    )
  }

}

export default withStyles(styles, {withTheme: true})(App)
