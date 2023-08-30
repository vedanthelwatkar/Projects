import {useState,useRef} from "react"
import axios from "axios"

export default function Create(){	

	const rRno = useRef()
	const rName = useRef()
	const rMarks = useRef()

	const [rno,setRno] = useState("")
	const [name,setName] = useState("")
	const [marks,setMarks] = useState("")

	const save = (event) => {
		event.preventDefault()
		
		if ( (rno == "" ) || (rno < 1) ){
			alert("invalid rno")
			setRno("")
			rRno.current.focus()
			return
		}

		if ( (name == "") || (name.trim().length == 0) || (name.trim().length <2) || ( ! name.match(/^[A-z ]+$/)))
		{
			alert("invalid name")
			setName("")
			rName.current.focus()	
			return
		}

		if ( (marks == "" ) || (marks < 0) || (marks>100)){
			alert("invalid marks")
			setMarks("")
			rMarks.current.focus()
			return
		}

		let data = {rno,name,marks}
		let url = "http://localhost:9000/save"
		axios.post(url,data)
		.then(res => {
			if (res.data.affectedRows ==1){
				alert("Record created")
				setRno("")
				setName("")
				setMarks("")
				rRno.current.focus()}
			else if (res.data.errno == 1062){
				alert("record already exists")
				setRno("")
				rRno.current.focus()}
			
		})
		.catch(err => alert(err))
	}

	return(
	<>
	<center>
		<h1> Create Page </h1>
		<form onSubmit = {save}>
		<input type = "number" placeholder = "Enter Rno" 
		onChange = {(event) => {setRno(event.target.value)} } ref = {rRno} value = {rno}/>
		<br/><br/>
		<input type = "text" placeholder = "Enter Name" 
		onChange = {(event) => {setName(event.target.value)} } ref = {rName} value = {name}/>
		<br/><br/>
		<input type = "number" placeholder = "Enter Marks" 
		onChange = {(event) => {setMarks(event.target.value)} } ref = {rMarks}  value = {marks}/>
		<br/><br/>
		<input type = "submit" value = "Save" />
		<br/><br/>
		</form>
	</center>
	</>
	)
}