/* eslint-disable @typescript-eslint/no-explicit-any */
export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js')
      console.log('Service Worker registered successfully:', registration.scope)

      return registration
    } catch (error) {
      console.error('Service Worker registration failed:', error)
    }
  }
}

export function scheduleNotification({
  time,
  title,
  body,
  icon,
  tag,
  data,
}: {
  time: number
  title: string
  body: string
  icon?: string
  tag: string
  data?: any
}) {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'SCHEDULE_NOTIFICATION',
      time,
      title,
      body,
      icon,
      tag,
      data,
    })
  }
}