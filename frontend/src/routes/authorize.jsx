import axios from "axios";

export default function Authorize() {
  return (
    <main className="p-2">
      <h2 className="text-lg pb-4">
        We've gotta sort some stuff out with Spotify first.
      </h2>
      <div className="flex flex-col gap-2">
        <p>
          We simply need your permission to read & update certain things on your
          profile.
        </p>
        <p>
          For example, we wish to be able to create playlists and add songs to
          them, for your friends' queues.
        </p>
        <p>If you're cool with that, let's get going!</p>

        <a href="http://localhost:8000/spotify/auth">gopher it</a>
      </div>
    </main>
  );
}
