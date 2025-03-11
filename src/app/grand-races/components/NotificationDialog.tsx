'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { registerServiceWorker, scheduleNotification } from '@/lib/serviceWorkerRegistration'
import { Label } from '@/components/ui/label'

interface NotificationDialogProps {
  isOpen: boolean
  onClose: () => void
  eventTime: string
  location: string
  vehicles: string
}

export function NotificationDialog({
  isOpen,
  onClose,
  eventTime,
  location,
  vehicles,
}: NotificationDialogProps) {
  const [notificationTime, setNotificationTime] = useState(5)

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      console.log('This browser does not support desktop notifications')
      return
    }

    if (Notification.permission === 'granted') {
      handleNotification()
      console.log('Notification permission already granted')
    } else if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        handleNotification()
        console.log('Notification permission granted')
      } else {
        console.log('Notification permission denied')
      }
    }
  }

  useEffect(() => {
    registerServiceWorker()
    console.log('Service worker registered')
  }, [])

  const handleNotification = () => {
    try {
      // Parse the event time string (expected format: "DD/MM, HH:mm")
      const [datePart, timePart] = eventTime.split(', ');
      const [day, month] = datePart.split('/');
      const [hours, minutes] = timePart.split(':');
      
      const now = new Date();
      const currentYear = now.getFullYear();
      const eventDate = new Date(
        currentYear,
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hours),
        parseInt(minutes)
      );
      
      // If the date is in the past for the current year, try next year
      if (eventDate.getTime() < now.getTime()) {
        eventDate.setFullYear(currentYear + 1);
      }
      
      // Validate if the date is valid
      if (isNaN(eventDate.getTime())) {
        throw new Error('Invalid event date format. Please use DD/MM, HH:mm');
      }

      const notificationDate = new Date(eventDate.getTime() - notificationTime * 60 * 1000);

      if (notificationDate.getTime() <= now.getTime()) {
        throw new Error('Cannot set notification for past events');
      }

      const tag = `event-${eventDate.getTime()}`;
      scheduleNotification({
        time: notificationDate.getTime(),
        title: 'Motorfest Event Starting Soon!',
        body: `Event starts in ${notificationTime} minutes at ${location}\n${vehicles}`,
        icon: '/favicon.ico',
        tag,
        data: {
          url: window.location.href,
          eventTime,
          location,
          vehicles
        }
      });
      console.log(`Notification scheduled for ${notificationDate.toLocaleString()} (tag: ${tag})`);

      onClose();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to schedule notification');
      console.error('Notification scheduling error:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Event Reminder</DialogTitle>
          <DialogDescription>
            Set a reminder for the event at {eventTime}
            <br />
            {location} - {vehicles}
          </DialogDescription>
        </DialogHeader>
        <Label className="text-center">How many minutes before event set notification</Label>
        <div className="flex justify-center space-x-2 pb-4 pt-2">
          {[0, 1, 5, 10, 15, 20,].map((minutes) => (
            <Badge
              key={minutes}
              variant={notificationTime === minutes ? 'default' : 'secondary'}
              className="cursor-pointer"
              onClick={() => setNotificationTime(minutes)}
            >
              {minutes} min
            </Badge>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={requestNotificationPermission}>Set Reminder</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}