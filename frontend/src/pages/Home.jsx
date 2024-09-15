import React from 'react'
import Hero from "../components/Hero"
import Popular from '../components/Popular'
import Offer from '../components/Offer'
import NewCollections from '../components/NewCollections'

const Home = () => {
  return (
    <>
      <Hero />
      <Popular/>
      <Offer />
      <NewCollections/>
    </>
  )
}

export default Home
 