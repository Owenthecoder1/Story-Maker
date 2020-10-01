function confunc(){
	var text = document.getElementById("textbox2").value
	var title = document.getElementById("textbox").value
	if(title == "" || text == ""){
		alert("Fail:nothing here")
	}else{
		alert("Success")
		//var db = new AWS.DynamoDB()
		window.location.href="https://owenthecoder1.github.io/Story-Maker/index.html"
	}
}
var con = document.getElementById("bCon")
con.addEventListener("click",confunc)

