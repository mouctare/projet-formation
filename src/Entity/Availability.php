<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\AvailabilityRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;


/**
 * @ORM\Entity(repositoryClass=AvailabilityRepository::class)
 * @ApiResource(
 *   collectionOperations={"GET"={"path"="/disponibilites"}, "POST"={"path"="/disponibilites"}},
 *    itemOperations={"GET"={"path"="/disponibilites/{id}"}, "PUT"={"path"="/disponibilites/{id}"}, "DELETE"={"path"="/disponibilites/{id}"}},
 *    normalizationContext={
 *   "groups"={"availabilities_read"}
 * } 
 * )
 * @ApiFilter(OrderFilter::class, properties={"start", "dateEnd"})
 */
class Availability
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"availabilities_read","users_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"availabilities_read","users_read"})
     * 
     */
    private $startDate;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"availabilities_read","users_read"})
     */
    private $dateEnd;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="availabilities")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"availabilities_read"})
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->startDate;
    }

    public function setStartDate(\DateTimeInterface $startDate): self
    {
        $this->startDate = $startDate;

        return $this;
    }

    public function getDateEnd(): ?\DateTimeInterface
    {
        return $this->dateEnd;
    }

    public function setDateEnd(\DateTimeInterface $dateEnd): self
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
}
