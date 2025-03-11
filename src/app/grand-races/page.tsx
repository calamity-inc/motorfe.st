'use client'

import { Schedule } from './components/Schedule'
import { Rewards } from './components/Rewards'

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <div className=" mx-auto space-y-8">
        <div className="flex md:flex-row flex-col gap-8">
          <Schedule />
          <Rewards />
        </div>
        <div className="flex flex-col items-center mx-auto">
          <p className="mt-4 text-xs ">
            Origina idea made by{' '}
            <a
              className="underline"
              href="https://github.com/calamity-inc"
              target="_blank"
              rel="noreferrer"
            >
              calamity-inc
            </a>
          </p>
          <p className="mt-4 text-xs ">
            Updated version made by{' '}
            <a
              className="underline"
              href="https://github.com/SanekxArcs/"
              target="_blank"
              rel="noreferrer"
            >
              SanekxArcs
            </a>
          </p>
          <p className="mt-4 text-xs ">
            If any of the data in here doesn&apos;t match what you observed in-game, please{' '}
            <a
              className="underline"
              href="https://github.com/calamity-inc/motorfe.st/issues/new"
              target="_blank"
              rel="noreferrer"
            >
              submit an issue on Github
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  )
}