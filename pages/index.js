import { Inter } from '@next/font/google'
import { ToastContainer } from 'react-toastify'
import GeneralProvider from '../src/context/generalContext'
import UserAuthProvider from '../src/context/userAuthContext'
import Header from '../src/components/Header'
import Home from '../src/components/Home'
import Script from 'next/script'


const inter = Inter({ subsets: ['latin'] })

export default function HomePage() {
  return (
    <>
      <Script src="https://kit.fontawesome.com/ea1b9abd34.js" />
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></Script>

      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <GeneralProvider>
        <UserAuthProvider>
          <Header />
          <Home />
        </UserAuthProvider>
      </GeneralProvider>
    </>
  )
}
