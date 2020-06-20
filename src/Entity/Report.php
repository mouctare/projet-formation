<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\ReportRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=ReportRepository::class)
 * @ApiResource(
 *    collectionOperations={"GET"={"path"="/rapports"}, "POST"={"path"="/rapports"}},
 *    itemOperations={"GET"={"path"="/rappports/{id}"},  "DELETE"={"path"="/rapports/{id}"}},
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
     * @Groups({"reports_read","users_read","sites_read"})
     * @Assert\NotBlank(message="Le titre du rapport doit etre renseigné ! ")
     * @Assert\Choice(choices={"RAPPORT COURANT","RAPPORT D'ICIDENT"}, message="Le titre du rapport doit etre RAPPORT COURANT  ou RAPPORT D'ICIDENT"))
     */
    private $title;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"reports_read","users_read","sites_read"})
     * @Assert\Type( type="\DateTime",message="La date doit etre au format yyyy -MM-DD")
     * @Assert\NotBlank(message="La date de création du rapport  doit etre renseignée ")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="text" , nullable=false)
     * @Groups({"reports_read","users_read","sites_read","users_read"})
     * @Assert\NotBlank(message="Le rapport doit avoir un minumum de description !")
     */
    private $description;
     /**
     * @ORM\Column(type="string", length=1000, nullable=true)
     * @Groups({"reports_read","sites_read"})
     * @Assert\Url(message = "L'image doit avoir un format de type url")
     */
    private $image;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="reports")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"reports_read"})
     * @Assert\NotBlank(message="L'utilisateur  est obligatoire")
     * 
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity=Site::class, inversedBy="reports")
     * @Groups({"reports_read"})
     * @Assert\NotBlank(message="Le nom du site   est obligatoire")
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

    public function setCreatedAt($createdAt): self
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
