import React, { Component } from "react";
import axios from "axios";

class App extends Component { 
  state = {
    data: [],
    id: 0,
    name: "",
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
    dataDepartament: [],
    departaments: [],
    nameDepartment: ''
  };

  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
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
      .then(res => this.setState({ data: res.data }));
    fetch("http://localhost:3001/departament")
      .then(data => data.json())
      .then(res => this.setState({ dataDepartament: res.data }));
  };


  putDataToDB = name => {
    if(this.state.name.length===0){
      alert("Adicione um nome")
      return
    }
    if(this.state.departaments.length===0){
      alert("Você precisa adicionar ao menos um departamento.")
      return
    }
    const departament = []
    this.state.departaments.map((x)=>
      departament.push(x._id)  
    )
    axios.post("http://localhost:3001/user", {
      name: name,
      departament : departament
    });
    this.setState({name:'',nameDepartment:'',departaments:[]})
  };
  addDepartament = name => {

    this.state.dataDepartament.map((dep)=>dep.name===name ? 
    this.state.departaments.push(dep):null)
    this.setState({nameDepartment:''})


  };

  deleteFromDB = idTodelete => {
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete("http://localhost:3001/api/deleteData", {
      data: {
        id: objIdToDelete
      }
    });
  };

  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    this.state.data.forEach(dat => {
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
 
    const { data } = this.state;
    return (
      <div>
        <div>
          <div>
         <input
            maxlength="200"
            value={this.state.name}
            type="text"
            onChange={e => this.setState({ name: e.target.value })}
            placeholder="nome do funcionario"
            style={{ width: "200px" }}
          />
           <input
           value={this.state.nameDepartment}
            type="text"
            onChange={e => this.setState({ nameDepartment: e.target.value })}
            placeholder="nome departamento"
            style={{ width: "200px" }}
          />
          <button onClick={() => this.addDepartament(this.state.nameDepartment)}>
            ADD-departamento
          </button>
          <button onClick={() => this.putDataToDB(this.state.name)}>
            ADDUSER
          </button>
          </div>
          <div style={{'display':'inline-grid'}}>
            <span>Nome do funcionario: {this.state.name}</span>
            <span>Departamento(s):</span>
            {this.state.departaments.map((dep)=><span>{dep.name}</span>)}
          </div>
          </div>
        <ul>
          {data.length <= 0
            ? "NO DB ENTRIES YET"
            : data.map(dat => (
                <li style={{ padding: "10px" }} key={data.name}>
                  <span style={{ color: "gray" }}> Funcionario: </span> {dat.name} <br />
                  {
                    dat.departament.map(dep=>(<div><span style={{ color: "gray" }}> Departamento: </span> {dep.name} <br /></div>))
                  }
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