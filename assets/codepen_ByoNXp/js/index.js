(function() {
  var DuckDuckGo, search;

  search = {};

  DuckDuckGo = (function() {
    function DuckDuckGo(data) {
      var tokens;
      tokens = data.Result.replace(/^<a[^>]+>/, "").split("</a>");
      this.title = m.prop(tokens[0]);
      this.desc = m.prop(tokens[1].replace(" - ", ""));
      this.url = m.prop(data.FirstURL);
    }

    DuckDuckGo.query = function(queryString) {
      var q, url;
      q = encodeURIComponent(queryString).replace(/%20/g, "+");
      url = "http://api.duckduckgo.com/?q=" + q + "&format=json";
      return m.request({
        url: url,
        dataType: "jsonp"
      });
    };

    return DuckDuckGo;

  })();

  search.controller = function() {
    var ctrl;
    ctrl = {
      queryString: m.prop("DuckDuckGo"),
      queryResults: m.prop([]),
      query: function() {
        return DuckDuckGo.query(ctrl.queryString()).then(function(data) {
          var r, results, _i, _len, _ref, _results;
          results = ctrl.queryResults();
          results.splice(0, results.length);
          _ref = data.RelatedTopics;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            r = _ref[_i];
            if ((r.Result != null) && (r.FirstURL != null)) {
              _results.push(results.push(new DuckDuckGo(r)));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        });
      },
      reset: function() {
        console.log(ctrl.queryString());
        return ctrl.queryString("");
      }
    };
    ctrl.query();
    return ctrl;
  };

  search.cancelEvent = function(e) {
    e.preventDefault();
    return e.stopPropagation();
  };

  search.view = function(ctrl) {
    return m("div.container", [
      m("h1.page-header", "A Search Application"), m("form[role=form]", {
        onsubmit: search.cancelEvent
      }, [
        m("div.input-group", [
          m("input[type=text].form-control", {
            onchange: m.withAttr("value", ctrl.queryString),
            value: ctrl.queryString()
          }), m("span.input-group-btn", [
            m("button[type=button].btn.btn-default", {
              onclick: ctrl.query
            }, "Search")
          ])
        ])
      ]), m("ul.media-list", ctrl.queryResults().map(function(result, index) {
        return m("li.media", [
          m("div.media-body", [
            m("h4.media-heading", [
              m("a", {
                href: result.url(),
                target: "_blank"
              }, result.title())
            ]), m("p.text-success", result.url()), m("p", result.desc())
          ])
        ]);
      }))
    ]);
  };

  m.module(document.body, search);

}).call(this);
