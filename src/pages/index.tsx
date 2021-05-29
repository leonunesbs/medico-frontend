import React from 'react'
import { CallToAction, Layout, Seo } from '@/components'
import { IHomePage } from '@/interfaces'

const Home: React.FC<IHomePage.IProps> = () => {
  return (
    <Layout>
      <Seo />
      <CallToAction />
    </Layout>
  )
}

export default Home
