import React from 'react'
import { CallToAction, Layout, Seo } from '@/components'
import { GetStaticProps } from 'next'
import { IHomePage } from '@/interfaces'
import { client } from '@/utils/api'
import { gql } from '@apollo/client'

const Home: React.FC<IHomePage.IProps> = ({ socials }) => {
  return (
    <Layout socials={socials}>
      <Seo />
      <CallToAction />
    </Layout>
  )
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

  const socials = data.userByEmail.social

  return {
    props: { socials },
    revalidate: 1
  }
}

export default Home
