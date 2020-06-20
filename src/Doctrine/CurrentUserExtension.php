<?php

namespace App\Doctrine;
use Doctrine\ORM\QueryBuilder;
use App\Entity\Planning;
use Symfony\Component\Security\Core\Security;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;

class CurrentUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    private $security;
    
    public function __construct(Security $security)
    {
        $this->security = $security;
    }
    //  Ici on va faire en sote que l'utilisateur connecté n'affiche que ces données
    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface
     $queryNameGenerator, string $resourceClass, string $operationName = null)
    {
       // 1.Obtenir l'utilisateur connecté
       $user = $this->security->getUser();

       // 2. si on demande des plannings alors agir sur la requete pour qu'elle tienne 
      // compte de l'utilisateur connecté
      if($resourceClass === Planning::class) {
          // Ici , on cherche à choper l'alias o indiqué dans le dd et vue que ça peut etre plusiers alias on met au pluriels
          // RootAliases puisqu'il nous renvoit un tableau on prend le premier qui est l'index 0
          $rootAlias = $queryBuilder->getRootAliases()[0];

          if($resourceClass === Planning::class) {
              $queryBuilder->andWhere("$rootAlias.user = :user");
          }

          $queryBuilder->setParameter("user", $user);
          // ce $user, c'est le user récupérer dans security->getUser()
         // dd($queryBuilder);
        // dd($rootAlias);
      }

    }

   public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, 
   string $resourceClass, array $identifiers, string $operationName = null, array $context = [])
   {
       $this->addWhere($queryBuilder, $resourceClass);
   }


}