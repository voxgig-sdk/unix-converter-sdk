# UnixConverter SDK configuration

module UnixConverterConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "UnixConverter",
        "slug" => "unix-converter",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://unixonvert.api/v1",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "conversion" => {},
        },
      },
      "entity" => {
        "conversion" => {
          "fields" => [
            {
              "name" => "input",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "output",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "success",
              "type" => "`$BOOLEAN`",
            },
          ],
          "name" => "conversion",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2021-01-01T00:00:00Z",
                        "kind" => "query",
                        "name" => "date",
                        "orig" => "date",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "YYYY-MM-DD HH:mm:ss",
                        "kind" => "query",
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 1609459200,
                        "kind" => "query",
                        "name" => "timestamp",
                        "orig" => "timestamp",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => "America/New_York",
                        "kind" => "query",
                        "name" => "timezone",
                        "orig" => "timezone",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/convert",
                  "parts" => [
                    "convert",
                  ],
                  "select" => {
                    "exist" => [
                      "date",
                      "format",
                      "timestamp",
                      "timezone",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    UnixConverterFeatures.make_feature(name)
  end
end
