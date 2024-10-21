"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const MAX_NUMBER = 90
const ANIMATION_DURATION = 0.5

export function TambolaAppComponent() {
  const [currentNumber, setCurrentNumber] = useState<number | null>(null)
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])
  const [availableNumbers, setAvailableNumbers] = useState<number[]>(
    Array.from({ length: MAX_NUMBER }, (_, i) => i + 1)
  )

  const selectNumber = () => {
    if (availableNumbers.length === 0) {
      alert("All numbers have been called!")
      return
    }

    const randomIndex = Math.floor(Math.random() * availableNumbers.length)
    const newNumber = availableNumbers[randomIndex]

    setCurrentNumber(newNumber)
    setSelectedNumbers(prev => [newNumber, ...prev])
    setAvailableNumbers(prev => prev.filter(num => num !== newNumber))
  }

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        selectNumber()
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [availableNumbers])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-gradient-x"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md">
        <h1 className="text-4xl font-bold text-white mb-8">Tambola Game</h1>
        
        <Card className="w-64 h-64 flex items-center justify-center mb-8 bg-white/80 backdrop-blur-sm">
          <CardContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentNumber}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: ANIMATION_DURATION }}
                className="text-8xl font-bold text-center"
              >
                {currentNumber || '?'}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>

        <Button 
          onClick={selectNumber} 
          size="lg"
          className="mb-8"
        >
          Next Number
        </Button>

        <Card className="w-full bg-white/80 backdrop-blur-sm">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Called Numbers</h2>
            <ScrollArea className="h-24">
              <div className="flex flex-wrap gap-2">
                {selectedNumbers.map((number, index) => (
                  <motion.div
                    key={number}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: ANIMATION_DURATION, delay: index * 0.1 }}
                    className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold"
                  >
                    {number}
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <p className="text-white mt-4">
          Press the button or hit the spacebar to call the next number
        </p>
      </div>
    </div>
  )
}