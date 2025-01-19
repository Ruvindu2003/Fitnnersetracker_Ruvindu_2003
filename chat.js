const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
const selectElement = document.getElementById("person");
let IndexPerson = 0;
let msgHTML = '';

var md = window.markdownit();


const PERSON_NAME = "Me";
let Latest_massage = "";
let gemini_response = '';
let PersonIndexArray = ["Lahiru", "Ruvindu", "Sajith"];
let ChatList = [];
let ChatPerson = [[], [], []];

selectElement.onchange = (event) => {
    IndexPerson = PersonIndexArray.indexOf(selectElement.value);
    loadChatBox();
}


function getSelectedOption() {
    let selectedValue = selectElement.value;
    console.log("Selected Person: " + selectedValue);
    loadChatBox();
}


msgerForm.addEventListener("submit", event => {
    event.preventDefault();

    const msgText = msgerInput.value;
    if (!msgText) return;

    appendMessage(PERSON_NAME, "right", msgText);
    msgerInput.value = ""; 
});


function appendMessage(name, side, text) {
    

    msgHTML = 
        `<div class="msg ${side}-msg">
            <div class="msg-bubble">
                <div class="msg-info">
                    <div class="msg-info-name">${name}</div>
                </div>
                <div class="msg-text">${text}</div>
            </div>
        </div>`;

        
    Latest_massage = text;

    response_by_gemini();


    ChatList.push(msgHTML);
    

    console.log(msgHTML);
    

    getSelectedOption();
    

    ChatPerson[IndexPerson].push(msgHTML); 
    console.log(ChatPerson);


    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop = msgerChat.scrollHeight; 
}


function get(selector, root = document) {
    return root.querySelector(selector);
}

function loadChatBox(){
    msgerChat.innerHTML="";
    ChatPerson[IndexPerson].forEach(element=>{
        msgerChat.innerHTML+=element;
    })
}


function response_by_gemini(){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      "contents": [
        {
          "parts": [
            {
              "text": Latest_massage
            }
          ]
        }
      ]
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };


   
    
    
    fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBzJOpMCFmVJ8RpdUPa-ikItmMQfSW0evc", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.candidates[0].content.parts[0].text);
        gemini_response = result.candidates[0].content.parts[0].text



        
    msgHTML += 
        `<div class="msg left-msg">
            <div class="msg-bubble">
                <div class="msg-info">
                    <div class="msg-info-name">GEMINI</div>
                </div>
                <div class="msg-text">${md.render(gemini_response)}</div>
            </div>
        </div>`

        msgerChat.insertAdjacentHTML("beforeend", msgHTML);

      })
      .catch((error) => console.error(error));
}

