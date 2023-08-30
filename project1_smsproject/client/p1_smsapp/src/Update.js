import {useState, useRef, useEffect} from "react";
import axios from "axios";
import {useNavigate, useLocation}  from "react-router-dom";

export default function Update(){

	const loc = useLocation();
	const nav = useNavigate();
	
	const rRno = useRef();
	const rName = useRef();
	const rMarks = useRef();
	
	const [rno, setRno] = useState("");
	const [name, setName] = useState("");
	const [marks, setMarks] = useState("");

	useEffect( () =>{
		setRno(loc.state.rno);
		setName(loc.state.name);
		setMarks(loc.state.marks);
	}, [])

	const save = (event) => {
		event.preventDefault();
		if((rno == "") || (rno < 1))
		{
			alert("invalid rno");
			setRno("");
			rRno.current.focus();
			return;
		}
		if((name == "") || (name.trim().length == 0) || (name.length < 2) || (! name.match(/^[A-z ]+$/)))
		{
			alert("invalid name");
			setName("");
			rName.current.focus();
			return;
		}
		if((marks == "") || (marks < 0) || (marks > 100))
		{	
			alert("invalid marks");
			setMarks("");
			rMarks.current.focus();
			return;
		}
		let data = {rno, name, marks};
		let url = "http://localhost:9000/modify";
		axios.put(url, data)
		.then(res => {
				alert("record updatd ");
				nav("/");
		})
		.catch(err => alert("issue " + err));

	
	}	
	
	return(
	<>
	<center>
		<h1> Update Page </h1>
		<form onSubmit={save}>
		<input type="number" placeholder="enter ur roll number" onChange = {(event) => {setRno(event.target.value);}} ref={rRno} value={rno} disables={true}  />
		<br/>	<br/>
		<input type = "text" placeholder="enter ur name" onChange = {(event) => {setName(event.target.value);}} ref={rName} value={name}  />
		<br/>	<br/>
		<input type="number" placeholder="enter marks" onChange = {(event) => {setMarks(event.target.value);}} ref={rMarks} value={marks}  />
		<br/>	<br/>
		<input type="submit" value="Save"	/>
		</form>
	</center>
	</>
	);

}