import Head from 'next/head'
import styles from '../styles/Layout.module.css'
import Header from './Header'
import Footer from './Footer'
export default function Layout({ title, keywords, description, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='descriiption' content={keywords} />
      </Head>
      <Header /> 
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