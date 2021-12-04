document.querySelector(".submit").addEventListener('click', addNewContact);


let Contact = function (name, phone) {
    this.name = name;
    this.phone = phone;
}

let contacts = [];

function listContacts() {
    document.getElementById('displayContacts').innerHTML = " ";
    for (let i = 0; i < contacts.length; i++) {
        document.getElementById('displayContacts').innerHTML += 
        '<tr><td id="name' + i + '"><div class="data"><p>' + contacts[i].name + 
        '</p><p>' + contacts[i].phone + '</p></div>' +
        '</td><td></div><button  onclick=deleteContact(' + i + ')'+ 
        '><i class="fa fa-trash" aria-hidden="true"></i></button></td></tr>';
    }
}

function addNewContact() {
    const name = document.getElementById('inputName').value;
    const phone = "" + document.getElementById('inputPhone').value;
    const regexName = new RegExp(/^[A-Z][a-z]+ [A-Z][a-z]+$/);
    const regexPhone = new RegExp(/^[1-9][0-9]{8}$/);
    if (regexName.test(name) && regexPhone.test(phone)){
        const prettyPhone = phone.slice(0, 3) + "-" + phone.slice(3, 6) + "-" + phone.slice(6, 9);
        var contact = new Contact(name, prettyPhone);
        contacts.push(contact);
        listContacts();
    }
}

function deleteContact(i) {
    contacts.splice(i, 1);
    listContacts();
}