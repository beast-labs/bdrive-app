import Image from 'next/image'
import AuthForm from './components/auth-form'

export default function Home() {
  return (
    <main className="flex min-h-screen outline flex-col items-center justify-between p-16">
      <div className="flex items-center outline justify-between p-16 ">
      <p className="relative flex place-items-center"> Welcome to BDrive Homepage!</p>
      </div>
      <div className="col auth-widget">
        <AuthForm />
      </div>
    </main>
  )
}