<?php 

namespace App\Events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;


class JwtCreadSubscriber  {
    public function updateJwtData(JWTCreatedEvent $event)
     {
        //dd($event);
        // Cette methode est configurée dans le fiche service.yaml,
        // elle sert à decoder le token pour renvoyer le firstName et lastName

        // 1. Récuperer l'utilisateur pour avoir son (firstName et son lastName)
           $user = $event->getUser();
        // 2. Enrichir les data pour qu'elles contiennent ces données
        $data['firstName'] = $user->getFirstName();
        $data['lastName'] = $user->getLastName();
        // On va lui passé les données une fois qu'elles sont modifiées
        $event->setData($data);
       

    }
}