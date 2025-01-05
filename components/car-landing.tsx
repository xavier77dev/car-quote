'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function CarLanding() {
  const [formData, setFormData] = useState({
    model: '',
    name: '',
    email: 'pedro.vega.damian@gmail.com',
    phone: '',
    department: '',
    city: ''
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    console.log(response);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-12">
          {/* Car Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <Image
              src="https://images.unsplash.com/photo-1617469767053-d3b523a0b982?q=80&w=1200"
              alt="Luxury SUV"
              width={800}
              height={600}
              className="rounded-lg shadow-2xl object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent rounded-lg" />
            
            {/* Floating Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-4 left-4 right-4 flex justify-around bg-black/60 backdrop-blur-sm rounded-lg p-4"
            >
              {['360HP', '0-100 4.5s', '250km/h'].map((feature, index) => (
                <div key={index} className="text-center text-white">
                  <div className="font-bold">{feature}</div>
                  <div className="text-xs opacity-75">
                    {index === 0 ? 'Potencia' : index === 1 ? 'Aceleración' : 'Velocidad Máx'}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              ¡Cotiza tu nuevo vehículo!
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="model" className="text-gray-700">Selecciona un modelo</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, model: value })}>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="Elige un modelo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="suv">SUV Premium</SelectItem>
                    <SelectItem value="sedan">Sedán Ejecutivo</SelectItem>
                    <SelectItem value="sport">Sport Edition</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">Nombre completo</Label>
                <Input onChange={(e) => setFormData({...formData, name: e.target.value})} id="name" placeholder="Tu nombre" className="border-gray-300" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} id="email" type="email" placeholder="tu@email.com" className="border-gray-300" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700">Número celular</Label>
                <Input onChange={(e) => setFormData({...formData, phone: e.target.value})} id="phone" type="tel" placeholder="Tu número de contacto" className="border-gray-300" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department" className="text-gray-700">Departamento</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, department: value })}>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lima">Lima</SelectItem>
                      <SelectItem value="arequipa">Arequipa</SelectItem>
                      <SelectItem value="trujillo">Trujillo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" className="text-gray-700">Ciudad</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, city: value })}>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="city1">Ciudad 1</SelectItem>
                      <SelectItem value="city2">Ciudad 2</SelectItem>
                      <SelectItem value="city3">Ciudad 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Acepto la Política de Tratamiento de Datos
                </label>
              </div>

              <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white" size="lg">
                Enviar datos
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

