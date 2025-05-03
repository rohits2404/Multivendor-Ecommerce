import { getPayload } from 'payload'
import configPromise from "@payload-config"
import React from 'react'

const Home = async () => {

    const payload = await getPayload({
        config: configPromise,
    })

    const data = await payload.find({
        collection: "categories"
    })

    return (
        <div className='p-4'>
            {JSON.stringify(data,null,2)}
        </div>
    )
}

export default Home;