import { useState } from 'react'
import { X, Mic, Phone } from 'lucide-react'

interface MarissaWidgetProps {
  onLeadCapture?: (lead: LeadData) => void
}

interface LeadData {
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  propertyType: string
  currentPremium?: string
  claims?: string
  timestamp: string
}

export default function MarissaWidget({ onLeadCapture }: MarissaWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCallActive, setIsCallActive] = useState(false)
  const [leadData, setLeadData] = useState<LeadData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    propertyType: '',
    currentPremium: '',
    claims: '',
    timestamp: new Date().toISOString(),
  })

  const RETELL_API_KEY = import.meta.env.VITE_RETELL_API_KEY || 'key_default'
  const RETELL_AGENT_ID = import.meta.env.VITE_RETELL_AGENT_ID || 'agent_134233000b3a5d6ae97f1a0d60'

  const startCall = async () => {
    setIsCallActive(true)

    try {
      // Initialize Retell call
      const response = await fetch('https://api.retellai.com/v2/call', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RETELL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agent_id: RETELL_AGENT_ID,
          variables: {
            firstName: leadData.firstName || 'Friend',
            company: 'T&C Insurance',
            context: 'Citizens non-renewal support',
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`Retell API error: ${response.status}`)
      }

      const callData = await response.json()
      console.log('Call started:', callData)

      // Simulate call completion after 2 minutes
      setTimeout(() => {
        finishCall()
      }, 120000)
    } catch (error) {
      console.error('Failed to start call:', error)
      alert('Unable to connect. Please try again or call us at 407-337-1135')
      setIsCallActive(false)
    }
  }

  const finishCall = async () => {
    setIsCallActive(false)

    // Auto-submit to QuoteRUSH
    if (leadData.firstName && leadData.email) {
      try {
        const response = await fetch('/api/submit-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...leadData,
            source: 'marissa_voice_widget',
            timestamp: new Date().toISOString(),
          }),
        })

        if (response.ok) {
          console.log('Lead submitted to QuoteRUSH')
          onLeadCapture?.(leadData)
          alert(`Thanks ${leadData.firstName}! Check your email for quotes within 2 hours.`)
          setIsOpen(false)
          setLeadData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            city: '',
            propertyType: '',
            currentPremium: '',
            claims: '',
            timestamp: new Date().toISOString(),
          })
        }
      } catch (error) {
        console.error('Failed to submit lead:', error)
      }
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-full shadow-2xl transition transform hover:scale-110 flex items-center gap-2 z-40"
      >
        <Mic className="w-5 h-5" />
        Talk to Marissa
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white rounded-lg shadow-2xl z-50 overflow-hidden">
      {/* Header */}
      <div className="bg-green-600 text-white px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Mic className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-bold">Marissa</h3>
            <p className="text-xs text-green-100">T&C Insurance Agent</p>
          </div>
        </div>
        <button
          onClick={() => {
            setIsOpen(false)
            setIsCallActive(false)
          }}
          className="text-white hover:bg-green-700 p-2 rounded"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="p-4 max-h-96 overflow-y-auto">
        {!isCallActive ? (
          <div className="space-y-4">
            <p className="text-gray-700 font-semibold">
              Hi! I'm Marissa from T&C Insurance. Ready to find your Citizens replacement?
            </p>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="First name"
                value={leadData.firstName}
                onChange={(e) => setLeadData({ ...leadData, firstName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Last name"
                value={leadData.lastName}
                onChange={(e) => setLeadData({ ...leadData, lastName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={leadData.email}
                onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={leadData.phone}
                onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="City"
                value={leadData.city}
                onChange={(e) => setLeadData({ ...leadData, city: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <select
                value={leadData.propertyType}
                onChange={(e) => setLeadData({ ...leadData, propertyType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select property type...</option>
                <option value="home">Home</option>
                <option value="condo">Condo</option>
                <option value="rental">Rental Property</option>
              </select>
            </div>

            <button
              onClick={startCall}
              disabled={!leadData.firstName || !leadData.email || !leadData.propertyType}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition"
            >
              <Phone className="w-5 h-5" />
              Start Voice Call with Marissa
            </button>

            <p className="text-xs text-gray-500 text-center">
              Or call us: <strong>407-337-1135</strong>
            </p>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="mb-4 flex justify-center">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 bg-green-200 rounded-full animate-pulse"></div>
                <div className="absolute inset-2 bg-green-600 rounded-full flex items-center justify-center">
                  <Mic className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            <p className="text-gray-700 font-semibold mb-2">Call in progress...</p>
            <p className="text-sm text-gray-600 mb-4">
              Marissa is asking about your coverage needs
            </p>
            <button
              onClick={() => finishCall()}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              End Call
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
