<?php

namespace App\Entity;

use App\Entity\User;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\ServiceRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use DateInterval;
use DateTime;

/**
 * @ORM\Entity(repositoryClass=ServiceRepository::class)
 * @ApiResource(
 *  collectionOperations={"GET"={"path"="/services"},
 *                        "POST"={"path"="/services"},
 *                         
 * },
 *    itemOperations={"GET"={"path"="/services/{id}"},  
 * 
 * },
 *  normalizationContext={
 *   "groups"={"services_read"}
 * } 
 * )
 * 
 */
class Service
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"services_read","plannings_read", "users_read"})
     */
    private $id;

    

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"services_read","plannings_read", "users_read"})
     */
    private $description;

   
     /**
     * @ORM\Column(type="boolean")
     * @Groups({"services_read","plannings_read", "users_read"})
     */
    private $actif;
    
 
    /**
     * @ORM\ManyToOne(targetEntity=Planning::class, inversedBy="services") 
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"services_read"})
     */
    private $planning;

    /**
     * @ORM\Column(type="datetime")
     * 
     * @Assert\NotBlank(message="La date de prise service  doit etre renseignée ")
     * @Groups({"services_read","plannings_read", "users_read"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime")
     * 
     * @Assert\NotBlank(message="La date de prise service  doit etre renseignée ")
     * @Groups({"services_read","plannings_read"})
     */
    private $dateFin;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="services")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"services_read"})
     */
    private $user;
 
   /**
   * @Groups({"services_read"})
   */
    public function getRetard(): ?string 
    { 
       $interval= $this->planning->getDateStart() -> diff($this->getCreatedAt() );
        $days = $interval->format('%a');
        $hours = $interval->format('%h');
        $mins = $interval->format('%i');            
        return ($days ." jours  "  .$hours ."H:" .$mins ."mn");
    } 

    public function getId(): ?int
    {
        return $this->id;
    }

   
    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

   public function getActif(): ?bool
    {
        return $this->actif;
    }

    public function setActif(bool $actif): self
    {
        $this->actif = $actif;

        return $this;
    }

    public function getPlanning(): ?Planning
    {
        return $this->planning;
    }

    public function setPlanning(?Planning $planning): self
    {
        $this->planning = $planning;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt($createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getDateFin(): ?\DateTimeInterface
    {
        return $this->dateFin;
    }

    public function setDateFin( $dateFin): self
    {
        $this->dateFin = $dateFin;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

  

   
}
