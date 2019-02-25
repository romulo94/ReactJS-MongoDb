import React, { Component } from "react";
import axios from "axios";
import TextField from '@material-ui/core/TextField';

class App extends Component {
  state = {
    dataUser: [],
    dataDepartament: [],
    dataTransition: [],
    id: 0,
    name: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
    value: Number,
    user:'',
    description: ''
  };

  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 5000);
      this.setState({ intervalIsSet: interval });
    }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDataFromDb = () => {
    fetch("http://localhost:3001/user")
      .then(data => data.json())
      .then(res => this.setState({ dataUser: res.data }));
    fetch("http://localhost:3001/transition")
      .then(data => data.json())
      .then(res => this.setState({ dataTransition: res.data }));
  };
  convert = (value)=>{
        var n = Number
        var n = parseFloat(value)
        var n = n.toFixed(2)
        return n
  }
  putDataToDB = (value,user,description) => {
    value = this.convert(value)
    if(this.state.value.length===0){
        alert("Você precisa adicionar o valor.")
        return
    }
    if(this.state.user.length===0){
        alert("Você precisa adicionar o funcionario.")
        return
    }
    if(this.state.description.length===0){
        alert("Por favor, adicione a descrição.")
        return
    }
    const result = ( this.state.dataUser.find((usr)=>usr.name===user))? true : false
    if(!result){return alert('funcionario nao existe')}
    else{
        axios.post("http://localhost:3001/transition", 
        {   value: value, 
            user: user,
            description: description });
        this.setState({user:'',value:'',description:''})
    }

  };

  deleteFromDB = idTodelete => {
    let objIdToDelete = null;
    this.state.dataTransition.forEach(dat => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete("http://localhost:3001/api/deleteData", {
        dataTransition: {
        id: objIdToDelete
      }
    });
  };

  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    this.state.dataTransition.forEach(dat => {
      if (dat.id == idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post("http://localhost:3001/api/updateData", {
      id: objIdToUpdate,
      update: { name: updateToApply }
    });
  };

  render() {
    
    const { dataTransition , user , value , description} = this.state;
    return (
      <div>
          <div>
        <TextField
            value={this.state.user}
            type="text"
            onChange={e => this.setState({ user: e.target.value })}
            placeholder="Funcionario"
            style={{ width: "200px" }}
          />
          <TextField
            value={this.state.value}
            type="text"
            onChange={e => this.setState({ value: e.target.value })}
            placeholder="Valor"
            style={{ width: "200px" }}
          />
          <TextField
            fullWidth
            value={this.state.description}
            type="text"
            onChange={e => this.setState({ description: e.target.value })}
            placeholder="Descrição"
            InputProps={{ inputProps: { maxLength: 500 } }}
            InputLabelProps={{
                shrink: true,
              }}
          />
          </div>
          <button onClick={() => this.putDataToDB(value,user,description)}>
            ADD
          </button>
        <ul>
          {dataTransition.length <= 0
            ? "NO DB ENTRIES YET"
            : dataTransition.map(dat => (
                <li style={{ padding: "10px" }} key={dataTransition.name}>
                  <span style={{ color: "gray" }}> Funcionario: </span> {dat.user} <br />
                  <span style={{ color: "gray" }}> Valor: </span> {dat.value} <br />
                  <span style={{ color: "gray" }}> Descrição: </span> {dat.description} <br />
                </li>
              ))}
        </ul>
        <div style={{ padding: "10px" }}>
          
        </div>
      </div>
    );
  }
}

export default App;