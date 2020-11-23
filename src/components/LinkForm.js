import React, {useState, useEffect} from 'react'

import {toast} from 'react-toastify'

import {db} from '../firebase'

const LinkForm = (props) => {

    const initialStateValues = {
        url: '',
        name: '',
        description: ''
    };

    // Defining state by react hooks
    const [values, setValues] = useState(initialStateValues);

    // Firestore request
    const getLinkById = async id => {
        const doc = await db.collection('links').doc(id).get();
        setValues({...doc.data()});
    }

    // Events
    const handleSubmit = (evt) => {
        evt.preventDefault();

        // if (!validateURL(props.currentId)) {
        //     toast('Invalid URL', {type: "warning", autoClose:1000});
        //     return;
        // }

        props.addOrEditLink(values);
        setValues({...initialStateValues});
    };

    const handleInputChange = (evt) => {
        const {name, value} = evt.target;
        setValues({...values, [name]: value});
    };

    // Validations
    // const validateURL = str => {
    //     return /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/.test(str);
    // };

    useEffect(() => {
        if (props.currentId === '')
            setValues({...initialStateValues});
        else
            getLinkById(props.currentId);
    }, [props.currentId]);

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            {/* Website link */}
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    {/* From material icons */}
                    <i className="material-icons">insert_link</i>
                </div>
                <input 
                    type="text" 
                    name="url" 
                    placeholder="http://someurl.com" 
                    className="form-control"
                    onChange={handleInputChange}
                    value={values.url}
                />
            </div>
            {/* Website name */}
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">create</i>
                </div>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Website name" 
                    className="form-control"
                    onChange={handleInputChange}
                    value={values.name}
                />
            </div>
            {/* Description */}
            <div className="form-group">
                <textarea 
                    name="description" 
                    className="form-control" 
                    rows="3" 
                    placeholder="Write a description"
                    onChange={handleInputChange}
                    value={values.description}
                />
            </div>
            {/* submit button */}
            <button className="btn btn-primary btn-block">
                {props.currentId === '' ? 'Save' : 'Update'}
            </button>
        </form>

        
    );
}

export default LinkForm