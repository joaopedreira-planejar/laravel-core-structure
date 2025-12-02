<?php

use Modules\Produtos\Providers\ProdutosServiceProvider;
use Modules\Users\Providers\UsersServiceProvider;

return [
    App\Providers\AppServiceProvider::class,
    App\Providers\FortifyServiceProvider::class,
    UsersServiceProvider::class,
    ProdutosServiceProvider::class
];
