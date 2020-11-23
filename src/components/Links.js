import React, {useEffect, useState} from 'react'
import LinkForm from './LinkForm'

import {toast} from 'react-toastify'

import {db} from '../firebase'

export const Links = () => {

    const [links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState('');

    const addOrEditLink = async (linkObject) => {
        try {
            if (currentId === ''){
                // doc function adds an id
                await db.collection('links').doc().set(linkObject);
                toast('New link added', {type: "success", autoClose:2000});
            } else {
                await db.collection('links').doc(currentId).update(linkObject);
                toast('Link updated successfully', {type: "info", autoClose:2000});
                // Updating state and then, the form data
                setCurrentId('');
            }
        } catch (error) {
            console.error(error)
        }
    };

    const onDeleteLink = async (id) => {
        if (window.confirm('Are you sure you want to delete this link?')) {
            await db.collection('links').doc(id).delete();
            toast('Link deleted successfully', {type: "error", autoClose:2000});
        }
    }

    const getLinks = async () => {
        // If we use get() instead of onSnapshot(callback()), we'd get the document once
        await db.collection('links').onSnapshot(querySnapshot => {
            const docs = []
            querySnapshot.forEach(doc => {
                // We've got all the data related to the links with ... operator and its ID
                docs.push({...doc.data(), id: doc.id});
            });
            // update state
            setLinks(docs); 
        });
        // Data must be a function
    }

    useEffect(() => {
        getLinks();
    }, []);

    return (
        <div>
            <div className="col-md-4 p-2">
                <LinkForm
                    // Copy all props to component
                    {...{addOrEditLink, currentId, links}}
                />
            </div>
            <div className="col-md-8 p-2">
                {links.map(link => (
                    <div className="card mb-1" key={link.id}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h4>{link.name}</h4>
                                <div>
                                    <i 
                                        className="material-icons" 
                                        onClick={() => setCurrentId(link.id)}
                                    >
                                        create
                                    </i>
                                    <i 
                                        className="material-icons text-danger" 
                                        onClick={() => onDeleteLink(link.id)}
                                    >
                                        close
                                    </i>
                                </div>
                            </div>
                            <p>{link.description}</p>
                            <a href={link.url} target="_blank" rel="noreferrer">Go to website</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Links