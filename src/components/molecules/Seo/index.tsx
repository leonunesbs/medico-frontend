import React from 'react'
import Head from 'next/head'
import { ISeo } from '@/interfaces'

export const Seo = ({ title, description }: ISeo.IProps) => (
  <Head>
    <title>{title || 'Médico | Leonardo Nunes'}</title>
    <meta
      name="description"
      content={
        description ||
        'Cuidados médicos para você, junto à melhor experiência ao cuidar da sua saúde. Atendimento humanizado e a tecnologia em seu benefício.'
      }
    />
  </Head>
)
