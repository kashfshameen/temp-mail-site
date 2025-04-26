let currentEmail = "";
let login = "";
let domain = "";

function generateEmail() {
  fetch("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
    .then(res => res.json())
    .then(data => {
      currentEmail = data[0];
      document.getElementById("email").value = currentEmail;
      [login, domain] = currentEmail.split("@");
      fetchInbox();
    });
}

function copyEmail() {
  const emailField = document.getElementById("email");
  emailField.select();
  document.execCommand("copy");
  alert("Email copied: " + emailField.value);
}

function fetchInbox() {
  if (!login || !domain) return;
  fetch(`https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`)
    .then(res => res.json())
    .then(messages => {
      const list = document.getElementById("messages");
      list.innerHTML = "";
      messages.forEach(msg => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = `<strong>${msg.from}</strong><br>${msg.subject}`;
        li.onclick = () => readMessage(msg.id);
        list.appendChild(li);
      });
    });
}

function readMessage(id) {
  fetch(`https://www.1secmail.com/api/v1/?action=readMessage&login=${login}&domain=${domain}&id=${id}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("message-view").style.display = "block";
      document.getElementById("msg-from").textContent = data.from;
      document.getElementById("msg-subject").textContent = data.subject;
      document.getElementById("msg-body").innerHTML = data.htmlBody || data.textBody || "No content";
    });
}

window.onload = generateEmail;
