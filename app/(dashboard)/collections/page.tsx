"use client"
import {useEffect,useState } from 'react'
import { useRouter } from 'next/navigation'
import { DataTable } from '@/components/customui/DataTable'
import { columns } from '@/components/collection/CollectionColumns'
import { Plus } from 'lucide-react'
import { Separator } from "@/components/ui/separator";
import { Button } from '@/components/ui/button'



const Collections = () => {

  // lectura de coleccionde data base usando loaading

  const router = useRouter();

  const [loading,setLoading] = useState(true)
  const [collections, setCollection] = useState([])
  const getCollection = async () => {
    try{
const res = await fetch ("/api/collections",{
 method: "GET",
})
const data = await res.json()
setCollection(data)
setLoading(false)
    }catch (err) {
      console.log("[collections_GET]",err)
    }
  }
  
  useEffect(()=>{
getCollection()

  },[])
  
  return (
    <div className="px-10 py-5">
        <div className="flex items-center justify-between">
<p className='text-heading2-bold'>COLECCION</p>
{/* cuando quieras agregar funciones usas onClick , router sierve para dirijir links con herfs*/}
<Button className='bg-blue-1 text-white' onClick={() => router.push("/collections/new")}>
  <Plus className="h-4 w-4 mr-2"/>
 CREAR COLECCION
</Button>
    </div>
    <Separator className='bg-grey-1 my-4'/>
      <DataTable columns={columns} data={collections} searchKey='title' />
    </div>
  )
}

export default Collections
