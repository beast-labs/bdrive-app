import Table from "../components/table";

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Page() {

  
    return (
    <main className="flex min-h-screen outline flex-col items-center justify-between p-16">
      <div className="flex items-center outline justify-between p-16 "> Welcome to Dashboard Page!</div>
      <div className="flex items-center outline justify-between p-16 "> <Table/></div>
      
    </main>
    
    
    )
  }