import Head from 'next/head'
import {useRouter} from 'next/router'
import styles from '@/styles/Layout.module.css'
import Header from './Header'
import Footer from './Footer'
import Showcase from './Showcase'

export default function Layout({ title, keywords, description, children }) {
    const router = useRouter()
  
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='descriiption' content={keywords} />
      </Head>
      <Header /> 

      {router.pathname === '/' && <Showcase />}
          <div className={styles.container}>
        {children}
    </div>
   
    <Footer /> 
    </div>
    
  )
}


Layout.defaultProps = {
    title: "Our Places | Our Reviews of Our Places",
    description: 'Reviews for Places we have been',
    keywords: 'destinations, restaurants, events'
}