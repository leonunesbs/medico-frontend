import { GradientHeading } from '@/components'
import { INovaConsultaTimer } from '@/interfaces'
import React, { useEffect, useState } from 'react'

export function NovaConsultaTimer({ handle }: INovaConsultaTimer.IProps) {
  const { consultaStarted } = handle
  const [consultaTime, setConsultaTime] = useState({
    minutes: 0,
    seconds: 0
  })
  useEffect(() => {
    if (consultaStarted) {
      setTimeout(() => {
        if (consultaTime.seconds > 60) {
          setConsultaTime({
            minutes: consultaTime.minutes + 1,
            seconds: 0
          })
        } else {
          setConsultaTime({
            ...consultaTime,
            seconds: consultaTime.seconds + 1
          })
        }
      }, 1000)
    }
  }, [consultaStarted, consultaTime])
  return (
    <GradientHeading as="h2" size="md" textAlign="right">
      {consultaTime.minutes < 10
        ? `0${consultaTime.minutes}`
        : consultaTime.minutes}
      :
      {consultaTime.seconds < 10
        ? `0${consultaTime.seconds}`
        : consultaTime.seconds}
    </GradientHeading>
  )
}
