<?php

namespace App\Events;

use App\Entity\Service;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use DateTimeZone;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;




class ServiceSubsCriber implements EventSubscriberInterface 
{
  private $security;

  public function __construct(Security $security) 
  {
      $this->security = $security;
  }

  public static function getSubscribedEvents()
  {
      return [
          KernelEvents::VIEW => ['setUserForService', EventPriorities::PRE_VALIDATE]
      ];
  }
  public function setUserForService(ViewEvent $event) 
  {
      $services = $event->getControllerResult();
      $method = $event->getRequest()->getMethod();
      if($services instanceof Service && $method === "POST") {
     // Choper l'utilisateur actuellement connecté
        $user = $this->security->getUser();
   // Assigner l'utisateur aux disponibilité qu'il vient de créer
       $services->setUser($user);
      
          // Attention cette fonction va etre applé à chaque requette donc il faut préciser la methode pour stopper les apppelles
         //dd($user);
         if(empty($services->getDateFin())) {
          $services->setDateFin(new \DateTime(null, new DateTimeZone('Europe/Paris')));
      }
      if(empty($services->getCreatedAt())) {
        $services->setCreatedAt(new \DateTime(null, new DateTimeZone('Europe/Paris')));     
    }
           // Attention cette fonction va etre applé à chaque requette donc il faut préciser la methode pour stopper les apppelles
          //dd($user);
       }
   }
      
  }




















