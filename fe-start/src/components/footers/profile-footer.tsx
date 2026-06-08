export default function ProfileFooter() {
  return (
    <footer className="container mx-auto space-y-4 p-4 pb-10 text-xs text-muted-foreground">
      <div className="">
        <ul className="flex justify-center gap-x-4">
          <li>Meta</li>
          <li>About</li>
          <li>Blog</li>
          <li>Jobs</li>
          <li>Help</li>
          <li>API</li>
          <li>Privacy</li>
          <li>Terms</li>
          <li>Locations</li>
          <li>Instagram Lite</li>
          <li>Meta AI</li>
          <li>Threads</li>
        </ul>
      </div>
      <div className="flex items-center justify-center gap-x-4">
        <div>
          &copy; {new Date().getFullYear()} Startgram from arridha amrad
        </div>
      </div>
    </footer>
  );
}
