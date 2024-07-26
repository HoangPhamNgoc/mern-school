import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotices } from '../redux/noticeRelated/noticeHandle';
import { Paper } from '@mui/material';
import TableViewTemplate from './TableViewTemplate';

const SeeNotice = () => {
    const dispatch = useDispatch();
    const { currentUser, currentRole } = useSelector(state => state.user);
    const { noticesList, loading, error, response } = useSelector(state => state.notice);

    useEffect(() => {
        const id = currentRole === "Admin" ? currentUser._id : currentUser.school._id;
        dispatch(getAllNotices(id, "Notice"));
    }, [dispatch, currentRole, currentUser]);

    if (error) {
        console.error(error);
    }

    const noticeColumns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'details', label: 'Details', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
    ];

    const noticeRows = noticesList.map(notice => ({
        title: notice.title,
        details: notice.details,
        date: new Date(notice.date).toISOString().substring(0, 10),
        id: notice._id,
    }));

    return (
        <div style={{ marginTop: '50px', marginRight: '20px' }}>
            {loading ? (
                <div style={{ fontSize: '20px' }}>Loading...</div>
            ) : response ? (
                <div style={{ fontSize: '20px' }}>No Notices Right Now</div>
            ) : (
                <>
                    <h3 style={{ fontSize: '30px', marginBottom: '40px' }}></h3>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        {noticesList.length > 0 && <TableViewTemplate columns={noticeColumns} rows={noticeRows} />}
                    </Paper>
                </>
            )}
        </div>
    );
};

export default SeeNotice;