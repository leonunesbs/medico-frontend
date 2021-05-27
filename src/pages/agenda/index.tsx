// region GLOBAL
import { GetStaticProps } from 'next'
import React from 'react'
// endregion

// region LOCAL
import { IAgendaPage } from '@/interfaces'
import { Layout } from '@/components'
import { client } from '@/utils/api'
import { gql } from '@apollo/client'
// endregion

const Agenda: React.FC<IAgendaPage.IProps> = ({ socials }: any) => {
  return <Layout socials={socials}>Agenda</Layout>
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        userByEmail(email: "leonunesbs@gmail.com") {
          social {
            whatsapp
            facebook
            instagram
            twitter
            linkedin
            github
            twitch
          }
        }
      }
    `
  })
  if (!data) {
    return {
      notFound: true
    }
  }

  const { socials } = data.userByEmail.social

  return {
    props: { socials },
    revalidate: 1
  }
}

export default Agenda
