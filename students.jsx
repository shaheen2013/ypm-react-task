import { useCallback, useState } from 'react';
import StudentsPicker from '../components/StudentsPicker';
import StudentsTable from '../components/StudentsTable';
import { fetchStudentData, fetchSchoolData, fetchLegalguardianData } from '../utils';

const Students = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [schoolsData, setSchoolsData] = useState([]);
  const [legalguardiansData, setLegalguardiansData] = useState([]);

  const onStudentsPick = useCallback(async (studentIds) => {
    try {
        const studentsResponse = [];
        const schoolsResponse = [];
        const legalguardiansResponse = [];

        studentIds?.forEach(studentId => studentsResponse.push(fetchStudentData(studentId)))
        
        const _studentsData = await Promise.all(studentsResponse)
        
        _studentsData?.forEach(student => {
          const { schoolId, legalguardianId } = student;
          schoolsResponse.push(fetchSchoolData(schoolId));
          legalguardiansResponse.push(fetchLegalguardianData(legalguardianId));
        })
          
        setStudentsData(_studentsData)
        setSchoolsData(await Promise.all(schoolsResponse))
        setLegalguardiansData(await Promise.all(legalguardiansResponse));
    } catch (error) {
        // handle error
    }
  }, []);

  return (
    <>
      <StudentsPicker onPickHandler={onStudentsPick} />
      <StudentsTable
        studentsData={studentsData}
        schoolsData={schoolsData}
        LegalguardiansData={legalguardiansData}
      />
    </>
  );
};


export default Students;