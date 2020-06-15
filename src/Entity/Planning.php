<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\PlanningRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Validator\Constraints as Assert;
/**
 * @ORM\Entity(repositoryClass=PlanningRepository::class)
 * @ApiResource(
 *  normalizationContext={
 *   "groups"={"plannings_read"}
 * } 
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
     * @Groups({"plannings_read","users_read","sites_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"plannings_read","users_read","sites_read"})
     * @Assert\Type( type="\DateTime",message="La date doit etre au format yyyy -MM-DD")
     * @Assert\NotBlank(message="La date de prise service  doit etre renseignée ")
     */
    private $dateStart;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"plannings_read","users_read","sites_read"})
     *  @Assert\Type( type="\DateTime",message="La date doit etre au format yyyy -MM-DD")
     * @Assert\NotBlank(message="La date fin de service  doit etre renseignée ")
     */
    private $dateEnd;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="plannings")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"plannings_read"})
     */
    private $user;

     /**
     * @ORM\ManyToOne(targetEntity=Site::class, inversedBy="plannings")
     *  @Groups({"plannings_read"})
     */
    private $site;

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
}
