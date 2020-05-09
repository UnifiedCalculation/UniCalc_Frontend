import React, {useEffect, useState} from 'react';
import UserAdd from "./userAdd";
import UserTable from "./userTable";
import * as API from "../../../connectionHandler/connectionHandler";

export default function UserOverview({setErrorMessage}) {

  const [employees, setEmployees] = useState([])

  const getEmployees = () => {
    API.getEmployees(setErrorMessage, setEmployees);
  }

  useEffect(() => {
    getEmployees();
  },[])

  return (
      <div>
        <UserAdd/>
        <UserTable setErrorMessage={setErrorMessage} employees={employees} getEmployees={getEmployees}/>
      </div>
  );
}