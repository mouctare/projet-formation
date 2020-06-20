<?php

namespace App\Events;

use App\Entity\Planning;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;




class PlanningUserSubscriber implements EventSubscriberInterface 
{
    private $security;

    public function __construct(Security $security) 
    {
        $this->security = $security;
    }
  // Toute classe qui implements le EventSubscriberInterface se doit d'avoir la methode =>
  public static function getSubscribedEvents() 
  {
    // Cette function renvoit un tableau auquel on va souscrire à des événments
    return [
    // La clée du tableau est une constante qui se trouve dans la class kernelEvents qui s'appelle view
    // Au moment du view, on va avoir une méthode qui s'appelle setUserForPlanning et qui devra etre appellé sur une priorité
    // Et pour avoir la priorité il faut applé la class EventPriorities et applé la constant PRE_VALIDATE
          KernelEvents::VIEW => ['setUserForPlanning', EventPriorities::PRE_VALIDATE]
      
    ];
   
  }
// On va crée la méthode setUserForPlanning
   // Quand on est branché un evenement view il faut avoir une instance de EiewEvent
   public function setUserForPlanning(ViewEvent $event) 
   {
       $plannings = $event->getControllerResult();
       $method = $event->getRequest()->getMethod();
       if($plannings instanceof Planning && $method === "POST") {
      // Choper l'utilisateur actuellement connecté
         $user = $this->security->getUser();
    // Assigner l'utisateur aux planning qu'il vient de créer
        $plannings->setUser($user);

        if(empty($plannings->getUpdatedAt())) {
          $plannings->setUpdatedAt(new \DateTime());
      }
           // Attention cette fonction va etre applé à chaque requette donc il faut préciser la methode pour stopper les apppelles
          //dd($user);
       }
   }
}