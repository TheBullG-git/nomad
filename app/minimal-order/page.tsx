"use client"

import type React from "react"

import { useState } from "react"

export default function MinimalOrderPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [service, setService] = useState("mobile-gym")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Just log to console for now
      console.log("Order submitted:", { name, email, phone, service })
      setMessage("Order received! We will contact you soon.")

      // Reset form
      setName("")
      setEmail("")
      setPhone("")
      setService("mobile-gym")
    } catch (error) {
      console.error("Error:", error)
      setMessage("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Place Your Order</h1>

      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{message}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Service</label>
          <select value={service} onChange={(e) => setService(e.target.value)} className="w-full p-2 border rounded">
            <option value="mobile-gym">Mobile Gym Session - Rs.100</option>
            <option value="personal-training">Personal Training - Rs.75</option>
            <option value="group-fitness">Group Fitness Class - Rs.50</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          Submit Order
        </button>
      </form>
    </div>
  )
}
