import React, { Component } from "react";
import axios from "axios";

class App extends Component {

  state = {
    data: [],
    id: 0,
    name: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null
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
    fetch("http://localhost:3001/departament")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  putDataToDB = name => {

    axios.post("http://localhost:3001/departament", {
      name: name
    });
    this.setState({name:''})
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
    const x = () =><h1>teste</h1>
    return (
      <div>
        <input
            maxlength="100"
            value={this.state.name}
            type="text"
            onChange={e => this.setState({ name: e.target.value })}
            placeholder="name of departament"
            style={{ width: "200px" }}
          />
          <button onClick={() => this.putDataToDB(this.state.name)}>
            ADD
          </button>
        <ul>
          {data.length <= 0
            ? "NO DB ENTRIES YET"
            : 
             data.map(dat => (
                <li style={{ padding: "10px" }} key={data.name}>
                  <span style={{ color: "gray" }}> </span>Departamento: {dat.name} <br />
                </li>
              ))
            }
        </ul>
        <div style={{ padding: "10px" }}>
          
        </div>
      </div>
    );
  }
}

export default App;