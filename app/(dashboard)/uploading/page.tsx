
import UserTable from "@/components/usertable/UserTable";

import { getUsers } from "@/lib/action/users";

import React from "react";

export default async function Uploading() {
  const users = (await getUsers()) || [];

  return (
    
    <div className="px-10 py-5">
      
   
    <UserTable users={users} />
    </div>
  );
};

