
AWS.config.region = "us-east-2"
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId:"us-east-2:67dfd5c2-f8ee-4c6c-8334-9f05de511681"})
var saveInProgress 

function confunc(){
	var text = document.getElementById("textbox2").value
	var title = document.getElementById("textbox").value
	if(title == "" || text == ""){
		alert("Fail:nothing here")
	}else{
		pushDynamo(title, text)
	}
}
function pushDynamo (title, text){
	if(saveInProgress){
		return
	}
	saveInProgress = true
	var db = new AWS.DynamoDB({region:"us-east-2"})
	db.config.credentials = AWS.config.credentials

	var params = {
		TableName: "Story_Info",
		Item: {
			publish_date: {S: (new Date().getTime()).toString()},
			id: {S: uuidv4()},
			title: {S: title}
		},
	}
	console.log(db)
	db.putItem(params, function(e,r){
		if(e){
			console.log(e)
			alert("Error")
		} else {
			writeS3(text, title)
		}
	})
}

function writeS3(text, title){
	var s3 = new AWS.S3({params: {Bucket:"storytext"}})
	s3.putObject({ Key: encodeURIComponent(title), Body: text }, function(err, data) {
      if (err) {
        console.log("S3 Error", err)
      } else {
      	alert("Successfully saved!")
      	saveInProgress = false
		window.location.href="index.html"
      }
    });
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
var con = document.getElementById("bCon")
con.addEventListener("click",confunc)

