'use client'

import { useState, useEffect } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { NotificationDialog } from './NotificationDialog'
import scheduleData from '@/data/grandRacesSchedule.json'


// Constants for schedule rotation
const ROTATION_START = scheduleData.rotationStart
const ROTATION = scheduleData.rotation
const EVENT_DURATION = scheduleData.eventDuration // in seconds
const ROTATION_DURATION = ROTATION.length * EVENT_DURATION
const season = scheduleData.season

export function Schedule() {
  // Manage rotation offset and current time for live updates
  const [rotationOffset, setRotationOffset] = useState<number>(0)
  const [now, setNow] = useState<number>(Date.now())
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<{
    time: string
    location: string
    vehicles: string
  } | null>(null)




  useEffect(() => {
    // Restore notifications from localStorage on page load
    const restoreNotifications = () => {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('notification-')) {
          try {
            const data = JSON.parse(localStorage.getItem(key)!)
            const timeUntilEvent = data.time - Date.now()

            if (timeUntilEvent > 0) {
              setTimeout(() => {
                new Notification('Motorfest Event Starting!', {
                  body: `${data.location}\n${data.vehicles}`,
                  icon: '/favicon.ico',
                })
                localStorage.removeItem(key)
              }, timeUntilEvent)
            } else {
              localStorage.removeItem(key)
            }
          } catch (e) {
            console.error('Error restoring notification:', e)
            localStorage.removeItem(key)
          }
        }
      })
    }

    if ('Notification' in window && Notification.permission === 'granted') {
      restoreNotifications()
    }
  }, [])

  // Update time every minute if not manually rotated
  useEffect(() => {
    if (rotationOffset === 0) {
      const interval = setInterval(() => setNow(Date.now()), 60000)
      return () => clearInterval(interval)
    }
  }, [rotationOffset])

  // Change rotation on button click
  const rotateSchedule = (delta: number) => {
    setRotationOffset(rotationOffset + delta)
  }
  const rotateScheduleReturn = () => {
    setRotationOffset(0)
  }

  // Calculate current event index in live mode
  const currentEventIndex =
    rotationOffset === 0
      ? Math.floor(((now / 1000 - ROTATION_START) % ROTATION_DURATION) / EVENT_DURATION)
      : -1

  const timeDelta = now / 1000 - ROTATION_START
  const rotationDelta = Math.floor(timeDelta / ROTATION_DURATION)
  let eventTime = ROTATION_START + (rotationDelta + rotationOffset) * ROTATION_DURATION

  const rows = ROTATION.map((event, i) => {
    // Replace abbreviations with full names
    const eventText = event[1]
      .replace(/AGP/g, 'Alpha GP')
      .replace(/RR/g, 'Rally Raid')
      .replace(/ST1/g, 'Street Tier 1')
      .replace(/ST2/g, 'Street Tier 2')

    const isCurrent = i === currentEventIndex
    const timeString = new Date(eventTime * 1000).toLocaleString([], {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
    // Show a "New" badge for select locations
    const showNewBadge = [''].includes(event[0])
    eventTime += EVENT_DURATION // increment time for next event

    return (
      <TableRow
        key={i}
        className={
          isCurrent ? 'font-semibold bg-green-200 hover:bg-gray-300' : i % 2 === 0 ? '' : ''
        }
      >
        <TableCell className="px-2 py-1 text-nowrap">
          {showNewBadge ? (
            <Badge variant="secondary" className="bg-green-400 col-start-1 max-w-12">
              New
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-gray-100 col-start-1 max-w-12">
              Old
            </Badge>
          )}
        </TableCell>
        <TableCell
          className=" text-nowrap cursor-pointer hover:bg-green-200"
          onClick={() => {
            setSelectedEvent({
              time: timeString,
              location: event[0],
              vehicles: eventText,
            })
            setDialogOpen(true)
          }}
        >
          {timeString}
        </TableCell>

        <TableCell className="px-2 py-1 text-nowrap text-end">{event[0]}</TableCell>

        <TableCell className="px-2 py-1 text-nowrap">{eventText}</TableCell>
        <TableCell className="px-2 py-1 text-nowrap">
          {event[2] && (
            <Badge variant="secondary" className=" bg-yellow-400 col-start-2">
              {event[2] || ''}
            </Badge>
          )}
        </TableCell>
      </TableRow>
    )
  })

  return (
    <Card className="flex-1 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm">
          This schedule is up-to-date for Season {season}. <br />
          <span className="text-left text-balance px-1 text-gray-600 text-xs">
            Click on time and you can set notification
          </span>
        </p>

        <div className="flex flex-row items-center space-x-4 mb-4 mx-auto">
          <Button
            variant="outline"
            className="w-full flex-1"
            onClick={() => rotateSchedule(-1)}
            size="sm"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Previous Rotation
          </Button>
          <Button
            className="w-full max-w-80  hidden md:flex"
            variant="outline"
            onClick={rotateScheduleReturn}
            size="sm"
          >
            Return to Now
            <ArrowDown className="ml-1 h-4 w-4" />
          </Button>
          <Button
            className="w-full flex-1"
            variant="outline"
            onClick={() => rotateSchedule(1)}
            size="sm"
          >
            Next Rotation
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div>
          <Button
            className="w-full md:hidden"
            variant="outline"
            onClick={rotateScheduleReturn}
            size="sm"
          >
            Return to Now
            <ArrowDown className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <Table className="text-sm">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center w-12">New</TableHead>
              <TableHead className="text-center w-24">Time</TableHead>
              <TableHead className="text-end">Where</TableHead>
              <TableHead className="text-start">Cars</TableHead>
              <TableHead className="text-center w-24">No Colisions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{rows}</TableBody>
        </Table>
        <p className="text-center text-balance py-3 px-1 text-gray-600 text-sm">
          Click on time and you can set notification
        </p>
      </CardContent>
      {selectedEvent && (
        <NotificationDialog
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          eventTime={selectedEvent.time}
          location={selectedEvent.location}
          vehicles={selectedEvent.vehicles}
        />
      )}
    </Card>
  );
}