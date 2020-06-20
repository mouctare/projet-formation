<?php

namespace App\Events;

use App\Entity\Report;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;




class ReportUserSubscriber implements EventSubscriberInterface
{
   private $security;

   public function __construct(Security $security) 
   {
       $this->security = $security;
   }

   public static function getSubscribedEvents()
   {
       return [
           KernelEvents::VIEW => ['setUserForReport', EventPriorities::PRE_VALIDATE]
       ];
   }
   public function setUserForReport(ViewEvent $event) 
   {
       $reports = $event->getControllerResult();
       $method = $event->getRequest()->getMethod();
       if($reports instanceof Report && $method === "POST") {
      // Choper l'utilisateur actuellement connecté
         $user = $this->security->getUser();
    // Assigner l'utisateur aux disponibilité qu'il vient de créer
        $reports->setUser($user);
        if(empty($reports->getCreatedAt())) {
            $reports->setCreatedAt(new \DateTime());
        }
           // Attention cette fonction va etre applé à chaque requette donc il faut préciser la methode pour stopper les apppelles
          //dd($user);
       }
   }
}