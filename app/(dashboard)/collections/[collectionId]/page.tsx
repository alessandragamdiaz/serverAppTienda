
"use client"

import { useEffect, useState } from 'react'
import Loader from '@/components/customui/Loader'

import CollectionForm from '@/components/collection/CollectionForm'


const CollectionDetails = ({ params }: { params: { collectionId: string }}) => {
 
    const [loading, setLoading] = useState(true)
    const [CollectionDetails, setCollectionDetails] = useState<CollectionType | null >(null)

    const getCollectionDetails = async () =>{


        try{
            const res = await fetch(`/api/collections/${params.collectionId}`, {
                method: "GET"
            })
            const data = await res.json()
            setCollectionDetails(data)
            setLoading(false)

        } catch (err){
console.log("[collectionId_GET]", err)

        }
    }

    useEffect(() =>{
        getCollectionDetails()
    }, [])
 
 
    return loading ? <Loader /> :(
  <CollectionForm initialData={CollectionDetails}/>
  )
}

export default CollectionDetails
