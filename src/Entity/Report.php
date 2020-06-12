<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\ReportRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass=ReportRepository::class)
 * @ApiResource(
 *  normalizationContext={
 *   "groups"={"reports_read"}
 * } 
 * )
 */
class Report
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     *  @Groups({"reports_read","users_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     *  @Groups({"reports_read","users_read","sites_read"})
     */
    private $title;

    /**
     * @ORM\Column(type="datetime")
     *  @Groups({"reports_read","users_read","sites_read"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="text")
     *  @Groups({"reports_read","users_read","sites_read","users_read"})
     */
    private $description;
     /**
     * @ORM\Column(type="string", length=1000, nullable=true)
     *  @Groups({"reports_read","sites_read"})
     */
    private $image;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="reports")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"reports_read"})
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity=Site::class, inversedBy="reports")
     *  @Groups({"reports_read"})
     */
    private $site;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }
    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): self
    {
        $this->image = $image;

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
