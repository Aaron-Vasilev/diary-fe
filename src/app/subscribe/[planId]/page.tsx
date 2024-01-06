"use client"

import { useRouter } from 'next/navigation'
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { useAppDispatch } from "@/store/store"
import { setUser } from '@/store/slices/noteSlice'
import Loading from '@/app/login/loading'

export default function Sub({ params }) {
  return (
    <PayPalScriptProvider 
      options={{ 
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        components: 'buttons',
        intent: "subscription",
        vault: true
      }}
    >
      <Wrapper planId={params.planId} />
    </PayPalScriptProvider>
  )
}

function Wrapper({ planId }) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [{ isPending }] = usePayPalScriptReducer()

  async function approve(data: any) {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const user = await res.json()
    dispatch(setUser(user))
    router.push('/diary')
  }

  if (isPending) return <Loading />

  return (
    <PayPalButtons
      createSubscription={async (_details, actions) => {
        return actions.subscription
          .create({ plan_id: planId })
          .then((orderId) => {
            return orderId;
          })
      }}
      onApprove={approve}
      style={{ 
        label: "subscribe",
        color: "white",
        disableMaxWidth: true
      }}
    />
  )
}
