<?php

namespace App\Doctrine;
use App\Entity\User;
use App\Entity\Agent;
use App\Entity\Report;
use App\Entity\Service;
use App\Entity\Planning;
use App\Entity\Availability;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Security;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;

class CurrentUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    private $security;
    private $auth;
    
    public function __construct(Security $security, AuthorizationCheckerInterface $checker)
    {
        $this->security = $security;
        $this->auth = $checker;
    }

    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass) 
    {
        // 1.Obtenir l'utilisateur connecté
        $user = $this->security->getUser();

        // 2. si on demande des plannings alors agir sur la requete pour qu'elle tienne 
       // compte de l'utilisateur connecté
       if(
            ($resourceClass === User::class ||$resourceClass === Planning::class || $resourceClass === Report::class || $resourceClass === Availability::class || $resourceClass === Service::class  
            || $resourceClass === Site::class) && 
           !$this->auth->isGranted('ROLE_ADMIN')
           &&  $user instanceof User
        )
        {
           // Ici , on cherche à choper l'alias o indiqué dans le dd et vue que ça peut etre plusiers alias on met au pluriels
           // RootAliases puisqu'il nous renvoit un tableau on prend le premier qui est l'index 0
           $rootAlias = $queryBuilder->getRootAliases()[0];
 
           if ($resourceClass === User::class ||$resourceClass === Planning::class || $resourceClass === Report::class || $resourceClass === Availability::class 
           || $resourceClass === Service::class  || $resourceClass === Site::class) {
               $queryBuilder->andWhere("$rootAlias.user = :user");
           }
 
           $queryBuilder->setParameter("user", $user);
           // ce $user, c'est le user récupérer dans security->getUser()
    //           dd($queryBuilder);
         // dd($rootAlias);
       }
    }
    //  Ici on va faire en sote que l'utilisateur connecté n'affiche que ces données
    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface
     $queryNameGenerator, string $resourceClass, string $operationName = null)
    {
      
           $this->addWhere($queryBuilder, $resourceClass);
    }

   public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, 
   string $resourceClass, array $identifiers, string $operationName = null, array $context = [])
   {
       $this->addWhere($queryBuilder, $resourceClass);
   }


}