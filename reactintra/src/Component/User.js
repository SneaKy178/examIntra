import { React, useEffect, useState } from 'react'
import './UserCSS.css'

const User = () => {
    const [values, setValues] = useState({
        nom: "",
        guess: ""
    })
    const [submitted, setSubmitted] = useState(false)
    const [users, setUsers] = useState([])
    const [numberMatch, setNumberMatch] = useState()
    const [numberValid, setNumberValid] = useState()

    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (values.nom && values.guess) {
            addUser()
        }
        setSubmitted(true);
    }

    const addUser = async () => {
        if (values.nom && values.guess) {
            let randomNumber = Math.floor(Math.random() * 6) + 1
            if (parseInt(values.guess) < 1 || parseInt(values.guess) > 6) {
                setNumberValid(false)
            }
            else {
                setNumberValid(true)
            }

            if (parseInt(values.guess) === randomNumber) {
                setNumberMatch(true)
            } else {
                setNumberMatch(false)
            }
            fetch("http://localhost:9191/user/addUser", {
                method: "POST",
                headers: { "Content-Type": "application/json; charset=UTF-8" },
                body: JSON.stringify({ nom: values.nom, guess: values.guess, randomNumber: randomNumber })
            })
                .then((res) => res.json())
                .then((users) =>
                    setUsers((prevUsers) => [...prevUsers, users])
                );
        }
    }

    useEffect(() => {
        fetch('http://localhost:9191/user/getUsers')
            .then(res => {
                return res.json()
            })
            .then((data) => {
                setUsers(data)
            })
    }, [])







    const userList = users.map((user) =>
        <tr key={user.id}>
            <td>{user.nom}</td>
            <td>{user.guess}</td>
            <td>{user.randomNumber}</td>
        </tr>);

    return (
        <div>
            <form className="register-form" onSubmit={handleSubmit}>
                <input
                    value={values.nom}
                    onChange={handleChange}
                    id="nom"
                    className="form-field"
                    type="text"
                    placeholder="nom"
                    name="nom" /><br />
                {submitted && !values.nom ? <span>Please enter a name </span> : null}<br />
                <input
                    value={values.guess}
                    onChange={handleChange}
                    id="guess"
                    className="form-field"
                    type="text"
                    placeholder="guess"
                    name="guess" /><br />
                {submitted && !values.guess ? <span>Please enter a guess </span> : null}<br />
                {submitted && !numberValid ? <span>The number needs to be between 1 and 6 </span> : null}<br />
                <button class="form-field" type="submit">
                    Coup de dé
                </button>
            </form><br />
            {submitted && numberMatch ? <span>Votre nombre et le nombre alléatoire est le même. Gagné!</span> : null}
            {submitted && !numberMatch ? <span>Votre nombre et le nombre alléatoire n'est le même. Perdu!</span> : null}
            <table>
                <tr>
                    <th>Nom</th>
                    <th>Guess user</th>
                    <th>Random number</th>
                </tr>
                {userList}
            </table>
        </div>
    )
}

export default User
