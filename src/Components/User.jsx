// import React, { useState, useEffect } from "react";
// import "../App.css";
// import { db } from "../../src/Firebase";
// import {
//   collection,
//   getDocs,
//   addDoc,
//   updateDoc,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
// import { useTable, useFilters, useSortBy } from 'react-table';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// function User() {
//   const [newName, setNewName] = useState("");
//   const [newStatus, setNewStatus] = useState("");
//   const [newGender, setNewGender] = useState("");
//   const [newDate, setNewDate] = useState(new Date());
//   const [message, setMessage] = useState("");
//   const [users, setUsers] = useState([]);
//   const usersCollectionRef = collection(db, "users");

//   useEffect(() => {
//     const getUsers = async () => {
//       const data = await getDocs(usersCollectionRef);
//       setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//     };

//     getUsers();
//   }, []); // Fetch data only once when component mounts

//   const createUser = async () => {
//     const currentDate = new Date().toLocaleDateString(); // Get current date
//     await addDoc(usersCollectionRef, {
//       name: newName,
//       status: newStatus,
//       gender: newGender,
//       dateAdded: currentDate, // Add dateAdded to the user object
//     });
//     setMessage("User added successfully!"); 
//     // Update users state after adding user
//     setUsers([...users, { name: newName, status: newStatus, gender: newGender, dateAdded: currentDate }]);
//     // Clear input fields after adding user
//     setNewName("");
//     setNewStatus("");
//     setNewGender("");
//   };

//   const updateUser = async (id, status) => {
//     const userDoc = doc(db, "users", id);
//     const newFields = { status: status === "active" ? "past" : "active" };
//     await updateDoc(userDoc, newFields);
//     setMessage("User status updated successfully!"); 
//     // Update users state after updating user status
//     setUsers(users.map(user => user.id === id ? { ...user, status: newFields.status } : user));
//   };

//   const deleteUser = async (id) => {
//     const userDoc = doc(db, "users", id);
//     await deleteDoc(userDoc);
//     setMessage("User deleted successfully!"); 
//     // Update users state after deleting user
//     setUsers(users.filter(user => user.id !== id));
//   };

//   const columns = React.useMemo(
//     () => [
//       {
//         Header: 'Name',
//         accessor: 'name',
//       },
//       {
//         Header: 'Status',
//         accessor: 'status',
//         Filter: SelectColumnFilter,
//       },
//       {
//         Header: 'Gender',
//         accessor: 'gender',
//         Filter: SelectColumnFilter,
//       },
//       {
//         Header: 'Date Added',
//         accessor: 'dateAdded',
//         Filter: DateColumnFilter,
//       },
//     ],
//     []
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//   } = useTable(
//     { columns, data: users },
//     useFilters,
//     useSortBy
//   );

//   return (
//     <div className="container  shadow p-4 rounded bg-gradient">
//       <table {...getTableProps()} className="table table-dark table-striped rounded">
//         <thead>
//           {headerGroups.map(headerGroup => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map(column => (
//                 <th {...column.getHeaderProps(column.getSortByToggleProps())}>
//                   {column.render('Header')}
//                   <span>
//                     {column.isSorted ? (column.isSortedDesc ? ' <i class="bi bi-caret-up-fill text-white"></i>' : ' <i class="bi bi-caret-down-fill text-white"></i>') : ''}
//                   </span>
//                   <div>{column.canFilter ? column.render('Filter') : null}</div>
//                 </th>
//               ))}
//               <th>Action</th>
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map(row => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map(cell => {
//                   return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//                 })}
//                 <td>
//                   <button
//                     onClick={() => updateUser(row.original.id, row.original.status)}
//                     className="btn btn-secondary me-2 animate__animated animate__rubberBand table-compo3"
//                   >
//                     Toggle Status
//                   </button>
//                   <button
//                     onClick={() => deleteUser(row.original.id)}
//                     className="btn btn-danger animate__animated animate__rubberBand table-compo2"
//                   >
//                     Delete User
//                   </button>
//                 </td>
//               </tr>
//             )
//           })}
//         </tbody>
//       </table>
//       <div className="row">
//         <div className="col-md-3">
//           <input
//             placeholder="Name..."
//             className="form-control"
//             value={newName}
//             onChange={(event) => setNewName(event.target.value)}
//           />
//           <input
//             placeholder="Status..."
//             className="form-control mt-2"
//             value={newStatus}
//             onChange={(event) => setNewStatus(event.target.value)}
//           />
//           <input
//             placeholder="Gender..."
//             className="form-control mt-2"
//             value={newGender}
//             onChange={(event) => setNewGender(event.target.value)}
//           />
//           <DatePicker
//             selected={newDate}
//             onChange={(date) => setNewDate(date)}
//             className="form-control mt-2"
//             placeholderText="Select Date"
//           />
//           <button onClick={createUser} className="btn btn-success mt-3 animate__animated animate__rubberBand table-compo">
//             Create User
//           </button>
//           {message && <div className="mt-3">{message}</div>}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default User;

// // Filter for Select
// function SelectColumnFilter({ column }) {
//   const { filterValue, setFilter } = column;
//   return (
//     <select
//       value={filterValue}
//       onChange={e => {
//         setFilter(e.target.value || undefined);
//       }}
//     >
//       <option value="">All</option>
//       <option value="active">Active</option>
//       <option value="past">Past</option>
//     </select>
//   );
// }

// // Filter for Date
// function DateColumnFilter({ column: { filterValue, setFilter } }) {
//   return (
//     <DatePicker
//       selected={(filterValue && new Date(filterValue)) || null}
//       onChange={date => {
//         setFilter(date || undefined);
//       }}
//       isClearable
//       showYearDropdown
//       dateFormat="MM/dd/yyyy"
//       className="form-control"
//     />
//   );
// }


import React, { useState, useEffect } from "react";
import "../App.css";
import { db } from "../../src/Firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useTable, useSortBy } from 'react-table'; // Import useSortBy hook here
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function User() {
  const [newName, setNewName] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newGender, setNewGender] = useState("");
  const [newDate, setNewDate] = useState(new Date());
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []); // Fetch data only once when component mounts

  const createUser = async () => {
    const currentDate = new Date().toLocaleDateString(); // Get current date
    await addDoc(usersCollectionRef, {
      name: newName,
      status: newStatus,
      gender: newGender,
      dateAdded: currentDate, // Add dateAdded to the user object
    });
    setMessage("User added successfully!"); 
    // Update users state after adding user
    setUsers([...users, { name: newName, status: newStatus, gender: newGender, dateAdded: currentDate }]);
    // Clear input fields after adding user
    setNewName("");
    setNewStatus("");
    setNewGender("");
  };

  const updateUser = async (id, status) => {
    const userDoc = doc(db, "users", id);
    const newFields = { status: status === "active" ? "past" : "active" };
    await updateDoc(userDoc, newFields);
    setMessage("User status updated successfully!"); 
    // Update users state after updating user status
    setUsers(users.map(user => user.id === id ? { ...user, status: newFields.status } : user));
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    setMessage("User deleted successfully!"); 
    // Update users state after deleting user
    setUsers(users.filter(user => user.id !== id));
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ cell: { value } }) => (
          <span style={{ color: value.toLowerCase() === 'active' ? 'green' : 'red' }}>{value}</span>
        )
      },
      {
        Header: 'Gender',
        accessor: 'gender',
      },
      {
        Header: 'Date Added',
        accessor: 'dateAdded',
        sortType: 'datetime',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: users }, useSortBy); // Add useSortBy hook here

  return (
    <div className="container  shadow p-4 rounded bg-gradient">
      <table {...getTableProps()} className="table table-dark table-striped rounded">
      <thead>
  {headerGroups.map(headerGroup => (
    <tr {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map(column => (
        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
  {column.render('Header')}
  <span>
    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
  </span>
</th>

      ))}
      <th>Action</th>
    </tr>
  ))}
</thead>

        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
                <td>
                  <button
                    onClick={() => updateUser(row.original.id, row.original.status)}
                    className="btn btn-secondary me-2 animate__animated animate__rubberBand table-compo3"
                  >
                    Toggle Status
                  </button>
                  <button
                    onClick={() => deleteUser(row.original.id)}
                    className="btn btn-danger animate__animated animate__rubberBand table-compo2"
                  >
                    Delete User
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="row">
        <div className="col-md-3">
          <input
            placeholder="Name..."
            className="form-control"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
          <input
            placeholder="Status..."
            className="form-control mt-2"
            value={newStatus}
            onChange={(event) => setNewStatus(event.target.value)}
          />
          <input
            placeholder="Gender..."
            className="form-control mt-2"
            value={newGender}
            onChange={(event) => setNewGender(event.target.value)}
          />
          <DatePicker
            selected={newDate}
            onChange={(date) => setNewDate(date)}
            className="form-control mt-2"
            placeholderText="Select Date"
          />
          <button onClick={createUser} className="btn btn-success mt-3 animate__animated animate__rubberBand table-compo">
            Create User
          </button>
          {message && <div className="mt-3">{message}</div>}
        </div>
      </div>
    </div>
  );
}

export default User;

