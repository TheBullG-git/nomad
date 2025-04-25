import { SimpleOrderForm } from "@/components/simple-order-form"

export default function OrderPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-8 text-center">Book Your Mobile Gym</h1>
        <SimpleOrderForm />
      </div>
    </div>
  )
}
