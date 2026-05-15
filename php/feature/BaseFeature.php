<?php
declare(strict_types=1);

// PlaceholderImage SDK base feature

class PlaceholderImageBaseFeature
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

    public function init(PlaceholderImageContext $ctx, array $options): void {}
    public function PostConstruct(PlaceholderImageContext $ctx): void {}
    public function PostConstructEntity(PlaceholderImageContext $ctx): void {}
    public function SetData(PlaceholderImageContext $ctx): void {}
    public function GetData(PlaceholderImageContext $ctx): void {}
    public function GetMatch(PlaceholderImageContext $ctx): void {}
    public function SetMatch(PlaceholderImageContext $ctx): void {}
    public function PrePoint(PlaceholderImageContext $ctx): void {}
    public function PreSpec(PlaceholderImageContext $ctx): void {}
    public function PreRequest(PlaceholderImageContext $ctx): void {}
    public function PreResponse(PlaceholderImageContext $ctx): void {}
    public function PreResult(PlaceholderImageContext $ctx): void {}
    public function PreDone(PlaceholderImageContext $ctx): void {}
    public function PreUnexpected(PlaceholderImageContext $ctx): void {}
}
