<?php

use Illuminate\Support\Facades\Route;

Route::prefix('produtos')->name('produtos.')->group(function () {
    Route::get('/doly', function () { return 'dale12345';})->name('index');
});
