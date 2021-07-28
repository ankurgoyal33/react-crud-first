import React from 'react';
import './App.css';
import PersonDetailsFromDb from './Components/PersonDetailsFromDb';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      picDemo: "",
      items: [],
      updateButtonDisabled: true,
      originalEmail: "",
      Afname: "",
      Alname: "",
      Aaddress: "",
      Aphone: "",
      Aemail: ""
    };
  }


  updating = (item) => {
    this.setState(() => {
      return {
        updateButtonDisabled: false,
        originalEmail: item.Email,
        Afname: item.FirstName,
        Alname: item.LastName,
        Aaddress: item.Address,
        Aphone: item.Phone,
        Aemail: item.Email
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
      Contact: e.target.elements.phone.value.trim(),
      Email: e.target.elements.email.value.trim()
    };

    //removing the value entered into the fields
    e.target.elements.fname.value = '';
    e.target.elements.lname.value = '';
    e.target.elements.address.value = '';
    e.target.elements.phone.value = '';
    e.target.elements.email.value = '';

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
            originalEmail: "",
            Afname: "",
            Alname: "",
            Aaddress: "",
            Aphone: "",
            Aemail: "",
            updateButtonDisabled: true,
            items: JSON.parse(xhr.responseText)
          };
        });
      }
    };

    var udata = {
      UFname: e.target.elements.fname.value.trim(),
      ULname: e.target.elements.lname.value.trim(),
      UAddress: e.target.elements.address.value.trim(),
      UContact: e.target.elements.phone.value.trim(),
      UEmail: e.target.elements.email.value.trim(),
      Email: this.state.originalEmail,
    };

    console.log("prateek: " + JSON.stringify(udata));
    //removing the value entered into the fields
    e.target.elements.fname.value = '';
    e.target.elements.lname.value = '';
    e.target.elements.address.value = '';
    e.target.elements.phone.value = '';
    e.target.elements.email.value = '';

    xhr.send(JSON.stringify(udata));
  }

  deleteData = (item_email) => {
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
    xhr.send(JSON.stringify({ email: item_email }));
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



  sendImg = (uploadedImageFilePath) => {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8090/img_data');
    // xhr.setRequestHeader("Content-Type", 'multipart/form-data');
    xhr.onreadystatechange = () => {
      console.log("inside sendImg onreadystatechange method");
      if (xhr.readyState === 4) {
        document.getElementById('result').innerHTML = xhr.responseText;
      }
    };
    console.log("inside sending image1:" + uploadedImageFilePath);
    console.log("inside sending image2:" + JSON.stringify(uploadedImageFilePath));
    console.log("inside sending image3:" + URL.createObjectURL(uploadedImageFilePath));
    console.log("inside sending image4:" + JSON.stringify(URL.createObjectURL(uploadedImageFilePath)));


    xhr.send(uploadedImageFilePath);
  }

  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };

  getImg = () => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8090/img_data');
    xhr.setRequestHeader("Content-Type", 'application/json');
    xhr.onreadystatechange = () => {
      console.log("inside getImg onreadystatechange method");

      if (xhr.readyState === 4) {
        var data = xhr.responseText;

        console.log("inside getImg 1: " + data);
        console.log("inside getImg 2: " + JSON.parse(data));



        var base64Flag = 'data:image/jpeg;base64,';
        var imageStr = this.arrayBufferToBase64(data.img.data.data);
        // this.setState({
        //     img: base64Flag + imageStr
        // )}
        this.setState(() => {
          return {
            picDemo: base64Flag + imageStr
          };
        });
      }
    };
    xhr.send();
  }

  uploadedImageFilePath = "";
  onImageUpload = e => {
    this.uploadedImageFilePath = e.target.files[0]; // MY-file as binary data
  }
  //   onImageUpload = e => {

  //    let img = document.getElementById('imgg'); //MY-for previewing
  //    let file = null; //MY-initialising
  //    const fileList = e.target.files;

  //    for (let i = 0; i < fileList.length; i++) {

  //      if (fileList[i].type.match(/^image\//)) {
  //        file = fileList[i];

  //        const reader = new FileReader();
  //        reader.onloadend = () => {
  //          this.uploadedImageFilePath = reader.result.replace('data:', '').replace(/^.+,/, '');
  //        };
  //        reader.readAsDataURL(file);
  //        var uploadImageBlob = new Blob([file]);
  //        this.uploadedImageFilePath = uploadImageBlob;
  //        if (file !== null) {
  //          console.log("test1: " + URL.createObjectURL(this.uploadedImageFilePath));
  //          console.log("test2: " + this.uploadedImageFilePath);
  //          // console.log("test3: " + JSON.stringify(uploadImageBlob));
  //          // console.log("test4: " + typeof(uploadImageBlob));
  //          img.src = URL.createObjectURL(uploadImageBlob);
  //        }
  //        break;
  //      }
  //    }
  //  }
  render() {
    return (
      <div>
        <div>
          Profile Pic: <input type="file" name='profilepic' id="img" onChange={this.onImageUpload} /> <br />
          Preview:< img id="imgg" src="" alt="(not yet uploaded)" width="200" height="200" /> <br />
          Image from mongo:< img id="pic" src={this.state.picDemo} alt="(mongo waiting...)" width="200" height="200" /> <br />
          <button onClick={this.getImg} >Get Image</button>
          <button
            onClick={() => {
              this.sendImg(this.uploadedImageFilePath)
            }}
          >
            Send Image
          </button>
        </div>

        <div className="AddDetails">
          <p class="title">DETAILS:</p>
          <form
            onSubmit={this.state.updateButtonDisabled ? this.addData : this.updateData}
          >
            First Name: <input type='text' name='fname' defaultValue={this.state.Afname} required /> <br />
            Last Name: <input type='text' name='lname' defaultValue={this.state.Alname} required /> <br />
            Address: <textarea type='text' name='address' defaultValue={this.state.Aaddress} required /> <br />
            Phone: <input type='tel' name='phone' defaultValue={this.state.Aphone} required /> <br />
            Email: <input type="email" name="email" defaultValue={this.state.Aemail} required /> <br />
            {/* Profile Pic: <input type="file" name='profilepic' id="img" onChange={this.onImageUpload} /> <br />
            Preview:< img id="imgg" src="" alt="(not yet uploaded)" width="200" height="200" /> <br /> */}
            <button disabled={!this.state.updateButtonDisabled}> Add </button>
            <button disabled={this.state.updateButtonDisabled}> Update </button>

          </form>
        </div>

        {/* <div className="UpdateDetails">
          <p class="title">UPDATE DETAILS:</p>
          <form onSubmit={this.updateData} >
            First Name: <input type='text' name='ufname' defaultValue={this.state.Afname} required /><br />
            Last Name: <input type='text' name='ulname' defaultValue={this.state.Alname} required /><br />
            Address: <textarea type='text' name='uaddress' defaultValue={this.state.Aaddress} required /><br />
            Phone: <input type='tel' name='uphone' defaultValue={this.state.Aphone} required /><br />
            Email: <input type="email" name="uemail" defaultValue={this.state.Aemail} required /><br /> */}
        {/* First Name: <input type='text' name='ufname' onChange={this.changeFName} value={this.state.Afname} required /><br />
            Last Name: <input type='text' name='ulname' onChange={this.changeLName} value={this.state.Alname} required /><br />
            Address: <textarea type='text' name='uaddress' onChange={this.changeAddress} value={this.state.Aaddress} required /><br />
            Phone: <input type='tel' name='uphone' onChange={this.changePhone} value={this.state.Aphone} required /><br /> */}
        {/* <button disabled={this.state.updateButtonDisabled}> Update </button>
          </form>
        </div> */}

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

      </div>
    );
  }

}

export default App;
