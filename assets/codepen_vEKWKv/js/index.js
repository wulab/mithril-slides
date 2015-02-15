(function() {
  var Readability, appearance, book, library, location;

  Readability = (function() {
    function Readability() {}

    Readability.parse = function(url) {
      url = encodeURIComponent(url).replace(/%20/g, "+");
      url = "https://readability.com/api/content/v1/parser?token=" + library.READABILITY_TOKEN + "&url=" + url;
      return m.request({
        url: url,
        dataType: "jsonp",
        unwrapError: function(response) {
          return JSON.parse(response);
        }
      });
    };

    return Readability;

  })();

  appearance = {};

  appearance.config = function(ctrl) {
    return function(element, is_initialized, context) {
      var content, elem;
      elem = $(element);
      if (!is_initialized) {
        content = document.createElement("div");
        m.render(content, appearance.content(ctrl));
        elem.popover({
          content: content,
          html: true,
          placement: "bottom",
          viewport: {
            selector: "#book",
            padding: 10
          }
        });
        return elem.on("click", function(e) {
          return $(".navbar-btn").not(elem).popover("hide");
        });
      }
    };
  };

  appearance.controller = function() {
    var ctrl;
    ctrl = {
      sizes: ["small", "large"],
      fonts: ["athelas", "charter", "georgia", "iowan", "palatino", "seravek", "times"],
      themes: ["white", "sepia", "night"],
      selected_size: m.prop("small"),
      selected_font: m.prop("iowan"),
      selected_theme: m.prop("white")
    };
    return ctrl;
  };

  appearance.content = function(ctrl) {
    var font, size, theme;
    return m("div.container-fluid", [
      m("div.row", [
        (function() {
          var _i, _len, _ref, _results;
          _ref = ctrl.sizes;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            size = _ref[_i];
            _results.push(m("div.col-xs-6", [
              m("div.radio", [
                m("label.text-capitalize", [
                  m("input[type=radio]", {
                    name: "fontsize",
                    value: size,
                    checked: size === ctrl.selected_size(),
                    onchange: m.withAttr("value", ctrl.selected_size)
                  }), size === "small" ? m("small", "A") : "A"
                ])
              ])
            ]));
          }
          return _results;
        })()
      ]), m("div.row", [
        m("div.col-xs-4", [m("div.text", "Fonts")]), m("div.col-xs-8", [
          m("select.form-control.input-sm.text-capitalize", {
            onchange: m.withAttr("value", ctrl.selected_font)
          }, [
            (function() {
              var _i, _len, _ref, _results;
              _ref = ctrl.fonts;
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                font = _ref[_i];
                _results.push(m("option", {
                  value: font,
                  selected: font === ctrl.selected_font()
                }, font === "times" ? "times new roman" : font));
              }
              return _results;
            })()
          ])
        ])
      ]), m("div.row", [
        (function() {
          var _i, _len, _ref, _results;
          _ref = ctrl.themes;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            theme = _ref[_i];
            _results.push(m("div.col-xs-4", [
              m("div.radio", [
                m("label.text-capitalize", [
                  m("input[type=radio]", {
                    name: "theme",
                    value: theme,
                    checked: theme === ctrl.selected_theme(),
                    onchange: m.withAttr("value", ctrl.selected_theme)
                  }), theme
                ])
              ])
            ]));
          }
          return _results;
        })()
      ])
    ]);
  };

  appearance.view = function(ctrl) {
    return m("button[type=button].btn.btn-link.btn-lg.navbar-btn", {
      config: appearance.config(ctrl)
    }, [
      m("span.glyphicon.glyphicon-font", {
        "aria-hidden": true
      })
    ]);
  };

  location = {};

  location.config = function(ctrl) {
    return function(element, is_initialized, context) {
      var content, elem;
      elem = $(element);
      if (!is_initialized) {
        content = document.createElement("div");
        m.render(content, location.content(ctrl));
        elem.popover({
          content: content,
          html: true,
          placement: "bottom",
          viewport: {
            selector: "#book",
            padding: 10
          }
        });
        return elem.on("click", function(e) {
          return $(".navbar-btn").not(elem).popover("hide");
        });
      }
    };
  };

  location.controller = function() {
    var ctrl;
    ctrl = {
      url: m.prop("http://engineering.flipboard.com/2015/02/mobile-web/")
    };
    return ctrl;
  };

  location.content = function(ctrl) {
    return m("div.container-fluid", [
      m("div.row", [
        m("div.col-xs-12", [
          m("div.input-group", [
            m("input[type=text].form-control", {
              onchange: m.withAttr("value", ctrl.url),
              value: ctrl.url()
            }), m("span.input-group-btn", [
              m("button[type=button].btn.btn-link", {
                onclick: ctrl.onclick
              }, "Open")
            ])
          ])
        ])
      ])
    ]);
  };

  location.view = function(ctrl) {
    return m("button[type=button].btn.btn-link.btn-lg.navbar-btn", {
      config: location.config(ctrl)
    }, "Library");
  };

  library = {};

  if (library.READABILITY_TOKEN == null) {
    library.READABILITY_TOKEN = prompt("Readability API Key");
  }

  library.config = function(ctrl) {
    return function(element, is_initialized, context) {
      var elem;
      return elem = $(element);
    };
  };

  library.controller = function() {};

  library.view = function(ctrl) {
    return [];
  };

  book = {};

  book.config = function(ctrl) {
    return function(element, is_initialized, context) {
      var elem;
      elem = $(element);
      if (!is_initialized) {
        elem.on("click", function(e) {
          m.startComputation();
          if ($(".popover.in").length) {
            $(".navbar-btn").popover("hide");
          } else {
            $(".navbar").toggleClass("is-hidden");
          }
          return m.endComputation();
        });
        $(window).on("scroll", function(e) {
          m.startComputation();
          ctrl.paginate();
          return m.endComputation();
        });
        return $(function() {
          return $(window).scroll();
        });
      }
    };
  };

  book.controller = function() {
    var appearance_ctrl, ctrl, library_ctrl, location_ctrl;
    appearance_ctrl = appearance.controller();
    location_ctrl = location.controller();
    library_ctrl = library.controller();
    ctrl = {
      appearance_ctrl: appearance_ctrl,
      size: appearance_ctrl.selected_size,
      font: appearance_ctrl.selected_font,
      theme: appearance_ctrl.selected_theme,
      location_ctrl: location_ctrl,
      url: location_ctrl.url,
      book: m.prop({}),
      error: m.prop({}),
      total_pages: m.prop(1),
      current_page: m.prop(1),
      parse: function() {
        var _ref;
        if (((_ref = library.READABILITY_TOKEN) != null ? _ref.length : void 0) === 40) {
          return Readability.parse(ctrl.url()).then(ctrl.book, ctrl.error);
        } else {
          return ctrl.error({
            error: "Invalid API Key"
          });
        }
      },
      paginate: function() {
        var current_page, document_height, scroll_position, total_pages, window_height;
        window_height = $(window).height();
        document_height = $(document).height();
        scroll_position = $(document).scrollTop();
        total_pages = Math.ceil(document_height / window_height);
        if (document_height - scroll_position <= window_height + 70) {
          current_page = total_pages;
        } else {
          current_page = Math.floor(scroll_position / window_height) + 1;
        }
        ctrl.total_pages(total_pages);
        return ctrl.current_page(current_page);
      },
      scrolltop: function() {
        return $(window).scrollTop(0);
      }
    };
    ctrl.parse();
    return ctrl;
  };

  book.view = function(ctrl) {
    return [
      m("div#book", {
        "class": "theme-" + (ctrl.theme())
      }, [
        m("nav[role=navigation]#toolbar.navbar.navbar-default.navbar-fixed-top", [
          m("div.container-fluid", [
            m("div.row", [
              m("div.col-xs-6.l-left", [
                location.view($.extend({}, ctrl.location_ctrl, {
                  onclick: ctrl.parse
                })), m("button[type=button].btn.btn-link.btn-lg.navbar-btn", [
                  m("span.glyphicon.glyphicon-th-list", {
                    "aria-hidden": true
                  })
                ])
              ]), m("div.col-xs-6.l-right", [
                appearance.view($.extend({}, ctrl.appearance_ctrl)), m("button[type=button].btn.btn-link.btn-lg.navbar-btn", [
                  m("span.glyphicon.glyphicon-search", {
                    "aria-hidden": true
                  })
                ]), m("button[type=button].btn.btn-link.btn-lg.navbar-btn", [
                  m("span.glyphicon.glyphicon-bookmark", {
                    "aria-hidden": true
                  })
                ])
              ])
            ])
          ])
        ]), m("div.container-fluid", {
          config: book.config(ctrl)
        }, [
          m("div.row", [
            m("div#page.col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-2.col-lg-6.col-lg-offset-3", {
              "class": ["font-" + (ctrl.font()), "font-" + (ctrl.size())].join(" ")
            }, [m("h1", ctrl.book().title || ""), m("div", m.trust(ctrl.book().content || ""))])
          ])
        ]), m("nav#statusbar.navbar.navbar-default.navbar-fixed-bottom", [
          m("div.container-fluid", [
            ctrl.error().error != null ? m("div.row", [
              m("div.col-xs-12", [
                m("p.navbar-text.text-center", [
                  m("span.glyphicon.glyphicon-exclamation-sign", {
                    "aria-hidden": true
                  }), m("strong", ctrl.error().error)
                ])
              ])
            ]) : m("div.row", [
              m("div.col-xs-4.l-left", [
                m("p.navbar-text", [
                  ctrl.current_page() > 1 ? m("a[href=#]", {
                    onclick: ctrl.scrolltop
                  }, [m("strong", "Back to p.1")]) : void 0
                ])
              ]), m("div.col-xs-4.l-center", [m("p.navbar-text.text-center", [m("strong", "" + (ctrl.current_page()) + " of " + (ctrl.total_pages()))])]), m("div.col-xs-4.l-right", [m("p.navbar-text.navbar-right", [ctrl.current_page() === ctrl.total_pages() ? m("strong", "last page") : m("strong", "" + (ctrl.total_pages() - ctrl.current_page()) + " pages left")])])
            ])
          ])
        ])
      ])
    ];
  };

  m.module(document.body, book);

}).call(this);
