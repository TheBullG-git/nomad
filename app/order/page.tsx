"use client"

import type React from "react"

import { useState } from "react"

export default function OrderPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [service, setService] = useState("mobile-gym")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Order submitted:", { name, email, phone, service })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto py-12">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h2>
          <p className="text-green-700">
            Your order has been received. We will contact you shortly to confirm your booking.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Place Your Order</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
            Service
          </label>
          <select
            id="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="mobile-gym">Mobile Gym Session - Rs.100</option>
            <option value="personal-training">Personal Training - Rs.75</option>
            <option value="group-fitness">Group Fitness Class - Rs.50</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Submit Order
        </button>
      </form>
    </div>
  )
}
