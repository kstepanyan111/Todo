import './App.css'
import {useEffect, useState} from "react";

const NameForm = () => {

    const [formValue, setFormValue] = useState({
        name: "",
        quote: ""
    })

    const [editValue, setEditValue] = useState({})
    const [isEditShown, setEditShown] = useState(false);


    const handlerInputChange = (key, value) => {
        setFormValue({
            ...formValue,
            [key]: value
        })
    }

    const handlerEditInputChange = (key, value) => {
        setEditValue({
            ...editValue,
            [key]: value
        })
    }

    // Working With Server
    const [data, setData] = useState([])

    /** Get All Quotes **/
    const getData = async () => {
        return await fetch("http://localhost:8080", {
            method: "GET",
            headers: {'Content-Type': 'application/json'},
        });
    }

    useEffect(() => {
        getData()
            .then(res => res.json())
            .then(res => setData(res.quotes))
    }, [])

    /** Create New Quote **/
    const postQuotes = async () => {
        fetch("http://localhost:8080/new", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formValue),
        })
            .then(res => res.json())
            .then(res => {
                setData(prevState => [
                    ...prevState,
                    res.quotes
                ])
            })
        setFormValue({
            name: "",
            quote: ""
        })
    }

    /** Delete Quote By Id **/
    const deleteQuote = async (id) => {
        await fetch(`http://localhost:8080/${id}`, {
            method: "DELETE",
        });
        const deletedQuotes = data.filter((quotes) => quotes._id !== id)
        setData(deletedQuotes)
    }
    /** update Quote By Id **/
    const handlerClickEdit = (id) => {
        const currentForm = data.filter((quote) => quote._id === id)[0]
        setEditValue(currentForm)
        setEditShown(true)
    }

    const handlerCancelEdit = () => {
        setEditShown(false)
        setEditValue({})
    }

    const updateQuote = async () => {
        await fetch(`http://localhost:8080/${editValue._id}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: editValue.name,
                quote: editValue.quote
            })
        })
            .then(res => res.json())
            .then(res => {
                const changeDataIndex = data.findIndex((quote) => quote._id === editValue._id)
                setData(prevState => {
                    prevState[changeDataIndex] = res.quotes
                    return prevState
                })
            })
        setEditShown(false)
        setEditValue({})
    }


    return (
        <>
            <div className="newListdiv">
                <ul className="newList">
                    <li><label>
                        Quote text:
                    </label>
                        <textarea
                            value={formValue.name}
                            onChange={(e) => handlerInputChange("name", e.target.value)}
                        />
                    </li>
                    <li><label>
                        Author name:
                    </label>
                        <input
                            type="text"
                            value={formValue.quote}
                            onChange={(e) => handlerInputChange("quote", e.target.value)}
                        />
                    </li>

                </ul>
                <button id = 'newButton' type={"submit"} onClick={postQuotes}>
                    New
                </button>
            </div>
            <ul>
                {data.map((quote, index) => (
                    <li className='currenQuote'>
                        <div key={index} className='list'>
                            <p className='quote'>"{quote.quote}"</p>
                            <p className='author'>-{quote.name}</p>
                            <button onClick={() => handlerClickEdit(quote._id)}>Edit</button>
                            <button onClick={() => deleteQuote(quote._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>


            {
                isEditShown ? (
                    <div className="edit">
                        <label>
                            Quote text:
                            <input
                                type="text"
                                value={editValue.name}
                                onChange={(e) => handlerEditInputChange("name", e.target.value)}
                            />
                        </label>
                        <label>
                            Author name:
                            <input
                                type="text"
                                value={editValue.quote}
                                onChange={(e) => handlerEditInputChange("quote", e.target.value)}
                            />
                        </label>
                        <button onClick={updateQuote}>Save</button>
                        <button onClick={handlerCancelEdit}>Cancel</button>
                    </div>
                ) : null
            }
        </>
    )
}

export default NameForm;