import './App.css'
import Home from "./components/Home"
import React from 'react'


const App = () => {
  return (
    <div className="flex flex-col item-center justify-centerh-screen overflow-hidden bg-gray-100 py-8 px-4 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-gray-800 mb-2">AI Image Enhancer</h1>
        <p className="text-lg text-gray-500">Upload your Image and let AI enhance in seconds</p>
      </div>

      <Home/>

      <div className="text-sm text-gray-500 mt-6">
        Power by @ImageAI
      </div>
      
    </div>
  )
}

export default App
