export const calculateSubjectAttendancePercentage = (presentCount, totalSessions) => {
    return totalSessions === 0 ? 0 : ((presentCount / totalSessions) * 100).toFixed(2);
};

export const groupAttendanceBySubject = (subjectAttendance) => {
    return subjectAttendance.reduce((acc, attendance) => {
        const { subName: { subName, sessions, _id }, status, date } = attendance;
        if (!acc[subName]) {
            acc[subName] = { present: 0, absent: 0, sessions, allData: [], subId: _id };
        }
        acc[subName][status.toLowerCase()]++;
        acc[subName].allData.push({ date, status });
        return acc;
    }, {});
};

export const calculateOverallAttendancePercentage = (subjectAttendance) => {
    const { totalSessionsSum, presentCountSum } = subjectAttendance.reduce((acc, attendance) => {
        const { subName: { _id, sessions }, status } = attendance;
        if (!acc.uniqueSubIds.includes(_id)) {
            acc.totalSessionsSum += parseInt(sessions);
            acc.uniqueSubIds.push(_id);
        }
        acc.presentCountSum += status === "Present" ? 1 : 0;
        return acc;
    }, { totalSessionsSum: 0, presentCountSum: 0, uniqueSubIds: [] });

    return totalSessionsSum === 0 ? 0 : (presentCountSum / totalSessionsSum) * 100;
};