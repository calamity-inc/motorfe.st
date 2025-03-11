'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import rewardsData from '@/data/rewards-data.json'

// Use data from JSON file
const REWARDS = rewardsData.REWARDS as Record<string, number[]>
const REWARDS_MATRIX = rewardsData.REWARDS_MATRIX as Record<string, number[]>

export function Rewards() {
  const [participants, setParticipants] = useState<number>(28)

  const getPositionSuffix = (pos: number) => {
    if (pos < 10 || pos >= 20) {
      const lastDigit = pos % 10
      if (lastDigit === 1) return 'st'
      if (lastDigit === 2) return 'nd'
      if (lastDigit === 3) return 'rd'
    }
    return 'th'
  }

  const matrix = REWARDS_MATRIX[participants.toString()]
  const rewardsRows = Array.from({length: participants}, (_, i) => {
    const rewardKey = matrix[i].toString()
    const reward = REWARDS[rewardKey]
    const pos = i + 1
    return (
      <TableRow key={i}>
        <TableCell className="px-2 py-1">
          <strong>
            {pos}
            {getPositionSuffix(pos)}
          </strong>
        </TableCell>
        <TableCell className="px-2 py-1 text-right text-nowrap">
          {reward[0].toLocaleString()} BUCKS
        </TableCell>
        <TableCell className="px-2 py-1 text-right text-nowrap">
          {reward[1].toLocaleString()} XP
        </TableCell>
      </TableRow>
    )
  })

  return (
    <Card className="shadow-lg max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">Rewards</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label htmlFor="reward-participants" className="mr-2 mb-1">
            Choose Number of players*:
          </Label>
          <Select
            value={participants.toString()}
            onValueChange={(val) => setParticipants(Number(val))}
          >
            <SelectTrigger className=" w-full">{participants}</SelectTrigger>
            <SelectContent>
              {Array.from({length: 21}, (_, i) => 28 - i).map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Table className="text-sm">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Position</TableHead>
              <TableHead className="text-right">Amount $</TableHead>
              <TableHead className="text-right">Amount XP</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{rewardsRows}</TableBody>
        </Table>
        <p className="mt-2 text-xs text-gray-400 text-balance">
          * The player count is measured somewhat inconsistently. It is usually based on the number
          shown during the race, but if the ranking screen shows a lower count, that value is used.
        </p>
      </CardContent>
    </Card>
  )
}