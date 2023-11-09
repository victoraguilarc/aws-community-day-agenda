'use client'

import { v4 as uuidv4 } from 'uuid';

import { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'

import { BackgroundImage } from '@/components/BackgroundImage'
import { Container } from '@/components/Container'
import {eventDay} from "@/app/config";

interface Speech {
  title: string;
  speaker: string;
  abstract: string;
  start: string;
  end: string;
}
interface Track {
  name: string;
  summary: string;
  speeches: Array<Speech>;
}

const buildDateTime = (time: string): Date => {
  const [hour, minute] = time.split(':')
  const inputDate = new Date()
  inputDate.setHours(parseInt(hour))
  inputDate.setMinutes(parseInt(minute))
  inputDate.setSeconds(0);
  return inputDate;
}

const prefixTime = (value: number): string => {
  if (value < 10)
    return `0${value}`;
  return `${value}`
}
const generateKey = (prefix: string) => {
  return `${ prefix }_${ uuidv4() }`;
}

const isOnTime = (starting: Date, ending: Date): boolean => {
  const targetDate = new Date(`${eventDay}T00:00:00-06:00`);
  if (targetDate.getDay() < starting.getDay() || targetDate.getDay() > ending.getDay())
    return false;
  const currentDate = new Date();
  return currentDate >= starting && currentDate <= ending;
}

function ScheduleTabbed({agendaTracks}: AgendaProps) {
  let [tabOrientation, setTabOrientation] = useState('horizontal')

  useEffect(() => {
    let smMediaQuery = window.matchMedia('(min-width: 640px)')

    function onMediaQueryChange({ matches }: { matches: boolean }) {
      setTabOrientation(matches ? 'vertical' : 'horizontal')
    }

    onMediaQueryChange(smMediaQuery)
    smMediaQuery.addEventListener('change', onMediaQueryChange)

    return () => {
      smMediaQuery.removeEventListener('change', onMediaQueryChange)
    }
  }, [])

  return (
    <Tab.Group
      as="div"
      className="mx-auto grid max-w-2xl grid-cols-1 gap-y-6 sm:grid-cols-2 lg:hidden"
      vertical={tabOrientation === 'vertical'}
    >
      <Tab.List className="-mx-4 flex gap-x-4 gap-y-10 overflow-x-auto pb-4 pl-4 sm:mx-0 sm:flex-col sm:pb-0 sm:pl-0 sm:pr-8">
        {({ selectedIndex }) => (
          <>
            {agendaTracks.map((track, trackIndex) => (
              <div
                key={generateKey('track.tab')}
                className={clsx(
                  'relative w-3/4 flex-none pr-4 sm:w-auto sm:pr-0',
                  trackIndex !== selectedIndex && 'opacity-70',
                )}
              >
                <TrackSummary
                    track={track}
                  // track={{
                  //   ...track,
                  //   track: (
                  //     <Tab className="ui-not-focus-visible:outline-none">
                  //       <span className="absolute inset-0" />
                  //       {track.name}
                  //     </Tab>
                  //   ),
                  // }}
                />
              </div>
            ))}
          </>
        )}
      </Tab.List>
      <Tab.Panels>
        {agendaTracks.map((track) => (
          <Tab.Panel
            key={generateKey('track.panel')}
            className="ui-not-focus-visible:outline-none"
          >
            <SpeechSlots track={track} />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

function TrackSummary({ track }: { track: Track }) {
  return (
    <>
      <h3 className="text-2xl font-semibold tracking-tight text-aws-yellow leading-7 text-center font-exo block h-[3rem]">
        {track.name}
      </h3>
    </>
  )
}

function SpeechSlots({ track, className }: { track: Track; className?: string }) {
  return (
    <ol
      role="list"
      className={clsx(
        className,
        'text-center shadow-xl shadow-blue-900/5 backdrop-blur',
      )}
    >
      {track.speeches.map((speech, speechIndex) => {
        const speechStart = buildDateTime(speech.start);
        const speechFinish = buildDateTime(speech.end);
        const isOnGoingSpeech = isOnTime(speechStart, speechFinish);
        const isNotLastSpeech = speechIndex < track.speeches.length - 1;
        return (
            <li
                key={generateKey(speech.title)}
                aria-label={`${speech.title} - ${speech.speaker} / ${speech.start} - ${speech.end}`}
                className={clsx(
                    'px-5 py-6 mt-0',
                    isNotLastSpeech ? 'border-b-2 border-aws-gray/50 border-dashed' : '',
                    isOnGoingSpeech ? 'bg-aws-purple' : 'bg-aws-gray-400',
                )}
            >
              <h4 className="text-lg font-semibold tracking-tight text-white leading-6">
                {speech.speaker}
              </h4>
              <p className={clsx(
                  "mt-1 tracking-tight text-aws-turquoise",
                    isOnGoingSpeech ? 'text-white' : '',
              )}>
                {speech.title}
              </p>
              <p className="mt-1 font-mono text-sm text-slate-200">
                <time dateTime={`${speechStart}`}>
                  {`${prefixTime(speechStart.getHours())}:${prefixTime(speechStart.getMinutes())}`}
                </time>{' '}
                -{' '}
                <time dateTime={`${speechFinish}`}>
                  {`${prefixTime(speechFinish.getHours())}:${prefixTime(speechFinish.getMinutes())}`}
                </time>
              </p>
              {isOnGoingSpeech && <span className="inline-block mt-2 font-mono text-xs text-white bg-aws-pink px-2 py-1 rounded-xl">
                EN PROGRESO
              </span>}
            </li>
        );
      })}
    </ol>
  )
}

function ScheduleStatic({agendaTracks}: AgendaProps) {
  return (
    <div className="hidden lg:grid lg:grid-cols-4 lg:gap-x-8">
      {agendaTracks.map((track) => (
        <section key={generateKey(track.name)}>
          <TrackSummary track={track} />
          <SpeechSlots track={track} className="mt-10" />
        </section>
      ))}
    </div>
  )
}

export interface AgendaProps {
  agendaTracks: Array<Track>;
}

export function Agenda({agendaTracks}: AgendaProps) {
  return (
    <section id="schedule" aria-label="Schedule" className="py-20 sm:py-32">
      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-4xl lg:pr-24">
          <h2 className="font-poppins text-4xl font-bold tracking-tighter text-white sm:text-5xl">
            Agenda
          </h2>
          <p className="mt-4 font-display text-xl tracking-tight text-white">
            Únete a nosotros en el AWS Community Day para explorar tendencias y prácticas en AWS. Con charlas, estudios de caso, talleres y oportunidades de networking, en 4 tracks diferentes.
          </p>
        </div>
      </Container>
      <div className="relative mt-10 sm:mt-15">
        <BackgroundImage position="right" className="-bottom-32 -top-40" />
        <Container className="relative">
          <ScheduleTabbed agendaTracks={agendaTracks} />
          <ScheduleStatic agendaTracks={agendaTracks} />
        </Container>
      </div>
    </section>
  )
}
