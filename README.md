# mithril-slides
A Keynote-inspired presentation app written with Mithril

![screenshots](https://cloud.githubusercontent.com/assets/592709/17454537/012dc70c-5bc4-11e6-86e1-5d5ce2bc35b8.gif)

## Features
* Create slides as a [simple JSON file](slides.json)
* Embed websites, web apps or YouTube videos
* Present ideas using only a web browser
* Support mobile or tablet devices
* A total of 4 themes to choose from

![themes](https://user-images.githubusercontent.com/592709/32982023-6333a648-ccb0-11e7-87e6-cdb94c5573f0.png)

## Getting started
1. Clone mithril-slides repository at the command prompt if you haven't yet:

        $ git clone https://github.com/wulab/mithril-slides.git

2. Change directory to `mithril-slides` and start a web server:

        $ cd mithril-slides
        $ python -m SimpleHTTPServer 8000       # Python 2
        $ python -m http.server 8000            # Python 3

3. Using a browser, go to `http://localhost:8000` and you'll see example slides.

4. To add or edit slides, make changes to the `slides.json` file and reload your
   browser.

## Keyboard shortcuts
Shortcuts for navigating slides are listed below.

Action                    | Shortcut
------------------------- | --------------------------------------------
Advance to the next slide | <kbd>Right Arrow</kbd>, <kbd>Down Arrow</kbd>, <kbd>Space bar</kbd> or <kbd>Return</kbd>
Go to previous slide      | <kbd>Left Arrow</kbd>, <kbd>Up Arrow</kbd> or <kbd>Backspace</kbd>
Quit presentation mode    | <kbd>Esc</kbd> or <kbd>Q</kbd>
Show or hide the pointer  | <kbd>C</kbd>
Change presentation theme | <kbd>T</kbd>

## Touch gestures
Gestures for navigating slides on touchscreen devices.

Action                    | Gesture
------------------------- | --------------------------------------------
Advance to the next slide | Tap on the right side of the slide
Go to previous slide      | Tap on the left side of the slide
Change presentation theme | Touch and hold

## Offline mode
mithril-slides requires an internet connection to work. If you are to present in
a place without one. You can still use mithril-slides by checking out `offline`
branch before starting a web server:

        $ git checkout offline
        $ python -m SimpleHTTPServer 8000       # Python 2
        $ python -m http.server 8000            # Python 3

You also need to point the `src` property of all images and embed objects in
your `slides.json` file to local files.

## Known issues
Some websites can not be embedded because they have secure HTTP headers (either
`X-Frame-Options` or `Content-Security-Policy`) set in their responses. To
remove those headers, you need a browser extension. For Google Chrome, install
[ModHeader][1] extension and add response headers for above headers with empty
values. For Firefox, install [Modify Response Headers][2] add-on and add filters
for those headers. The following slide can be used to test your setup:

        {
            "embed": {
                "src": "https://github.com/",
                "width": "1024",
                "height": "768",
                "sandbox": "allow-forms allow-same-origin allow-scripts"
            }
        }

[1]: https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj
[2]: https://addons.mozilla.org/en-US/firefox/addon/modify-response-headers/