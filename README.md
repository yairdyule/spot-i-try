# Come one, come all - to "Vynilla"!

Vynilla was the the first real project I'd ever done, with a group in my software development class. It was a lot of fun, and I learned a ton, but it was _very_ rough around the edges, and was riddled with bugs and other... "charming" idiosyncrasies.

It boasted a monolithic server file, wherein we had the logic for _every_ route endpoint in the application, and had, as they say, very low cohesion and extremely tight coupling. Changes in one place broke code elsewhere, and, due to significant copy-pasting, had _tons_ of duplicated logic, which made maintaining it a nightmare. It was insecure (who isn't!), and... suffice it to say, had a _lot_ of work to be done.

So, I spent some time learning how to write better Javascript (still lots of improvement to be made!), and resolved to recreate our application while incorporating ~~best~~ better practices, like keeping the code (mostly) DRY and modular.

## Application structure

There is an Express backend, with routers for Spotify API and User-centric functionality. Vynilla uses a Postgres database, wrapped with Prisma as an ORM.

There is a React frontend, courtesy of CRA. I'm using Tailwindcss for rapid prototyping.

I recently switched the app to use Typescript, and am guilty of duplicating the heck out of types.

Contributions are welcomed. The app is _slightly_ spaghetti at the moment...

Thanks for stopping by!!
