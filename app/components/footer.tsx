export default function Navbar() {
  let year = new Date().getFullYear();
    return (
        <footer className="w-full bg-auto text-center text-white">
        <div
          className="p-4 text-center text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200 w-full">
          © {year} Copyright:
          <a
            className=""
            href="https://github.com/beast-labs/bdrive-app"
          >BDrive</a>
        </div>
      </footer>
      
    )};