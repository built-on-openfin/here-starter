# Redirect Example

There are some cases where an app entry in EB has to be a specific entry point url, but that entry point url automatically creates a session and redirects the user.

If this is the case then it can make it difficult to save that app in a Supertab as the Supertab will always have the redirected url and not the original url.

This index.html page is an example that takes a few querystring parameters to make it flexible across demonstrations (but you could build one where there is only one url or the range of urls is restricted and you have to specify an appId by query param).

- url - This has to be a valid http or https url. This is where the user will either be redirected to automatically or presented with the option to navigate.
- name - This is the name of the app to help identify the intended url to the user.
- brand - The default brand is dark but you can specify: blue, green, red, purple or dark (this is for cases where you may wish to swap out the branding colors).

The logic is as follows:

- On load if the navigation history is 1 then this page has been directly loaded (e.g via a Supertab or last snapshot when the browser closed). If this is the case automatically navigate.
- If the navigation history is greater than 1 then that means this page has been loaded through the featured page, a bookmark, search or something else. In that scenario present the UI showing the url and a button to navigate.

A Supertab administrator could:

- Permission this url so it can be loaded (this can either be a domain in the app with the redirect or a more general solution).
- They could create a group called Supertab Administrators and add themselves to it (Or something else that makes sense).
- They will edit the app which redirects and go to the bottom redirect section.
- They will add a redirect and assign it to the Supertab administrator group.
- They will add this target url passing in the name and url/id of the app.

This means when the Supertab administrator is creating a Supertab and searches for and loads e.g. App1 then they will see the view with the navigation button but when the Supertab is saved and loaded it will automatically redirect to the target destination.

The Redirect steps are optional. You can always just paste the url directly into the address bar instead of typing the app name.

## Running This Example

- You can type npm start to start the localhost webserver
- Typing npm run client will launch the index.html page passing the url for the here.io website (<http://localhost:8181/index.html?url=https://www.here.io&name=HERE&brand=dark>). As this page opens up as a fresh tab within your default desktop browser you will see it automatically redirect. If you load this url through the address bar on an existing tab you will see it show the navigate button.

## Note About This Example

This is an example to demonstrate a possible scenario and an idea of an approach. The ideal solution would be for the app to manage this themselves and for you to have a discussion with the team. If that isn't possible this is one way of demonstrating an alternative. The example has been kept intentionally basic with everything existing in the index.html file in the public folder. This is not a production application and shouldn't be treated as such. Please use this as a guide and provide feedback. Thanks!
