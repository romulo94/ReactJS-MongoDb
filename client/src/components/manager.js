import React, { Component } from "react";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


class App extends Component {
  state = {
    data:[],
    dataUser: [],
    dataDepartament: [],
    dataTransition: [],
    id: 0,
    name: null,
    value: '',
    user:false,
    description: ''
  };

  componentDidMount() {
    this.getDataFromDb();
  }


  getDataFromDb = () => {
    fetch("http://localhost:3001/user")
      .then(data => data.json())
      .then(res => this.setState({ dataUser: res.data }));
    fetch("http://localhost:3001/transition")
      .then(data => data.json())
      .then(res => this.setState({ dataTransition: res.data }));
  };
  getDataFromDbNyUser = (name) => {
    fetch(`http://localhost:3001/transition/${name}`)
      .then(data => data.json())
      .then(res => this.setState({ dataTransition: res.data }));
  };



  render() {
    const { dataTransition ,user,dataUser} = this.state;
    console.log(user)
    const{ classes }=this.props;

    const cardShow = dataTransition.map((crd)=>
        <Card style={{'margin':'10px 10px 10px 10px'}}>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                Movimentação : {crd._id}
                </Typography>
                <Typography  color="textSecondary">
                Funcionário: {crd.user}
                </Typography>
                <Typography  color="textPrimary">
                Valor: {crd.value}
                </Typography>
                <Typography component="p">
            {crd.description}
                <br />
                </Typography>
            </CardContent>
        </Card>)

    return (
      <div>
          <Button style={{background:'gray',margin:'5px 5px 5px 5px'}} onClick={()=>{this.getDataFromDb(); this.setState({user:false})}}>Todos</Button>
          <br />
          <Button style={{background:'gray',margin:'5px 5px 5px 5px'}} onClick={(e)=>this.setState({user: !user})}>Pesquisar por funcionario</Button>
          {user?
              dataUser.map((usr)=><div key={usr.name}><Button onClick={(e)=>this.getDataFromDbNyUser(usr.name)} id={usr.name}>{usr.name}</Button></div>)
              :
              null
              }
          {dataTransition.length <= 0
            ? "NO DB ENTRIES YET"
            : cardShow}
        </div>
    );
  }
}

export default App;
// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';



