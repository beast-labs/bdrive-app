export default function Navbar() {
  let year = new Date().getFullYear();
    return (
        <footer className="w-full bg-gray-800 text-center text-white dark:bg-neutral-600 outline">
        <div
          className="p-4 text-center text-neutral-400 dark:bg-neutral-700 dark:text-neutral-200 w-full">
          © {year} Copyright:
          <a
            className=""
            href="https://github.com/beast-labs/bdrive-app"
          >BDrive</a>
        </div>
      </footer>
      
    )};