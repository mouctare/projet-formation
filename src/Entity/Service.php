<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\ServiceRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;


/**
 * @ORM\Entity(repositoryClass=ServiceRepository::class)
 * @ApiResource(
 *  normalizationContext={
 *   "groups"={"services_read"}
 * } 
 * )
 * @ApiFilter(OrderFilter::class, properties={"dateStart", "$typeService"})
 */
class Service
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"services_read","users_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"services_read","users_read"})
     */
    private $dateStart;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"services_read","users_read"})
     */
    private $typeService;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"services_read","users_read"})
     */
    private $description;

    /**
     * @ORM\Column(type="decimal", precision=10, scale=8)
     * @Groups({"services_read","users_read"})
     */
    private $lat;

    /**
     * @ORM\Column(type="decimal", precision=11, scale=8)
     * @Groups({"services_read","users_read"})
     */
    private $lng;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="services")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"services_read"})
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateStart(): ?\DateTimeInterface
    {
        return $this->dateStart;
    }

    public function setDateStart(\DateTimeInterface $dateStart): self
    {
        $this->dateStart = $dateStart;

        return $this;
    }

    public function getTypeService(): ?string
    {
        return $this->typeService;
    }

    public function setTypeService(string $typeService): self
    {
        $this->typeService = $typeService;

        return $this;
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
