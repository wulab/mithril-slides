# mithril-slides
A simple presentation app written with Mithril

![screenshots](https://cloud.githubusercontent.com/assets/592709/17454537/012dc70c-5bc4-11e6-86e1-5d5ce2bc35b8.gif)

## Getting started
1. Clone mithril-slides repository at the command prompt if you haven't yet:

        $ git clone https://github.com/wulab/mithril-slides.git

2. Change directory to `mithril-slides` and start a web server:

        $ cd mithril-slides
        $ python -m SimpleHTTPServer 8000

3. Using a browser, go to `http://localhost:8000` and you'll see example slides.

4. To add or edit slides, make changes to the `slides.json` file and reload your browser.

## Keyboard shortcuts
Shortcuts for navigating slides are listed below.

Action                    | Shortcut
------------------------- | --------------------------------------------
Advance to the next slide | Right Arrow, Down Arrow, Space bar or Return
Go to previous slide      | Left Arrow, Up Arrow or Backspace
Quit presentation mode    | Period or Escape
Show or hide the pointer  | C

## Known issues
Some websites can not be embedded because they have secure HTTP headers (either
`X-Frame-Options` or `Content-Security-Policy`) set in their responses. To remove
those headers, you need a browser extension. For Google Chrome, install
[ModHeader][1] extension and add response headers for above headers with empty
values. For Firefox, install [Modify Response Headers][2] add-on and add filters for
those headers. The following slide can be used to test your setup:

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