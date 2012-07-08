Drudge.js
=========

Drudge.js is a bookmarklet designed to facilitate easier browsing of
drudgereport.com. Politics aside, I like to read the Drudge Report,
however the old school newspaper style is cumbersome to read when you
return to the site frequently, as new items can be added anywhere on the
page, and it's time consuming to try to figure out which links are new
and which you've seen before.

It tracks which links you've seen in localStorage, and gradually fades
them out as you've seen them more and more times. A "reset" button
appears in the top right which will clear the localStorage entry if you
want to start over again.

Usage
------

Just paste the contents of bookmarklet.js into a new bookmark and put it
in your browser toolbar somewhere. Then when you go to drudgereport.com in a
supported browser (one with localStorage support, IE > 7, Firefox,
Safari, Chrome), and click the bookmark you've created, the script will
load. The first time all links will be green, then as you revisit
the site and reapply the script by clicking the bookmark again, the old
links will gradually fade out. New links will always appear as green.
