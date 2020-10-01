function confunc(){
	var text = document.getElementById("textbox2").value
	var title = document.getElementById("textbox").value
	if(title == "" || text == ""){
		alert("Fail:nothing here")
	}else{
		alert("Success")
		//var db = new AWS.DynamoDB()
		console.log(title)
	}
}
var con = document.getElementById("bCon")
con.addEventListener("click",confunc)

