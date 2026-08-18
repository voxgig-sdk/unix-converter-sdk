<?php
declare(strict_types=1);

// UnixConverter SDK configuration

class UnixConverterConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "UnixConverter",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://unixonvert.api/v1",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "conversion" => [],
                ],
            ],
            "entity" => [
        'conversion' => [
          'fields' => [
            [
              'name' => 'input',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'output',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'success',
              'type' => '`$BOOLEAN`',
            ],
          ],
          'name' => 'conversion',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2021-01-01T00:00:00Z',
                        'kind' => 'query',
                        'name' => 'date',
                        'orig' => 'date',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'YYYY-MM-DD HH:mm:ss',
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 1609459200,
                        'kind' => 'query',
                        'name' => 'timestamp',
                        'orig' => 'timestamp',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 'America/New_York',
                        'kind' => 'query',
                        'name' => 'timezone',
                        'orig' => 'timezone',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/convert',
                  'parts' => [
                    'convert',
                  ],
                  'select' => [
                    'exist' => [
                      'date',
                      'format',
                      'timestamp',
                      'timezone',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return UnixConverterFeatures::make_feature($name);
    }
}
