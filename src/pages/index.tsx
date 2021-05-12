import React from 'react'
import { CallToAction, Layout, Seo } from '@/components'
import { GetStaticProps } from 'next'
import { IHomePage } from '@/interfaces/HomeProps'

const Home: React.FC<IHomePage.IProps> = ({ socials }) => {
  return (
    <Layout socials={socials}>
      <Seo />
      <CallToAction />
    </Layout>
  )
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

export default Home
