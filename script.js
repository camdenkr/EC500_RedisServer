let console_output = ""
let salt = 23541 //use salt for requests
var hash_pass
var signed_in = 0
function send_function() {
     //if command is empty, return immedieately (aka do nothing)
    let usr_input = document.getElementById("cmdprompt").value
    if(usr_input == "")
      return
     var split_input = usr_input.split(" ");
     let input_len = split_input.length;

     if(split_input[0] == "CLEAR" && input_len == 1)
     {
       clear_input()
       //clear output console
       console_output = "$ "
       document.getElementById('console').innerHTML = console_output
       return
     }
    
    //make sure user signs in first
    //check login command, only login if that's the case
    if(split_input[0] == "PASSWORD")
    {
      console_output = "$ "
      signed_in = 1
      hash_pass = (md5(salt + split_input[1]))
      clear_input()
      return
    }
    else if(signed_in == 0)
    {
      document.getElementById('console').innerHTML = "Error: Please sign in with PASSWORD first\n"
      clear_input()
      return
    }
    
   

    
    //else //if a valid REDIS command, assume message is legitimate, take the rest of the command as the message, check for errors in request
    //{
      // var message = ""
      // for (let i = 0; i < input_len; i++) { 
      //   message = message + split_input[i]
      //   //only add a space if not last part of message, removing potential trailing whitespace
      //   if(i != input_len - 1)
      //     message = message + " "
     // }
    //}
    console_output = console_output + document.getElementById("cmdprompt").value + "\n" + "$ "//sets the whole console output to history plus the newly gathered data
    document.getElementById('console').innerHTML = console_output; //sets value inside console to console_output
    clear_input()
  
  //create command to send to URL, whitespaces are automatically parsed to URL format when sent
  let fetch_command = "https://agile.bu.edu/ec500_scripts/redis.php?salt=" + String(salt) + "&hash=" + String(hash_pass) + "&message=" + String(usr_input);
  console.log(fetch_command)


  fetch(fetch_command)
  .then(function (response) {
    return response.json();
  })
  .then(function (myJson) {
    console.log(myJson.ip);
  })
  .catch(function (error) {
    console.log("Error: " + error);
  });
  }

//clears input for better UX
function clear_input()
{
  document.getElementById('cmdprompt').value = "" 
}