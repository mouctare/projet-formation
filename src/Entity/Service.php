<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\ServiceRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Validator\Constraints as Assert;


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
     * @Groups({"services_read","plannings_read"})
     */
    private $id;

    

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"services_read","plannings_read"})
     */
    private $description;

    /**
     * @ORM\Column(type="decimal", precision=10, scale=8)
     * @Groups({"services_read","plannings_read"})
     */
    private $lat;

    /**
     * @ORM\Column(type="decimal", precision=11, scale=8)
     * @Groups({"services_read","plannings_read"})
     */
    private $lng;
     /**
     * @ORM\Column(type="boolean")
     * @Groups({"services_read","plannings_read"})
     */
    private $actif;
    
 
    /**
     * @ORM\ManyToOne(targetEntity=Planning::class, inversedBy="services") 
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"services_read"})
     */
    private $planning;

   
   
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

    public function getLat(): ?string
    {
        return $this->lat;
    }

    public function setLat(string $lat): self
    {
        $this->lat = $lat;

        return $this;
    }

    public function getLng(): ?string
    {
        return $this->lng;
    }

    public function setLng(string $lng): self
    {
        $this->lng = $lng;

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

    

}
