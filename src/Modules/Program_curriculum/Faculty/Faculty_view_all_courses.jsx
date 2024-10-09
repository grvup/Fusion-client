// import React, { useState, useEffect } from 'react';
// import { Table, Button, Loader } from '@mantine/core'; // Import Mantine components

// const Courses = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch data from Django backend API
//     fetch('http://127.0.0.1:8000/api/courses/') // Replace with your actual Django API URL
//       .then((response) => response.json())
//       .then((data) => {
//         setCourses(data); // Assuming the data is an array of courses
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching course data:", error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <Loader />; // Show loader while loading
//   }

//   return (
//     <div>
//       <h1>Course Table</h1>
//       <Table>
//         <thead>
//           <tr>
//             <th>Course Code</th>
//             <th>Course Name</th>
//             <th>Version</th>
//             <th>Credits</th>
//             <th>Edit</th> {/* Adding Edit column */}
//           </tr>
//         </thead>
//         <tbody>
//           {courses.map((course, index) => (
//             <tr key={index}>
//               <td>{course.code}</td>
//               <td>{course.name}</td>
//               <td>{course.version}</td>
//               <td>{course.credits}</td>
//               <td>
//                 <Button 
//                   component="a" 
//                   href={`/edit-course/${course.code}`} 
//                   variant="outline" 
//                   color="blue" 
//                   size="xs"
//                 >
//                   Edit
//                 </Button>
//               </td> {/* Adding Edit button */}
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default Courses;


import React, { useState, useEffect } from 'react';
import { Table, Loader, ScrollArea, Card, Button, TextInput, Select } from '@mantine/core';
import './Faculty_view_all_courses.css'; // Restoring your custom CSS
// import CourseDetailPage from './course_details';

const Faculty_view_all_courses = () => {

    const [selectedOption, setSelectedOption] = useState(null);


  // Uncomment for actual DB API call
  // const [courses, setCourses] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Fetch data from Django backend API
  //   fetch('http://127.0.0.1:8000/api/courses/') // Replace with your actual Django API URL
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCourses(data); // Assuming the data is an array of courses
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching course data:", error);
  //       setLoading(false);
  //     });
  // }, []);

  // Temporary mock data for testing
  const courses = [
    { code: "NS205c", name: "Discrete Mathematics", version: "1.0", credits: 4 },
    { code: "NS205i", name: "Culture and Science - comparison", version: "1.0", credits: 4 },
    { code: "EC2002", name: "Digital Electronics and Microprocessor Interfacing", version: "1.0", credits: 4 },
    { code: "Mathematics", name: "Mechatronics", version: "1.0", credits: 4 },
    { code: "Design", name: "Design", version: "1.0", credits: 4 },
    { code: "Natural Sciences", name: "Natural Science-Mathematics", version: "1.0", credits: 4 },
    { code: "Humanities - English", name: "Humanities - English", version: "1.0", credits: 4 },
    { code: "NS205c", name: "Discrete Mathematics", version: "1.0", credits: 4 },
    { code: "NS205i", name: "Culture and Science - comparison", version: "1.0", credits: 4 },
    { code: "EC2002", name: "Digital Electronics and Microprocessor Interfacing", version: "1.0", credits: 4 },
    { code: "Mathematics", name: "Mechatronics", version: "1.0", credits: 4 },
    { code: "Design", name: "Design", version: "1.0", credits: 4 },
    { code: "Natural Sciences", name: "Natural Science-Mathematics", version: "1.0", credits: 4 },
    { code: "Humanities - English", name: "Humanities - English", version: "1.0", credits: 4 },
    { code: "NS205c", name: "Discrete Mathematics", version: "1.0", credits: 4 },
    { code: "NS205i", name: "Culture and Science - comparison", version: "1.0", credits: 4 },
    { code: "EC2002", name: "Digital Electronics and Microprocessor Interfacing", version: "1.0", credits: 4 },
    { code: "Mathematics", name: "Mechatronics", version: "1.0", credits: 4 },
    { code: "Design", name: "Design", version: "1.0", credits: 4 },
    { code: "Natural Sciences", name: "Natural Science-Mathematics", version: "1.0", credits: 4 },
    { code: "Humanities - English", name: "Humanities - English", version: "1.0", credits: 4 }
  ];

  // if (loading) {
  //   return <Loader />; // Show loader while loading
  // }

  return (
    <div className="courses-container"> {/* Main flex container */}
      <div className="courses-table-section"> {/* Left side: Table */}
  
          <ScrollArea className='courses-scroll-area'> {/* Adjust height as needed */}
        <Card shadow="sm" padding="lg" radius="md" withBorder className="courses-card-container">
          
          {/* Adding scroll area for table */}
            <Table highlightOnHover striped className="courses-table">
              <thead className="courses-table-header">
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Version</th>
                  <th>Credits</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index} className="courses-table-row">
                    <td><a href='#'>{course.code}</a></td>
                    <td>{course.name}</td>
                    <td>{course.version}</td>
                    <td>{course.credits}</td>
                    <td>
                      {/* <Button
                        component="b"
                        href={`/edit-course/${course.code}`}
                        className="courses-edit-button"
                      >
                        Edit
                      </Button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
        </Card>
          </ScrollArea>
      </div>
  
      <div className="courses-form-section"> {/* Right side: Form */}
        {/* <Button component='b' className='courses-edit-button' style={{ padding: '10px' }}>ADD COURSE</Button> */}
  
        <Card shadow="sm" padding="lg" radius="md" withBorder className="courses-search-card">
          <h4 className="courses-form-title">FILTER SEARCH</h4>
  
          <ScrollArea>
            <label>Code contains</label>
            <TextInput placeholder="Code contains:" className="courses-input-field" />
            <label>Name contains</label>
            <TextInput placeholder="Name contains:" className="courses-input-field" />
            <label>Version</label>
            <TextInput placeholder="Version:" className="courses-input-field" />
  
            <Select
              label="Working course:"
              placeholder="Unknown"
              data={['Unknown', 'Yes', 'No']}
              value={selectedOption}
              onChange={setSelectedOption}
              className="courses-select-field"
            />
          </ScrollArea>
          <Button component='b' fullWidth className="courses-edit-button">Search</Button>
        </Card>
      </div>
    </div>
  );
  
};

export default Faculty_view_all_courses;

