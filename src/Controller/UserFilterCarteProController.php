<?php

namespace App\Controller;

class UserFilterCarteProController {
    public function __invoke(User $data) 
    {
       dd($data);
    }
}