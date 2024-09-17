# Young Tech Blog

This is a personal full stack web application to get me introduced to:

- SQL
- Azure Authentication
- Azure web hosting
- and NodeJS

## Where Is This Hosted?

- Frontend:

  - Microsoft Azure Static Webapp

- Backend:
  - Render

## My Notes

- The gif logo has a time length of 1.16s
  - use a useEffect to set a timer for (1.16s \* rotations), then set the logo image's src to the static version so it's not super annoying

## Things discovered / learned

Hosting a NodeJS application through Microsoft Azure is insanely difficult for me through github actions. There is almost next to no documentation for CI/CD pipeline libraries that azure use for deployment. The build will succeed, and then I can't see anything in the wwwroot folder on the webapp. I decided to host it on Render instead.
