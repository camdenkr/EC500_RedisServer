let console_output = ""
  
function send_function() {
    //if command is empty, return immedieately (aka do nothing)
    if(document.getElementById("cmdprompt").value == "")
      return
    console_output = console_output + document.getElementById("cmdprompt").value + "\n" //sets the whole console output to history plus the newly gathered data
    document.getElementById('console').innerHTML = console_output; //sets value inside console to console_output
    document.getElementById('cmdprompt').value = "" //clears input for better UX
    //document.getElementById('divTxt').innerHTML = "Contents : " + req.responseText;
  }





