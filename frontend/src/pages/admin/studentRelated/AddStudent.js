import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';
import { underControl } from '../../../redux/userRelated/userSlice';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { CircularProgress } from '@mui/material';

const AddStudent = ({ situation }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id: sclassId } = useParams();
    const { status, currentUser, response, error } = useSelector(state => state.user);
    const { sclassesList } = useSelector(state => state.sclass);

    const [name, setName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('');
    const [className, setClassName] = useState('');
    const [sclassName, setSclassName] = useState(situation === "Class" ? sclassId : '');
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        dispatch(getAllSclasses(currentUser._id, "Sclass"));
    }, [currentUser._id, dispatch]);

    const changeHandler = (event) => {
        const selectedClass = sclassesList.find(classItem => classItem.sclassName === event.target.value);
        setClassName(selectedClass?.sclassName || 'Select Class');
        setSclassName(selectedClass?._id || '');
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (!sclassName) {
            setMessage("Please select a classname");
            setShowPopup(true);
        } else {
            setLoader(true);
            dispatch(registerUser({ name, rollNum, password, sclassName, adminID: currentUser._id, role: "Student", attendance: [] }, "Student"));
        }
    };

    useEffect(() => {
        if (status === 'added') {
            dispatch(underControl());
            navigate(-1);
        } else if (status === 'failed' || status === 'error') {
            setMessage(status === 'failed' ? response : "Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <>
            <div className="register">
                <form className="registerForm" onSubmit={submitHandler}>
                    <span className="registerTitle">Add Student</span>
                    <label>Name</label>
                    <input className="registerInput" type="text" placeholder="Enter student's name..." value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
                    {situation === "Student" && (
                        <>
                            <label>Class</label>
                            <select className="registerInput" value={className} onChange={changeHandler} required>
                                <option value='Select Class'>Select Class</option>
                                {sclassesList.map((classItem, index) => (
                                    <option key={index} value={classItem.sclassName}>{classItem.sclassName}</option>
                                ))}
                            </select>
                        </>
                    )}
                    <label>Roll Number</label>
                    <input className="registerInput" type="number" placeholder="Enter student's Roll Number..." value={rollNum} onChange={(e) => setRollNum(e.target.value)} required />
                    <label>Password</label>
                    <input className="registerInput" type="password" placeholder="Enter student's password..." value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" required />
                    <button className="registerButton" type="submit" disabled={loader}>
                        {loader ? <CircularProgress size={24} color="inherit" /> : 'Add'}
                    </button>
                </form>
            </div>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default AddStudent;