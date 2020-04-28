const myForm = document.getElementById("myForm");

myForm.addEventListener("submit", function send(e) {
  e.preventDefault();
  let name = document.getElementById("name");
  if (name.value.length < 5) {
    alert("name length must be at least 5 characters long");
    return;
  } else {
    name = name.value;
  }

  let mail = document.getElementById("mail");

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)) {
    mail = mail.value;
  } else {
    alert("You have entered an invalid email address!");
    return false;
  }

  let sub = document.getElementById("sub").value;
  let msg = document.getElementById("msg").value;
  let data = { name: name, email: mail, subject: sub, message: msg };
  let dataAsJson = JSON.stringify(data);
  console.log(dataAsJson);

  let url =
    "https://afternoon-falls-30227.herokuapp.com/api/v1/contact_us?fbclid=IwAR21UExN4h8FtmYQSNqqA82RD-x-mncJBDcN-xuNLOMOPdWqjQmsLLQ148o";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: dataAsJson
  })
    .then(response => response.json())
    .then(data => {
      console.log("Success::>", data);

      let spanTxt = document.getElementById("successTxt");
      spanTxt.innerHTML = data.message;
      spanTxt.classList.add("alert", "alert-success");
    })
    .catch(error => {
      console.log("Error message:", error);
    });

// SENDING TO PHP

  fetch("formData.php", {
    method: "POST",
     body: dataAsJson,
     headers: {
      "Content-Type": "application/json; charset=UTF-8"
    }
   
  })
    .then(response => {
      return response.text();
    })
    .then(Json => {
      console.log("SENT TO PHP "+ Json);
    })
    .catch(error => {
      console.log("Error message::>", error);
    });

    myForm.reset();
    // window.location.href = "formData.php";

});
