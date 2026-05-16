<?php
declare(strict_types=1);

// UnixConverter SDK base feature

class UnixConverterBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(UnixConverterContext $ctx, array $options): void {}
    public function PostConstruct(UnixConverterContext $ctx): void {}
    public function PostConstructEntity(UnixConverterContext $ctx): void {}
    public function SetData(UnixConverterContext $ctx): void {}
    public function GetData(UnixConverterContext $ctx): void {}
    public function GetMatch(UnixConverterContext $ctx): void {}
    public function SetMatch(UnixConverterContext $ctx): void {}
    public function PrePoint(UnixConverterContext $ctx): void {}
    public function PreSpec(UnixConverterContext $ctx): void {}
    public function PreRequest(UnixConverterContext $ctx): void {}
    public function PreResponse(UnixConverterContext $ctx): void {}
    public function PreResult(UnixConverterContext $ctx): void {}
    public function PreDone(UnixConverterContext $ctx): void {}
    public function PreUnexpected(UnixConverterContext $ctx): void {}
}
