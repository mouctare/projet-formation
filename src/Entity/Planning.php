<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\PlanningRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Validator\Constraints as Assert;
/**
 * @ORM\Entity(repositoryClass=PlanningRepository::class)
 * @ApiResource(
 * 
 *    collectionOperations={ 
 *          "GET"={"path"="/plannings"},
 *            "POST"={"path"="/plannings", "security"="is_granted('ROLE_ADMIN')", "security_message"=" Vous n'avez pas les droits suffisants pour effectuer cette opération"},
 *             
 *  },
 *                        
 *    itemOperations={
 *          "GET"={"path"="/plannings/{id}"}, 
 *          "PUT"={"path"="/plannings/{id}"},
 *          "DELETE"={"path"="/plannings/{id}","security"="is_granted('ROLE_ADMIN')", "security_message"=" Vous n'avez pas les droits suffisants pour effectuer cette opération"},
 *          
 * },
   *subresourceOperations={
 *       
 *        "services_get_subresource"={"path"="/plannings/{id}/services"}
 * 
 * 
 *  },
 *  normalizationContext={
 *   "groups"={"plannings_read"}
 * } ,
 * denormalizationContext={"groups"={"plannings_write"}}
 * )
 * @ApiFilter(SearchFilter::class)
 * @ApiFilter(OrderFilter::class)
 */
class Planning
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"plannings_read","users_read","sites_read","plannings_write","services_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"plannings_read","users_read","sites_read","services_read", "plannings_write"})
     * @Assert\Type( type="\DateTime",message="La date doit etre au format yyyy -MM-DD")
     * @Assert\NotBlank(message="La date de prise service  doit etre renseignée ")
     */
    private $dateStart;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"plannings_read","users_read","sites_read","services_read", "plannings_write"})
     * @Assert\Type( type="\DateTime",message="La date doit etre au format yyyy -MM-DD")
     * @Assert\NotBlank(message="La date fin de service  doit etre renseignée ")
     */
    private $dateEnd;

     /**
     * @ORM\Column(type="datetime")
     * @Groups({"plannings_read","users_read","sites_read","services_read", "plannings_write"})
     * @Assert\Type(type="\DateTime",message="La date doit etre au format yyyy -MM-DD")
     * @Assert\NotBlank(message="La date fin de mise à jour du planning   doit etre renseignée ")
    */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="plannings")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"plannings_read","services_read"})
     */

    private $user;

     /**
     * @ORM\ManyToOne(targetEntity=Site::class, inversedBy="plannings")
     *  @Groups({"plannings_read","services_read", "plannings_write"})
     */
    private $site;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"plannings_read","users_read","sites_read"})
     * @Assert\Type( type="\DateTime",message="La date doit etre au format yyyy -MM-DD")
     * @Assert\NotBlank(message="La date de création fu planning  d doit etre renseignée ")
     */
    private $createdAt;

    /**
     * @ORM\OneToMany(targetEntity=Service::class, mappedBy="planning",  cascade="persist")
     * @ApiSubresource
     *@Groups({"plannings_read", "plannings_write"}) 
     */
    private $services;
     /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"plannings_read", "plannings_write", "services_read"}) 
     */
    private $status;

    

    public function __construct()
    {
        $this->services = new ArrayCollection();
    }

   
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateStart(): ?\DateTimeInterface
    {
        return $this->dateStart;
    }

    public function setDateStart($dateStart): self
    {
        $this->dateStart = $dateStart;

        return $this;
    }

    public function getDateEnd(): ?\DateTimeInterface
    {
        return $this->dateEnd;
    }

    public function setDateEnd($dateEnd): self
    {
        $this->dateEnd = $dateEnd;

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

     public function getSite(): ?Site
    {
        return $this->site;
    }

    public function setSite(?Site $site): self
    {
        $this->site = $site;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt($updatedAt): self
    {
        $this->updatedAt = $updatedAt;

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

    /**
     * @return Collection|Service[]
     */
    public function getServices(): Collection
    {
        return $this->services;
    }

    public function addService(Service $service): self
    {
        if (!$this->services->contains($service)) {
            $this->services[] = $service;
            $service->setPlanning($this);
        }

        return $this;
    }

    public function removeService(Service $service): self
    {
        if ($this->services->contains($service)) {
            $this->services->removeElement($service);
            // set the owning side to null (unless already changed)
            if ($service->getPlanning() === $this) {
                $service->setPlanning(null);
            }
        }

        return $this;
    }
    public function getStatus(): ?bool
    {
        return $this->status;
    }
}
    