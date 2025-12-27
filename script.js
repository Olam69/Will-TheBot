let bot = new RiveScript();

const message_container = document.querySelector('.messages');
const form = document.querySelector('form');
const input_box = document.querySelector('#input_box');

// Ajax .loadFile() here does not seem to work with offline files due to browser http/https restrictions. Loading brain.rive from the internet until solution found
const brains = [
  'begin.rive',
  'macros.rive',
  'brain.rive'
];

bot.loadFile(brains).then(botReady).catch(botNotReady);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let input_val = input_box.value;
  if (input_val != "") {
    selfReply(input_val);
    input_box.value = '';
  }
  input_box.focus();
});

function botReply(reply){
  message_container.innerHTML += `<div class="bot">${reply}</div>`;
  location.href = '#edge';
  input_box.focus();
}

function selfReply(message){
  message_container.innerHTML += `<div class="self">${message}</div>`;
  bot.reply("local-user", message).then(function(reply) {
    botReply(reply);
  });
}

function botReady(){
  bot.sortReplies();
  botReply('Hello');
}

function botNotReady(err){
  message_container.innerHTML += `<div class="bot">${err}</div>`;
  console.log("An error has occurred.\n", err,"\nYou might need to close chrome and type this into CMD\n=> start chrome.exe --allow-file-access-from-files\n\n* Note: It is an intentional chrome restriction and you should be careful while allowing file access from files as your computer security may be compromised");
  console.log("Once you are finished working with your RiveScript bot, you should close Chrome and re-run it normally");
  alert("Does it say network error? > Check console");
}

