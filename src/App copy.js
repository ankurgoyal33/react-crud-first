import './App.css';
import PersonDetailsFromDb from './Components/PersonDetailsFromDb';

let getData = () => {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:8090/PersonDetailsRead');
  xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function () {
    console.log("prateek goyal");
    if (xhr.readyState === 4) {
      console.log("parsed2: " + JSON.parse(xhr.responseText)); 
      // console.log("parsed3: " + xhr.responseText);  
      // console.log("parsed4: " + typeof(JSON.parse(xhr.responseText))); 
      // console.log("parsed5: " + Array.isArray(JSON.parse(xhr.responseText))); 

      // console.log("parsed6: " + typeof(xhr.responseText));  
      this.setState(){
        
      }
      document.getElementById('result').innerHTML = xhr.responseText;
    }
  };
  xhr.send();
}

let addData = (e) => {
  e.preventDefault();

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:8090/PersonDetailsCreate');
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      
      document.getElementById('result').innerHTML = xhr.responseText;
    }
  };
  var data = {
    Fname: e.target.elements.fname.value.trim(),
    Lname: e.target.elements.lname.value.trim(),
    Address: e.target.elements.address.value.trim(),
    Contact: e.target.elements.phone.value.trim()
  };
  xhr.send(JSON.stringify(data));
}

let updateData = (e) => {
  e.preventDefault();
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:8090/PersonDetailsUpdate');
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      document.getElementById('result').innerHTML = xhr.responseText;
    }
  };
  var data = {
    Fname: e.target.elements.fname.value.trim(),
    Uname: e.target.elements.uname.value.trim()
  };
  xhr.send(JSON.stringify(data));
}

let deleteData = (e) => {
  e.preventDefault();

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:8090/PersonDetailsDelete');
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      document.getElementById('result').innerHTML = xhr.responseText;
    }
  };
  var data = {
    Fname: e.target.elements.fname.value.trim()
  };
  xhr.send(JSON.stringify(data));
}

function App() {
  return (
    <div>
      <div className="AddDetails">
        <p class="title">ADD DETAILS:</p>
        <form onSubmit={addData} >
          First Name: <input type='text' name='fname' /><br />
          Last Name: <input type='text' name='lname' /><br />
          Address: <textarea type='text' name='address' /><br />
          Phone: <input type='tel' name='phone' /><br />
          <button> Save </button>
        </form>
      </div>

      <div className="GetDetails">
        <p class="title"> GET DETAILS:</p>
        <button onClick={getData}>Show DB</button>
      </div>

      <div className="ShowDetails">
        <p class="title">SHOW DETAILS:</p>
        <p id='result'>Waiting......</p>
      </div>

      {/* <PersonDetailsFromDb /> */}

      <div className="UpdateDetails">
        <p class="title">UPDATE DETAILS:</p>
        <form onSubmit={updateData} >
          First Name: <input type='text' name='fname' /><br />
          Updated Name: <input type='text' name='uname' /><br />
          <button> Update </button>
        </form>
      </div>

      <div className="DeleteDetails">
        <p class="title">DELETE DETAILS:</p>
        <form onSubmit={deleteData} >
          First Name: <input type='text' name='fname' /><br />
          <button> Delete </button>
        </form>
      </div>


    </div>

  );
}

export default App;
