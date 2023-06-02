import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main + " " + inter.className}>
      <div className={styles.center}>
        <h1>We're currently under maintenance</h1>
      </div>
    </main>
  )
}
