import React from 'react'
import { CallToAction, Layout, Seo } from '@/components'
import { IHomePage } from '@/interfaces'

const Home: React.FC<IHomePage.IProps> = () => {
  return (
    <Layout height={['700px', '800px', '880px', '600px']}>
      <Seo />
      <CallToAction />
    </Layout>
  )
}

export default Home
