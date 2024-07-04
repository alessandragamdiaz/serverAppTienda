
"use client"
import { UserProps, createBulkUsers, deleteUsers } from "@/lib/action/users";
import { User } from "@prisma/client";
import React, { useState } from "react";
import * as XLSX from "xlsx";


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../customui/ImageUpload";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Delete from "../customui/Delete";
import MultiText from "../customui/MultiText";
import MultiSelect from "../customui/MultiSelect";
import Loader from "../customui/Loader";

const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
  media: z.array(z.string()),
  category: z.string(),
  collections: z.array(z.string()),
  tags: z.array(z.string()),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  price: z.coerce.number().min(0.1),
  expense: z.coerce.number().min(0.1),
});

interface ProductFormProps {
  initialData?: ProductType | null; //Must have "?" to make it optional
}




export default function UserTable({ users }: { users: User[] }) {



  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState<CollectionType[]>([]);
    const [file,setFile]=useState<File |null>(null)
  const [jsonData,setJsonData]=useState("")

  console.log(file)
 

 function previewData() {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          // SheetName
          const sheetName = workbook.SheetNames[0];
          // Worksheet
          const workSheet = workbook.Sheets[sheetName];
          // Json
          const json = XLSX.utils.sheet_to_json(workSheet);
          setJsonData(JSON.stringify(json, null, 2));
        }
      };
      reader.readAsBinaryString(file);
    }
  }
  function saveData() {
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          // SheetName
          const sheetName = workbook.SheetNames[0];
          // Worksheet
          const workSheet = workbook.Sheets[sheetName];
          // Json
          const json: UserProps[] = XLSX.utils.sheet_to_json(workSheet);
          //Save to the DB
          try {
            // console.log(json);
            await createBulkUsers(json);
            setLoading(false);
          } catch (error) {
            console.log(error);
          }
        }
      };
      reader.readAsBinaryString(file);
    }
  }
  async function clearData() {
    try {
      await deleteUsers();
    } catch (error) {
      console.log(error);
    }
  }
     const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
   
    defaultValues: 
       {
          title: "h0la",
          description: "xxs",
          media: ["dcsdc","sdcd"],
          category: "dcsdc",
          collections: ["sdcsdc"],
          tags: ["dcsd"],
          sizes: ["dcscd"],
          colors: ["sdcsd"],
          price: 0.1,
          expense: 0.1,
        },
  });

   const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const url =  "/api/products";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success(`Product ${ "created"}`);
        window.location.href = "/products";
        router.push("/products");
      }
    } catch (err) {
      console.log("[products_POST]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };





  return (
    <div className='py-8 space-y-8'>
        <div className='flex items-center gap-8'>

<div className=''>

<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
<input className="block w-full text-sm
 text-gray-900 border border-gray-300 
 rounded-lg cursor-pointer bg-gray-50
  dark:text-gray-400 focus:outline-none 
  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
  id="file_input" type="file" accept=".xls,.xlsx" onChange={(e)=>setFile(e.target.files? e.target.files[0]:null)}/>



</div>
<button  type="submit"  className='py-2 px-6 rounded bg-slate-300 text-slate-900'     onClick={previewData}>
    preview data


</button>
<button className='py-2 px-6 rounded bg-purple-600 text-slate-900'     onClick={saveData}>
   save data


</button>
<button className='py-2 px-6 rounded bg-red-300 text-slate-900'     onClick={clearData}>
   clear data


</button>

          </div>
      <pre>{jsonData}</pre>
      {loading ? (
        <p>Saving Data please wait...</p>
      ) : (


<div className="relative overflow-x-auto">
        {users && users.length > 0 && (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Color
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                 <th scope="col" className="px-6 py-3">
                 collection
                </th>
                 <th scope="col" className="px-6 py-3">
                 collection
                </th>
                 <th scope="col" className="px-6 py-3">
                 collection
                </th>
                 <th scope="col" className="px-6 py-3">
                 collection
                </th>
               
                  <th scope="col" className="px-6 py-3">
                    descripcion
                </th>
                  <th scope="col" className="px-6 py-3">
             expense
                </th>
                 <th scope="col" className="px-6 py-3">
                    Price
                </th>
            </tr>
        </thead>
        <tbody>
               {users.map((user) => {
                  return (
            <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                       {user.title}
                </th>
                         <td className="px-6 py-4">{user.description}</td>
                      <td className="px-6 py-4">{user.media}</td>
                       <td className="px-6 py-4">{user.category}</td>
                        <td className="px-6 py-4">{user.collections}</td>
                         <td className="px-6 py-4">{user.category}</td>
                          <td className="px-6 py-4">{user.tags}</td>
                           <td className="px-6 py-4">{user.colors}</td>
                            <td className="px-6 py-4">{user.sizes}</td>
                             <td className="px-6 py-4">{user.price}</td>
                                <td className="px-6 py-4">{user.expense}</td>
                      <td>   </td>
                
            </tr>
                 );
                })}

        </tbody>
    </table>
      )}
</div>
   )}

      
    </div>
  )
}


