import { React, useState, useEffect, useRef } from 'react';
import './Student.css'

const Student = () => {
    const [values, setValues] = useState({
        name: "",
        address: ""
    })
    const [updatedValues, setUpdatedValues] = useState({
        name: "",
        address: ""
    })
    const firstRender = useRef(true)
    const [submitted, setSubmitted] = useState(false)
    const [valid, setValid] = useState(false)
    const [students, setStudents] = useState([]);

    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value,
        })
    }

    const handleChangeUpdate = e => {
        const { name, value } = e.target
        setUpdatedValues({
            ...updatedValues,
            [name]: value,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setValid(true)
        addStudent()
        values.name = ""
        values.address = ""
        setSubmitted(true);
    }


    const addStudent = async () => {
        if (values.name && values.address) {
            fetch("http://localhost:9191/student/addStudent", {
                method: "POST",
                headers: { "Content-Type": "application/json; charset=UTF-8" },
                body: JSON.stringify(values)
            })
                .then((res) => res.json())
                .then((students) =>
                    setStudents((prevStudents) => [...prevStudents, students])
                );
        }
    };

    const updateStudentInfo = (student) => {
        const res = fetch("http://localhost:9191/student/addStudent", {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify({ ...student, name: updatedValues.name })
        })
            .then((res) => res.json())

            }

const updateListe = async () => {
    fetch(`http://localhost:9191/student/getAllStudents`)
        .then(res => {
            return res.json()
        })
        .then(data => {
            setStudents(data)
        })

}


// get all students when page laod
useEffect(() => {
    fetch('http://localhost:9191/student/getAllStudents')
        .then(res => {
            return res.json()
        })
        .then((data) => {
            setStudents(data)
        })
}, [])

// useEffect(() => {
//     setStudents([])
// },[])




const deleteStudents = async (student) => {
    const res = await fetch(`http://localhost:9191/student/delete/${student.id}`, { method: 'DELETE' })
    await res.json().then(updateListe())
}

const studentList = students.map((student) =>
    <tr key={student.id}>
        <td>{student.id}</td>
        <td><input value={updatedValues.name} placeholder={student.name} onChange={handleChangeUpdate} id="name" className="form-field " type="text" name="name" /></td>
        <td>{student.address}</td>
        <td><button onClick={() => deleteStudents(student)}>delete</button></td>
        <td><button onClick={() => updateStudentInfo(student)}>update</button></td>
    </tr>);



return (
    <div class="form-container">
        <form class="register-form" onSubmit={handleSubmit}>
            {/* {submitted && valid ? <div className="success-message"> Success! </div> : null} */}
            <input
                value={values.name}
                onChange={handleChange}
                id="name"
                className="form-field"
                type="text"
                placeholder="name"
                name="name" />
            {/* {submitted && !values.name ? <span>Please enter a name </span> : null} */}
            <input
                value={values.address}
                onChange={handleChange}
                id="address"
                className="form-field"
                type="text"
                placeholder="address"
                name="address" />
            {/* {submitted && !values.address ? <span>Please enter an address </span> : null} */}
            <button class="form-field" type="submit">
                Register
            </button>
        </form>
        <table>
            <tr>
                <th>id</th>
                <th>name</th>
                <th>address</th>
                <th>delete</th>
                <td>update</td>
            </tr>
            {studentList}
        </table>
    </div>
);
}

export default Student


