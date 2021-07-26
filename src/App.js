import React from 'react';
import './App.css';
import PersonDetailsFromDb from './Components/PersonDetailsFromDb';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      updateButtonDisabled: true,
      originalFirstName: "",
      Afname: "",
      Alname: "",
      Aaddress: "",
      Aphone: ""
    };
  }
  updating = (item) => {
    this.setState(() => {
      return {
        updateButtonDisabled: false,
        originalFirstName: item.FirstName,
        Afname: item.FirstName,
        Alname: item.LastName,
        Aaddress: item.Address,
        Aphone: item.Phone
      };
    });
  }
  getData = () => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8090/PersonDetailsRead');
    xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = () => {
      console.log("prateek goyal");
      if (xhr.readyState === 4) {
        // console.log("parsed2: " + JSON.parse(xhr.responseText));
        this.setState(() => {
          return {
            items: JSON.parse(xhr.responseText)
          };
        });
        // document.getElementById('result').innerHTML = xhr.responseText;
      }
    };
    xhr.send();
  }

  addData = (e) => {
    e.preventDefault();

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8090/PersonDetailsCreate');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        this.setState(() => {
          return {
            items: JSON.parse(xhr.responseText)
          };
        });
      }
    };
    var data = {
      Fname: e.target.elements.fname.value.trim(),
      Lname: e.target.elements.lname.value.trim(),
      Address: e.target.elements.address.value.trim(),
      Contact: e.target.elements.phone.value.trim()
    };

    //removing the value entered into the fields
    e.target.elements.fname.value = '';
    e.target.elements.lname.value = '';
    e.target.elements.address.value = '';
    e.target.elements.phone.value = '';

    xhr.send(JSON.stringify(data));
  }

  updateData = (e) => {
    e.preventDefault();
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8090/PersonDetailsUpdate');
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        console.log("inside: " + xhr.responseText);
        console.log("inside2: " + JSON.parse(xhr.responseText));

        this.setState(() => {
          return {
            // originalFirstName: "",
            // Afname: "",
            // Alname: "",
            // Aaddress: "",
            // Aphone: "",
            updateButtonDisabled: true,
            items: JSON.parse(xhr.responseText)
          };
        });
      }
    };

    var udata = {
      UFname: e.target.elements.ufname.value.trim(),
      ULname: e.target.elements.ulname.value.trim(),
      UAddress: e.target.elements.uaddress.value.trim(),
      UContact: e.target.elements.uphone.value.trim(),
      Fname: this.state.originalFirstName,
    };

    console.log("prateek: " + JSON.stringify(udata));
    //removing the value entered into the fields
    e.target.elements.ufname.value = '';
    e.target.elements.ulname.value = '';
    e.target.elements.uaddress.value = '';
    e.target.elements.uphone.value = '';

    xhr.send(JSON.stringify(udata));
  }

  deleteData = (item_fname) => {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8090/PersonDetailsDelete');
    xhr.setRequestHeader("Content-Type", 'application/json');
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        // document.getElementById('result').innerHTML = xhr.responseText;
        this.setState(() => {
          return {
            items: JSON.parse(xhr.responseText)
          };
        });
      }
    };
    // console.log(item_fname);
    xhr.send(JSON.stringify({ f_name: item_fname }));
  }

  // changeFName = (e) => {
  //   this.setState
  //   (
  //     {ufname : e.target.value}
  //   );
  // }

  // changeLName = (e) => {
  //   this.setState
  //   (
  //     {ulname : e.target.value}
  //   );
  // }

  // changeAddress = (e) => {
  //   this.setState
  //   (
  //     {uaddress : e.target.value}
  //   );
  // }

  // changePhone = (e) => {
  //   this.setState
  //   (
  //     {uphone : e.target.value}
  //   );
  // }

  render() {
    return (
      <div>
        <div className="AddDetails">
          <p class="title">ADD DETAILS:</p>
          <form onSubmit={this.addData} >
            First Name: <input type='text' name='fname' required /><br />
            Last Name: <input type='text' name='lname' required /><br />
            Address: <textarea type='text' name='address' required /><br />
            Phone: <input type='tel' name='phone' required /><br />
            <button> Save </button>
          </form>
        </div>

        <div className="UpdateDetails">
          <p class="title">UPDATE DETAILS:</p>
          <form onSubmit={this.updateData} >
            First Name: <input type='text' name='ufname' defaultValue={this.state.Afname} required /><br />
            Last Name: <input type='text' name='ulname' defaultValue={this.state.Alname} required /><br />
            Address: <textarea type='text' name='uaddress' defaultValue={this.state.Aaddress} required /><br />
            Phone: <input type='tel' name='uphone' defaultValue={this.state.Aphone} required /><br />
            {/* First Name: <input type='text' name='ufname' onChange={this.changeFName} value={this.state.Afname} required /><br />
            Last Name: <input type='text' name='ulname' onChange={this.changeLName} value={this.state.Alname} required /><br />
            Address: <textarea type='text' name='uaddress' onChange={this.changeAddress} value={this.state.Aaddress} required /><br />
            Phone: <input type='tel' name='uphone' onChange={this.changePhone} value={this.state.Aphone} required /><br /> */}
            <button disabled={this.state.updateButtonDisabled}> Update </button>
          </form>
        </div>

        <div className="GetDetails">
          <p class="title"> GET DETAILS:</p>
          <button onClick={this.getData}>Show DB</button>
        </div>

        <div className="ShowStatus">
          <p class="title">SHOW STATUS OF CRUD OPERATION:</p>
          <p id='result'>Waiting......</p>
        </div>

        <div className="ShowDetails">
          <p class="title">DB:</p>
          <PersonDetailsFromDb
            items={this.state.items}
            deleteData={this.deleteData}
            updating={this.updating}
          />
        </div>

        {/* 
        <div className="DeleteDetails">
          <p class="title">DELETE DETAILS:</p>
          <form onSubmit={this.deleteData} >
            First Name: <input type='text' name='fname' /><br />
            <button> Delete </button>
          </form>
        </div> */}

      </div>
    );
  }

}

export default App;
