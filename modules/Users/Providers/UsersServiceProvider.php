<?php

namespace Modules\Users\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;
use Modules\Core\Providers\ModuleServiceProvider;

class UsersServiceProvider extends ModuleServiceProvider
{
    public function __construct($app)
    {
        parent::__construct($app);
        $this->modulePath = __DIR__;
    }

    public function register() {}

    public function boot()
    {
        $this->loadRoutes();
        $this->loadMigrations();
    }
}
