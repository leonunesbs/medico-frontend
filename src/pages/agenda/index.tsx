// region GLOBAL
import React from 'react'
// endregion

// region LOCAL
import { IAgendaPage } from '@/interfaces/AgendaPage'
import { Layout } from '@/components'
import { GetStaticProps } from 'next'
// endregion

const Agenda: React.FC<IAgendaPage.IProps> = ({ socials }: any) => {
  return <Layout socials={socials}>Agenda</Layout>
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://leonunesbs.herokuapp.com/homepage')
  const data = await res.json()

  if (!data) {
    return {
      notFound: true
    }
  }

  const { socials } = data

  return {
    props: { socials },
    revalidate: 1
  }
}

export default Agenda
